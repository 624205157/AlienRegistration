package com.zhhl.ui;

import android.Manifest;
import android.annotation.SuppressLint;
import android.app.Activity;
import android.app.AlertDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.net.http.SslError;
import android.os.Build;
import android.os.Bundle;
import android.os.Environment;
import android.provider.MediaStore;
import android.provider.Settings;
import android.support.annotation.Nullable;
import android.support.annotation.RequiresApi;
import android.support.v4.app.ActivityCompat;
import android.telephony.TelephonyManager;
import android.text.TextUtils;
import android.util.Log;
import android.view.KeyEvent;
import android.view.Window;
import android.webkit.CookieManager;
import android.webkit.CookieSyncManager;
import android.webkit.JavascriptInterface;
import android.webkit.JsResult;
import android.webkit.SslErrorHandler;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;

import com.allenliu.versionchecklib.core.http.HttpParams;
import com.allenliu.versionchecklib.core.http.HttpRequestMethod;
import com.allenliu.versionchecklib.v2.AllenVersionChecker;
import com.allenliu.versionchecklib.v2.builder.UIData;
import com.allenliu.versionchecklib.v2.callback.RequestVersionListener;
import com.zhhl.R;
import com.zhhl.common.GsonHelper;
import com.zhhl.common.SPHelper;
import com.zhhl.model.UpdateInfo;
import com.zhhl.permission.MyCheckPermission;
import com.zhhl.permission.PermissionContant;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

/**
 * 外国人app主页
 */

public class FirstActivity extends Activity implements MyWebChomeClient.OpenFileChooserCallBack{

    private WebView webview;

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
        requestWindowFeature(Window.FEATURE_NO_TITLE);
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_first);
        webview = findViewById(R.id.webView);
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
        webview.setWebChromeClient(new MyWebChomeClient(FirstActivity.this));


        webview.getSettings().setJavaScriptCanOpenWindowsAutomatically(true);
        //在js中调用本地java方法
        webview.addJavascriptInterface(new JsInterface(this), "AndroidWebView");
        String url = "file:///android_asset/foreigner/html/main_frm.html";
        //webview.addJavascriptInterface(new AndroidInterface(FirstActivity.this, ThirdActivity.class), "AndroidInterface");
        webview.loadUrl(url);
        fixDirPath();

        checkVersion();

    }

    private void checkVersion() {

        String requestUrl = "http://crj.gafw.jl.gov.cn/jeecg/ReadXmlFileController.do?getServlet";
        HttpParams httpParams = new HttpParams();
        httpParams.put("openid","wkb");
        AllenVersionChecker.getInstance()
                .requestVersion()
                .setRequestMethod(HttpRequestMethod.POST)
                .setRequestParams(httpParams)
                .setRequestUrl(requestUrl)
                .request(new RequestVersionListener() {
                    @Nullable
                    @Override
                    public UIData onRequestVersionSuccess(String result) {
                        //拿到服务器返回的数据，解析，拿到downloadUrl和一些其他的UI数据
                        //如果是最新版本直接return null
//                        return null;
                        try {
                            PackageInfo packageinfo = FirstActivity.this.getPackageManager().getPackageInfo(FirstActivity.this.getPackageName(),0);
                            UpdateInfo updateinfo = GsonHelper.gson.fromJson(result.toString(), UpdateInfo.class);
                            String versonCode = updateinfo.getObj().getBy1();
                            if (!TextUtils.isEmpty(versonCode)){
                                Integer versonCodeRemote = Integer.parseInt(versonCode);
                                Integer versonCodeLocal = packageinfo.versionCode;
                                if (versonCodeLocal<versonCodeRemote){
                                    String updateMsg = updateinfo.getObj().getToUpdate();
                                    String downloadUrl = updateinfo.getObj().getDownload();
                                   return UIData.create().setDownloadUrl(downloadUrl).setTitle("更新提示").setContent(updateMsg);
                                }
                            }else{
                                return null;
                            }
                        } catch (PackageManager.NameNotFoundException e) {
                            e.printStackTrace();
                        }
                        return null;
                    }

                    @Override
                    public void onRequestVersionFailure(String message) {

                    }
                }).excuteMission(FirstActivity.this);
    }

    private class JsInterface {
        private Context mContext;

        public JsInterface(Context context) {
            this.mContext = context;
        }

        //在js中调用window.AndroidWebView.showInfoFromJs(name)，便会触发此方法。
        @JavascriptInterface
        public String showInfoFromJs(String name, String fwid, String xxdz, String sspcs) {
            // 外国人跳转
            if (name.equals("wgr")) {
                Intent intentWgr = new Intent(FirstActivity.this, ThirdActivity.class);
                intentWgr.putExtra("languagetype", "ch");
                mContext.startActivity(intentWgr);
            } else if (name.equals("fz")) { // 房主跳转
                Intent intentFz = new Intent(FirstActivity.this, OwnerActivity.class);
                intentFz.putExtra("fwid", fwid);
                mContext.startActivity(intentFz);
            } else if (name.equals("ywwgr")) { // 房主跳转
                Intent intentYwwgr = new Intent(FirstActivity.this, ThirdActivity.class);
                intentYwwgr.putExtra("languagetype", "en");
                mContext.startActivity(intentYwwgr);
            } else if (name.equals("tiaozhuan")) {

            } else if (name.equals("kqdw")) {
                System.out.println("12323123");
                requestPermission();
                return "1";
            } else if (name.equals("getLanguagetype")) {
                String languagetype = SPHelper.get(FirstActivity.this, "languagetype","ch");
                return languagetype;
            } else if (name.equals("islogin")) {
                SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");
                String date = sdf.format(new java.util.Date());
                SPHelper.put(FirstActivity.this, "islogin", sspcs + "," + date);
                SPHelper.put(FirstActivity.this, "ldphone", sspcs);
                Intent intent = new Intent(FirstActivity.this, OwnerLdIndexActivity.class);
                mContext.startActivity(intent);
            } else if (name.equals("ld")) {
                Intent intentFz = new Intent(FirstActivity.this, OwnerLdActivity.class);
                SPHelper.put(FirstActivity.this, "ldlddz", xxdz);
                SPHelper.put(FirstActivity.this, "ldsspcs", sspcs);
                SPHelper.put(FirstActivity.this, "ldfwid", fwid);
                mContext.startActivity(intentFz);
            }  else if (name.equals("getphone")) {
                return SPHelper.get(FirstActivity.this, "ldphone", "");
            } else if (name.equals("kqdw")) {
                requestPermission();
                return "1";
            } else if (name.equals("visa")) {
                Intent intentVisa = new Intent(FirstActivity.this, OwnerVisaActivity.class);
                SPHelper.put(FirstActivity.this, "languagetype", fwid);
                mContext.startActivity(intentVisa);
            }
            return "";
        }

        @JavascriptInterface
        public String getMyIMEI(){
            String IMEI = getDeviceId(FirstActivity.this);
            if (TextUtils.isEmpty(IMEI)){
                Toast.makeText(FirstActivity.this,"未获取到设备编号，请点击允许获取权限",Toast.LENGTH_LONG).show();
            }
            return IMEI;
        }
    }



    public final static int REQUEST_READ_PHONE_STATE = 1;


    @SuppressLint("HardwareIds")
    public static String getDeviceId(Context context) {
        String deviceId = "";
        TelephonyManager tm = (TelephonyManager) context.getSystemService(Context.TELEPHONY_SERVICE);
        if (null != tm) {
            if (ActivityCompat.checkSelfPermission(context, Manifest.permission.READ_PHONE_STATE) != PackageManager.PERMISSION_GRANTED) {
                ActivityCompat.requestPermissions((Activity) context, new String[]{Manifest.permission.READ_PHONE_STATE}, REQUEST_READ_PHONE_STATE);
            } else {
                if (tm.getDeviceId() != null) {
                    deviceId = tm.getDeviceId();
                } else {
                    deviceId = Settings.Secure.getString(context.getApplicationContext().getContentResolver(), Settings.Secure.ANDROID_ID);
                }
            }
            Log.d("deviceId--->", deviceId);
            return deviceId;
        }
        return "";
    }

    public class MyWebViewClient extends WebChromeClient {
        //处理javascript中的alert
        public boolean onJsAlert(WebView view, String url, String message, final JsResult result) {
            //构建一个Builder来显示网页中的对话框
            AlertDialog.Builder builder = new AlertDialog.Builder(FirstActivity.this);
            builder.setTitle("Alert");
            builder.setMessage(message);
            builder.setPositiveButton(android.R.string.ok,
                    new AlertDialog.OnClickListener() {
                        public void onClick(DialogInterface dialog, int which) {
                            result.confirm();
                        }
                    });
            builder.setCancelable(false);
            builder.create();
            builder.show();
            return true;
        }



        //处理javascript中的confirm
        public boolean onJsConfirm(WebView view, String url, String message, final JsResult result) {
            AlertDialog.Builder builder = new AlertDialog.Builder(FirstActivity.this);
            builder.setTitle("confirm");
            builder.setMessage(message);
            builder.setPositiveButton(android.R.string.ok,
                    new AlertDialog.OnClickListener() {
                        public void onClick(DialogInterface dialog, int which) {
                            result.confirm();
                        }
                    });
            builder.setNegativeButton(android.R.string.cancel,
                    new DialogInterface.OnClickListener() {
                        public void onClick(DialogInterface dialog, int which) {
                            result.cancel();
                        }
                    });
            builder.setCancelable(false);
            builder.create();
            builder.show();
            return true;
        }
    }
    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        if (keyCode == KeyEvent.KEYCODE_BACK) {
            if (webview.canGoBack()) {
                webview.goBack(); // go back in only the web view
                return true;
            }
            moveTaskToBack(true);
            return true;
        }
        return super.onKeyDown(keyCode, event);
    }

    class MyChromeViewClient extends WebChromeClient {
        public void onGeolocationPermissionsShowPrompt(final String origin, final android.webkit.GeolocationPermissions.Callback callback) {
            final boolean remember = true;
            callback.invoke(origin, true, remember);
        }
    }

    public  void requestPermission(){
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            MyCheckPermission checkPermission = new MyCheckPermission(FirstActivity.this);
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
        FirstActivity.this.requestPermissions(permission,
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



    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
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
        alertDialog.setOnCancelListener(new DialogOnCancelListener());

        alertDialog.setTitle("请选择操作");
        // gallery, camera.
        String[] options = {"相册", "拍照"};

        alertDialog.setItems(options, new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        if (which == 0) {
                            if (PermissionUtil.isOverMarshmallow()) {
                                if (!PermissionUtil.isPermissionValid(FirstActivity.this, Manifest.permission.READ_EXTERNAL_STORAGE)) {
                                    Toast.makeText(FirstActivity.this,
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
                                Toast.makeText(FirstActivity.this,
                                        "请去\"设置\"中开启本应用的图片媒体访问权限",
                                        Toast.LENGTH_SHORT).show();
                                restoreUploadMsg();
                            }

                        } else {
                            if (PermissionUtil.isOverMarshmallow()) {
                                if (!PermissionUtil.isPermissionValid(FirstActivity.this, Manifest.permission.WRITE_EXTERNAL_STORAGE)) {
                                    Toast.makeText(FirstActivity.this,
                                            "请去\"设置\"中开启本应用的图片媒体访问权限",
                                            Toast.LENGTH_SHORT).show();

                                    restoreUploadMsg();
                                    requestPermissionsAndroidM();
                                    return;
                                }

                                if (!PermissionUtil.isPermissionValid(FirstActivity.this, Manifest.permission.CAMERA)) {
                                    Toast.makeText(FirstActivity.this,
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
                                newPhotoUri=ImageUtil.newPictureFile(FirstActivity.this,tempFile);
                                intent.putExtra(MediaStore.EXTRA_OUTPUT, newPhotoUri);
                                mSourceIntent = intent;
//                                mSourceIntent = ImageUtil.takeBigPicture(IndexActivity.this);
                                startActivityForResult(mSourceIntent, REQUEST_CODE_IMAGE_CAPTURE);

                            } catch (Exception e) {
                                System.out.println("***********************************************************************测试一下");
                                e.printStackTrace();
                                Toast.makeText(FirstActivity.this,
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

            case REQUEST_READ_PHONE_STATE:
                if ((grantResults.length > 0) && (grantResults[0] == PackageManager.PERMISSION_GRANTED)) {
                    getDeviceId(this);
                } else {
                    Toast.makeText(this, "权限已被用户拒绝", Toast.LENGTH_SHORT).show();
                }
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

            PermissionUtil.requestPermissions(FirstActivity.this, P_CODE_PERMISSIONS, needPermissionList);

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

            Toast.makeText(FirstActivity.this, strMessage, Toast.LENGTH_SHORT).show();

        } else {
            return;
        }
    }


}
