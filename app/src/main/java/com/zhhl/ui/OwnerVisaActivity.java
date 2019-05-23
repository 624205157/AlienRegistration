package com.zhhl.ui;

import android.Manifest;
import android.app.Activity;
import android.app.AlertDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.net.http.SslError;
import android.os.Build;
import android.os.Bundle;
import android.os.Environment;
import android.provider.MediaStore;
import android.support.annotation.RequiresApi;
import android.text.TextUtils;
import android.util.Log;
import android.webkit.CookieManager;
import android.webkit.CookieSyncManager;
import android.webkit.JavascriptInterface;
import android.webkit.SslErrorHandler;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;

import com.kernal.passport.sdk.utils.AppManager;
import com.kernal.passport.sdk.utils.CheckPermission;
import com.kernal.passport.sdk.utils.Devcode;
import com.kernal.passport.sdk.utils.PermissionActivity;
import com.kernal.passport.sdk.utils.SharedPreferencesHelper;
import com.kernal.passportreader.sdk.CameraActivity;
import com.zhhl.R;
import com.zhhl.common.Constants;
import com.zhhl.common.FileHelper;
import com.zhhl.common.GsonHelper;
import com.zhhl.common.LocaleHelper;
import com.zhhl.common.SPHelper;
import com.zhhl.model.User;
import com.zhhl.model.UserInfo;
import com.zhhl.permission.MyCheckPermission;
import com.zhhl.permission.MyPermissionActivity;
import com.zhhl.permission.PermissionContant;

import org.apache.commons.lang3.StringUtils;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Random;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.MediaType;
import okhttp3.MultipartBody;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

/**
 * 护照信息识别，登记
 */
public class OwnerVisaActivity extends Activity implements MyWebChomeClient.OpenFileChooserCallBack {
    private static final String TAG = "OwnerVisaActivity";
    private String[] langs = {"zh", "en"};
    private WebView webview;
    private File[] files;


    private ValueCallback<Uri> mUploadMessage;

    private ValueCallback<Uri[]> mUploadCallbackAboveL;
    private static final int REQUEST_CODE_PICK_IMAGE = 0;
    private static final int REQUEST_CODE_IMAGE_CAPTURE = 1;

    private Intent mSourceIntent;

    String compressPath = "";

    private String sourcePath;

    private ValueCallback<Uri> mUploadMsg;
    public ValueCallback<Uri[]> mUploadMsgForAndroid5;
    private static final int P_CODE_PERMISSIONS = 101;


    File tempFile;
    Uri newPhotoUri;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_owner_visa);
        AppManager.getAppManager().finishAllActivity();
        FileHelper.makeRootDirectory(Constants.VIDEOVISA_ROOT);
        SPHelper.put(OwnerVisaActivity.this, Constants.VIDEOVISAPATH, "novideo");
        //SPHelper.put(OwnerVisaActivity.this, "languagetype", "ch");
        check();
//        checkVideo();
    }


    private void check() {
        //取得启动该Activity的Intent对象
        Intent intent = getIntent();
        String scanStatus = intent.getStringExtra("scanStatus");

        if ("success".equals(scanStatus)) {
            String recogResult = intent.getStringExtra("recogResult");
            String fullPagePath = intent.getStringExtra("fullPagePath");
            String cutPagePath = intent.getStringExtra("cutPagePath");

            Log.i("fullPagePath", fullPagePath);
            Log.i("cutPagePath", cutPagePath);
            Log.i("recogResult", recogResult);

            if (StringUtils.isBlank(recogResult))
                Toast.makeText(OwnerVisaActivity.this, R.string.scan_fail, Toast.LENGTH_LONG);

            if (recogResult.endsWith(",")) {
                recogResult = recogResult.substring(0, recogResult.length() - 1);
            }
            recogResult = recogResult.replaceAll(":", "\":\"");
            recogResult = recogResult.replaceAll(",", "\",\"");
            recogResult = "{\"" + recogResult + "\"}";
            UserInfo userInfo = GsonHelper.gson.fromJson(recogResult, UserInfo.class);
            userInfo.setFullImg(fullPagePath);
            userInfo.setCutImg(cutPagePath);
            SPHelper.put(OwnerVisaActivity.this, Constants.USERVISA_INFO, userInfo.toString());
            Log.i(TAG,"用户信息"+SPHelper.get(OwnerVisaActivity.this, Constants.USERVISA_INFO, ""));
            initWebView();
        } else if("back".equals(scanStatus)){//CameraActivity返回(无任何信息)
            initWebView();
        } else{//调取摄像头扫描
            scan();
        }
    }

    private void initWebView() {
        Log.e(TAG, "initWebView:1 " );
        webview = (WebView) findViewById(R.id.webView);
        webview.setWebChromeClient(new WebChromeClient());
        webview.setWebViewClient(new WebViewClient());
        webview.setHorizontalScrollBarEnabled(false);//水平不显示
        webview.setVerticalScrollBarEnabled(false); //垂直不显示
        webview.getSettings().setUseWideViewPort(true);//自适应屏幕
        webview.getSettings().setLayoutAlgorithm(WebSettings.LayoutAlgorithm.SINGLE_COLUMN);
        webview.getSettings().setLoadWithOverviewMode(true);
        webview.getSettings().setJavaScriptEnabled(true);


        webview.getSettings().setAllowFileAccess(true);
        webview.getSettings().setAllowContentAccess(true);

        webview.setWebViewClient(new WebViewClient() {
            @Override
            public void onReceivedSslError(WebView view, SslErrorHandler handler, SslError error) {
                handler.proceed();
            }

            @Override
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                Log.e(TAG, "shouldOverrideUrlLoading: "+url );
                view.loadUrl(url);
                return true;
            }

            @Override
            public void onPageFinished(WebView view, String url) {
                if (Build.VERSION.SDK_INT < Build.VERSION_CODES.LOLLIPOP) {
                    CookieSyncManager.getInstance().sync();
                } else {
                    CookieManager.getInstance().flush();
                }
            }
        });
        webview.setWebChromeClient(new MyWebChomeClient(OwnerVisaActivity.this));


        webview.getSettings().setJavaScriptCanOpenWindowsAutomatically(true);


        //在js中调用本地java方法
        webview.addJavascriptInterface(new JsInterface(this), "AndroidWebView");
        String url = "";
        String languagetype = SPHelper.get(OwnerVisaActivity.this, "languagetype", "ch");
        if ("ch".equals(languagetype)) {
            url = "file:///android_asset/register/add_section/add_visa_list.html";
            Log.e(TAG, "initWebView: ch");
        } else {
            url = "file:///android_asset/register/add_section/add_visa_list_english.html";
            Log.e(TAG, "initWebView: en");
        }
        webview.loadUrl(url);
        fixDirPath();
    }

    private class JsInterface {
        private Context mContext;

        public JsInterface(Context context) {
            this.mContext = context;
        }

        //在js中调用window.AndroidWebView.showInfoFromJs(name)，便会触发此方法。
        @JavascriptInterface
        public String showInfoFromJs(String flag, String yly, String yle, String yls) {
            Log.e(TAG, "showInfoFromJs:flag "+flag);
            Log.e(TAG, "showInfoFromJs: yly"+yly);
            Log.e(TAG, "showInfoFromJs: yle"+yle);
            Log.e(TAG, "showInfoFromJs: yls"+yls);
            if (flag.equals("scan")) {
                Intent intent = new Intent(OwnerVisaActivity.this, CameraActivity.class);
                if (Build.VERSION.SDK_INT >= 23) {
                    CheckPermission checkPermission = new CheckPermission(OwnerVisaActivity.this);
                    if (checkPermission.permissionSet(com.kernal.passportreader.sdk.MainActivity.PERMISSION)) {
                        PermissionActivity.startActivityForResult(OwnerVisaActivity.this, 0,
                                SharedPreferencesHelper.getInt(
                                        getApplicationContext(), "nMainId", 13),
                                Devcode.devcode, 0,0, com.kernal.passportreader.sdk.MainActivity.PERMISSION);
                    } else {
                        intent.putExtra("nMainId", SharedPreferencesHelper.getInt(
                                getApplicationContext(), "nMainId", 13));
                        intent.putExtra("devcode", Devcode.devcode);
                        intent.putExtra("flag", 0);
                        intent.putExtra("from", "ownervisa");
                        OwnerVisaActivity.this.finish();
                        startActivity(intent);
                    }
                } else {
                    intent.putExtra("nMainId", SharedPreferencesHelper.getInt(
                            getApplicationContext(), "nMainId", 13));
                    intent.putExtra("devcode", Devcode.devcode);
                    intent.putExtra("flag", 0);
                    intent.putExtra("from", "ownervisa");
                    OwnerVisaActivity.this.finish();
                    startActivity(intent);
                }
            } else if (flag.equals("record")) {
                startRecorder();
            } else if (flag.equals("userInfoNew")) {
                String userInfo = SPHelper.get(mContext, Constants.USERVISA_INFO, "");
                Log.e(TAG, "showInfoFromJs: "+userInfo );
                return userInfo;
            } else if (flag.equals("tiaozhuan")) {
                Intent intent = new Intent(OwnerVisaActivity.this, FirstActivity.class);
                startActivity(intent);
            }
            return "";
        }
    }

    private void scan() {
        //护照号码MRZ:ZF314913,本国姓名:LORANT  GERGELY,英文姓名:LORANT  GERGELY,性别:男,出生日期:1979-02-08,有效期至:2013-02-13,签发国代码:HUN,英文姓:LORANT,英文名:GERGELY,MRZ1:P<HUNLORANT<<GERGELY<<<<<<<<<<<<<<<<<<<<<<<<,MRZ2:ZF314913<7HUN7902088M1302136<<<<<<<<<<<<<<08,持证人国籍代码:HUN,护照号码:ZF314913,出生地点:,签发地点:,签发日期:,RFID MRZ:,OCR MRZ:P<HUNLORANT<<GERGELY<<<<<<<<<<<<<<<<<<<<<<<<ZF314913<7HUN7902088M1302136<<<<<<<<<<<<<<08,出生地点拼音:
        //护照号码MRZ:G25352389,本国姓名:黄勃,英文姓名:HUANG  BO,性别:男,出生日期:1983-06-06,有效期至:2017-10-22,签发国代码:CHN,英文姓:HUANG,英文名:BO,MRZ1:POCHNHUANG<<BO<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<,MRZ2:G253523895CHN8306063M171022719202112<<<<<<68,持证人国籍代码:CHN,护照号码:G25352389,出生地点:辽宁,签发地点:辽宁,签发日期:2007-0C-23,RFID MRZ:,OCR MRZ:POCHNHUANG<<BO<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<G253523895CHN8306063M171022719202112<<<<<<68,出生地点拼音:LIAONING
        //        /**
        //         * 由于在相机界面释放相机等资源会耗费很多时间， 为了优化用户体验，需要在调用相机的那个界面的oncreate()方法中
        //         * 调用AppManager.getAppManager().finishAllActivity();
        //         * 如果调用和识别的显示界面是同一个界面只需调用一次即可， 如果是不同界面，需要在显示界面的oncreate()方法中
        //         * 调用AppManager.getAppManager().finishAllActivity();即可，
        //         * 否则会造成相机资源的内存溢出。
        //         */
        Intent intent = new Intent(OwnerVisaActivity.this, CameraActivity.class);
        if (Build.VERSION.SDK_INT >= 23) {
            CheckPermission checkPermission = new CheckPermission(this);
            if (checkPermission.permissionSet(com.kernal.passportreader.sdk.MainActivity.PERMISSION)) {
                PermissionActivity.startActivityForResult(this, 0,
                        SharedPreferencesHelper.getInt(
                                getApplicationContext(), "nMainId", 13),
                        Devcode.devcode, 0,0, com.kernal.passportreader.sdk.MainActivity.PERMISSION);
            } else {
                intent.putExtra("nMainId", SharedPreferencesHelper.getInt(
                        getApplicationContext(), "nMainId", 13));
                intent.putExtra("devcode", Devcode.devcode);
                intent.putExtra("flag", 0);
                intent.putExtra("from", "ownervisa");
                OwnerVisaActivity.this.finish();
                startActivity(intent);
            }
        } else {
            intent.putExtra("nMainId", SharedPreferencesHelper.getInt(
                    getApplicationContext(), "nMainId", 13));
            intent.putExtra("devcode", Devcode.devcode);
            intent.putExtra("flag", 0);
            intent.putExtra("from", "ownervisa");
            OwnerVisaActivity.this.finish();
            startActivity(intent);
        }
    }

    private void changeLanguage() {
        int r = Math.abs(new Random().nextInt()) % 2;
        LocaleHelper.setLocale(OwnerVisaActivity.this, langs[r]);
        recreate();
    }

    @Override
    protected void attachBaseContext(Context base) {
        super.attachBaseContext(LocaleHelper.onAttach(base, "en"));
    }


    /** * 录像 */
    public void startRecorder() {
//        Log.i("99999999999","66666666666");
//        Intent intent = new Intent();
//        intent.setClass(OwnerActivity.this, MCameraFZ.class);
//        startActivityForResult(intent, 99);
        requestPermissionMc();//请求权限 跳转到MCamera
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        if (resultCode == 99) {
            checkVideo();
            return;
        }
        if (resultCode != Activity.RESULT_OK) {
            if (mUploadMsg != null) {
                mUploadMsg.onReceiveValue(null);
            }

            if (mUploadMsgForAndroid5 != null) {         // for android 5.0+
                mUploadMsgForAndroid5.onReceiveValue(null);
            }
            return;
        }
        switch (requestCode) {
            case REQUEST_CODE_IMAGE_CAPTURE:
//                Uri.fromFile(tempFile);
//                sourcePath = ImageUtil.getRealFilePathFromUri(getApplicationContext(), newPhotoUri);
//                Log.i("sourcePath==",sourcePath);
                if (Build.VERSION.SDK_INT < Build.VERSION_CODES.LOLLIPOP) {
                    if (mUploadMsg == null) {
                        return;
                    }

                    Uri uri = Uri.fromFile(tempFile);
//                    Uri uri = Uri.fromFile(new File(sourcePath));
                    sourcePath = tempFile.getPath();
                    mUploadMsg.onReceiveValue(uri);
                }else if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
                    if (mUploadMsgForAndroid5 == null) {        // for android 5.0+
                        return;
                    }

                    Uri uri = Uri.fromFile(tempFile);
//                    Uri uri = Uri.fromFile(new File(sourcePath));
                    sourcePath = tempFile.getPath();
                    mUploadMsgForAndroid5.onReceiveValue(new Uri[]{uri});
                }
                break;

            case REQUEST_CODE_PICK_IMAGE: {
                try {
                    if (Build.VERSION.SDK_INT < Build.VERSION_CODES.LOLLIPOP) {
                        if (mUploadMsg == null) {
                            return;
                        }

                        sourcePath = ImageUtil.retrievePath(this, mSourceIntent, data);

                        if (TextUtils.isEmpty(sourcePath) || !new File(sourcePath).exists()) {
                            // Log.e(TAG, "sourcePath empty or not exists.");
                            break;
                        }
                        Uri uri = Uri.fromFile(new File(sourcePath));
                        mUploadMsg.onReceiveValue(uri);

                    } else if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
                        if (mUploadMsgForAndroid5 == null) {        // for android 5.0+
                            return;
                        }

                        sourcePath = ImageUtil.retrievePath(this, mSourceIntent, data);


                        if (TextUtils.isEmpty(sourcePath) || !new File(sourcePath).exists()) {
                            // Log.e(TAG, "sourcePath empty or not exists.");
                            break;
                        }
                        Uri uri = Uri.fromFile(new File(sourcePath));
                        mUploadMsgForAndroid5.onReceiveValue(new Uri[]{uri});
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
                break;
            }
        }
    }






    private void checkVideo() {
        File file = new File(Constants.VIDEOFZ_ROOT);
        files = file.listFiles();
        String playpath = SPHelper.get(OwnerVisaActivity.this,Constants.VIDEOFZPATH,"novideo");
        if (StringUtils.isEmpty(playpath) || "novideo".equals(playpath)){
            System.out.println("视频文件为空");
        }else {
            //showFileItems();
        }
        /**
         * 判断视频文件是否为null，为null时候显示nodata布局
         */
//        if (files == null || files.length == 0) {
//            System.out.println("视频文件为空");
//        } else {
//            showFileItems();
//        }
    }

    public void uploadVideo(String playpath,String filename){
        //上传数据
        File file = new File(playpath);
        MultipartBody.Builder builder =  new MultipartBody.Builder().setType(MultipartBody.FORM);
        builder.addFormDataPart("zjhm", filename);
        builder.addFormDataPart("file", file.getName(), RequestBody.create(MediaType.parse("video/mp4"), file));//此方法第二个参数非视频文件名
        String url = "http://crj.gafw.jl.gov.cn/jeecg/fileUploadController.do?uploadnewApp";
        RequestBody body = builder.build();
        Request request = new Request.Builder().url(url).post(body).build();
        OkHttpClient client = new OkHttpClient();
        client.newCall(request).enqueue(new Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
            }

            @Override
            public void onResponse(Call call, Response response) throws IOException {
                try {
//                    Toast.makeText(OwnerActivity.this,"OK",Toast.LENGTH_SHORT).show();
                    Intent intentSu = new Intent(OwnerVisaActivity.this, SuccessActivity.class);
                    OwnerVisaActivity.this.startActivity(intentSu);
                } catch (Exception e) {
                    e.printStackTrace();
                }

            }
        });
    }

    public  void requestPermissionMc(){
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            MyCheckPermission checkPermission = new MyCheckPermission(OwnerVisaActivity.this);
            if (checkPermission.permissionSet(PermissionContant.MediaRecordPermission)) {
                MyPermissionActivity.startActivityForResult(OwnerVisaActivity.this,MCameraFZ.class,0,PermissionContant.MediaRecordPermission);
            } else {//获取全部权限
                Intent intent = new Intent(OwnerVisaActivity.this,MCameraFZ.class);
                startActivity(intent);
            }
        } else {//6.0以下版本
            Intent intent = new Intent(OwnerVisaActivity.this,MCameraFZ.class);
            startActivity(intent);
        }
    }





    class MyChromeViewClient extends WebChromeClient {
        public void onGeolocationPermissionsShowPrompt(final String origin, final android.webkit.GeolocationPermissions.Callback callback) {
            final boolean remember = true;
            callback.invoke(origin, true, remember);
        }
    }

    public  void requestPermission(){
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            MyCheckPermission checkPermission = new MyCheckPermission(OwnerVisaActivity.this);
            if (checkPermission.permissionSet(PermissionContant.GdMapPermission)) {// 去请求权限
                requestPermissions(PermissionContant.GdMapPermission);
            } else {//已经开启
//                webview.loadUrl("javascript:showInfoFromJava('1')");
//                webview.post(new Runnable() {
//                    @Override
//                    public void run() {
//                        webview.loadUrl("javascript:showInfoFromJava('1')");
//                    }
//                });
            }
        } else {//6.0以下版本
//            webview.loadUrl("javascript:showInfoFromJava('1')");
//            webview.post(new Runnable() {
//                @Override
//                public void run() {
//                    webview.loadUrl("javascript:showInfoFromJava('1')");
//                }
//            });
        }
    }
    private static final int PERMISSION_REQUEST_CODE = 0;// 系统授权管理页面时的结果参数
    // 请求权限去兼容版本
    @RequiresApi(api = Build.VERSION_CODES.M)
    private void requestPermissions(String... permission) {
        OwnerVisaActivity.this.requestPermissions(permission,
                PERMISSION_REQUEST_CODE);
    }

    //@Override
   /* public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        if (PERMISSION_REQUEST_CODE == requestCode
                && hasAllPermissionGranted(grantResults)) // 判断请求码与请求结果是否一致
        {//成功开启
            //webview.loadUrl("javascript:showInfoFromJava('1')");
            //  allPermissionGranted(); // 进入
        } else { // 提示对话框设置
            // showMissingPermissionDialog();//dialog
//            Toast.makeText(this, "您禁止了此权限！请选择允许", Toast.LENGTH_SHORT).show();
            RefusedRemindDialog refusedRemindDialog = new RefusedRemindDialog(FirstActivity.this);
            refusedRemindDialog.showMissingPermissionDialog("您禁止了定位权限！请选择允许", "ch");
            //webview.loadUrl("javascript:showInfoFromJava('0')");
            //finish();
        }
    }*/
    // 获取全部权限
    private boolean hasAllPermissionGranted(int[] grantResults) {
        for (int grantResult : grantResults) {
            if (grantResult == PackageManager.PERMISSION_DENIED) {
                return false;
            }
        }
        return true;
    }



    //拍照
    @Override
    public void openFileChooserCallBack(ValueCallback<Uri> uploadMsg, String acceptType) {
        mUploadMsg = uploadMsg;
        showOptions();
    }



    @Override
    public boolean openFileChooserCallBackAndroid5
            (WebView webView, ValueCallback<Uri[]> filePathCallback, WebChromeClient.FileChooserParams fileChooserParams) {
        mUploadMsgForAndroid5 = filePathCallback;
        showOptions();

        return true;
    }

    public void showOptions() {
        AlertDialog.Builder alertDialog = new AlertDialog.Builder(this);
        alertDialog.setCancelable(true);
        alertDialog.setOnCancelListener(new OwnerVisaActivity.DialogOnCancelListener());

        alertDialog.setTitle("请选择操作");
        // gallery, camera.
        String[] options = {"相册", "拍照"};

        alertDialog.setItems(options, new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        if (which == 0) {
                            if (PermissionUtil.isOverMarshmallow()) {
                                if (!PermissionUtil.isPermissionValid(OwnerVisaActivity.this, Manifest.permission.READ_EXTERNAL_STORAGE)) {
                                    Toast.makeText(OwnerVisaActivity.this,
                                            "请去\"设置\"中开启本应用的图片媒体访问权限",
                                            Toast.LENGTH_SHORT).show();

                                    restoreUploadMsg();
                                    requestPermissionsAndroidM();
                                    return;
                                }

                            }

                            try {
                                mSourceIntent = ImageUtil.choosePicture();
                                startActivityForResult(mSourceIntent, REQUEST_CODE_PICK_IMAGE);
                            } catch (Exception e) {
                                e.printStackTrace();
                                Toast.makeText(OwnerVisaActivity.this,
                                        "请去\"设置\"中开启本应用的图片媒体访问权限",
                                        Toast.LENGTH_SHORT).show();
                                restoreUploadMsg();
                            }

                        } else {
                            if (PermissionUtil.isOverMarshmallow()) {
                                if (!PermissionUtil.isPermissionValid(OwnerVisaActivity.this, Manifest.permission.WRITE_EXTERNAL_STORAGE)) {
                                    Toast.makeText(OwnerVisaActivity.this,
                                            "请去\"设置\"中开启本应用的图片媒体访问权限",
                                            Toast.LENGTH_SHORT).show();

                                    restoreUploadMsg();
                                    requestPermissionsAndroidM();
                                    return;
                                }

                                if (!PermissionUtil.isPermissionValid(OwnerVisaActivity.this, Manifest.permission.CAMERA)) {
                                    Toast.makeText(OwnerVisaActivity.this,
                                            "请去\"设置\"中开启本应用的相机权限",
                                            Toast.LENGTH_SHORT).show();

                                    restoreUploadMsg();
                                    requestPermissionsAndroidM();
                                    return;
                                }
                            }

                            try {
                                ///storage/emulated/0/image/1521798773449.jpg
                                tempFile = new File(ImageUtil.checkDirPath(Environment.getExternalStorageDirectory().getPath() + "/image/"), System.currentTimeMillis() + ".jpg");

                                Intent intent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
                                intent.setFlags(Intent.FLAG_GRANT_WRITE_URI_PERMISSION);
                                newPhotoUri=ImageUtil.newPictureFile(OwnerVisaActivity.this,tempFile);
                                intent.putExtra(MediaStore.EXTRA_OUTPUT, newPhotoUri);
                                mSourceIntent = intent;
//                                mSourceIntent = ImageUtil.takeBigPicture(IndexActivity.this);
                                startActivityForResult(mSourceIntent, REQUEST_CODE_IMAGE_CAPTURE);

                            } catch (Exception e) {
                                System.out.println("***********************************************************************测试一下");
                                e.printStackTrace();
                                Toast.makeText(OwnerVisaActivity.this,
                                        "请去\"设置\"中开启本应用的相机和图片媒体访问权限",
                                        Toast.LENGTH_SHORT).show();

                                restoreUploadMsg();
                            }
                        }
                    }
                }
        );
        alertDialog.show();
    }

    private void fixDirPath() {
        String path = ImageUtil.getDirPath();
        File file = new File(path);
        if (!file.exists()) {
            file.mkdirs();
        }
    }

    private class DialogOnCancelListener implements DialogInterface.OnCancelListener {
        @Override
        public void onCancel(DialogInterface dialogInterface) {
            restoreUploadMsg();
        }
    }

    private void restoreUploadMsg() {
        if (mUploadMsg != null) {
            mUploadMsg.onReceiveValue(null);
            mUploadMsg = null;

        } else if (mUploadMsgForAndroid5 != null) {
            mUploadMsgForAndroid5.onReceiveValue(null);
            mUploadMsgForAndroid5 = null;
        }
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
        switch (requestCode) {
            case P_CODE_PERMISSIONS:
                requestResult(permissions, grantResults);
                restoreUploadMsg();
                break;

            default:
                super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        }
    }

    private void requestPermissionsAndroidM() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            List<String> needPermissionList = new ArrayList<>();
            needPermissionList.add(Manifest.permission.WRITE_EXTERNAL_STORAGE);
            needPermissionList.add(Manifest.permission.READ_EXTERNAL_STORAGE);
            needPermissionList.add(Manifest.permission.CAMERA);

            PermissionUtil.requestPermissions(OwnerVisaActivity.this, P_CODE_PERMISSIONS, needPermissionList);

        } else {
            return;
        }
    }

    public void requestResult(String[] permissions, int[] grantResults) {
        ArrayList<String> needPermissions = new ArrayList<String>();

        for (int i = 0; i < grantResults.length; i++) {
            if (grantResults[i] != PackageManager.PERMISSION_GRANTED) {
                if (PermissionUtil.isOverMarshmallow()) {

                    needPermissions.add(permissions[i]);
                }
            }
        }

        if (needPermissions.size() > 0) {
            StringBuilder permissionsMsg = new StringBuilder();

            for (int i = 0; i < needPermissions.size(); i++) {
                String strPermissons = needPermissions.get(i);

                if (Manifest.permission.WRITE_EXTERNAL_STORAGE.equals(strPermissons)) {
                    permissionsMsg.append("," + getString(R.string.permission_storage));

                } else if (Manifest.permission.READ_EXTERNAL_STORAGE.equals(strPermissons)) {
                    permissionsMsg.append("," + getString(R.string.permission_storage));

                } else if (Manifest.permission.CAMERA.equals(strPermissons)) {
                    permissionsMsg.append("," + getString(R.string.permission_camera));

                }
            }

            String strMessage = "请允许使用\"" + permissionsMsg.substring(1).toString() + "\"权限, 以正常使用APP的所有功能.";

            Toast.makeText(OwnerVisaActivity.this, strMessage, Toast.LENGTH_SHORT).show();

        } else {
            return;
        }
    }




}
