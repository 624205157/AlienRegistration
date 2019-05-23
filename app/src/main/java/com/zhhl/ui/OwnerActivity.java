package com.zhhl.ui;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.os.Bundle;
import android.util.Log;
import android.webkit.JavascriptInterface;
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
import java.util.Calendar;
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
public class OwnerActivity extends Activity {
    private static final String TAG = "OwnerActivity";
    private String[] langs = {"zh", "en"};
    private WebView webview;
    private File[] files;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_owner);
        AppManager.getAppManager().finishAllActivity();
        FileHelper.makeRootDirectory(Constants.VIDEOFZ_ROOT);
        SPHelper.put(OwnerActivity.this, Constants.VIDEOFZPATH, "novideo");
        String fwid =  getIntent().getStringExtra("fwid");
        SPHelper.put(OwnerActivity.this, "languagetype", "ch");
        if (fwid != null && !"".equals(fwid)) {
            SPHelper.put(OwnerActivity.this, "fwid", fwid);
        }
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
                Toast.makeText(OwnerActivity.this, R.string.scan_fail, Toast.LENGTH_LONG);

            if (recogResult.endsWith(",")) {
                recogResult = recogResult.substring(0, recogResult.length() - 1);
            }
            recogResult = recogResult.replaceAll(":", "\":\"");
            recogResult = recogResult.replaceAll(",", "\",\"");
            recogResult = "{\"" + recogResult + "\"}";
            UserInfo userInfo = GsonHelper.gson.fromJson(recogResult, UserInfo.class);
            userInfo.setFullImg(fullPagePath);
            userInfo.setCutImg(cutPagePath);
            SPHelper.put(OwnerActivity.this, Constants.USERFZ_INFO, userInfo.toString());
            Log.i(TAG,"用户信息"+ SPHelper.get(OwnerActivity.this, Constants.USERFZ_INFO, ""));
            initWebView();
        }else if("back".equals(scanStatus)){//CameraActivity返回(无任何信息)
            initWebView();
        } else{//调取摄像头扫描
            scan();
        }
    }

    private void initWebView() {
        webview = (WebView) findViewById(R.id.webView);
        webview.setWebChromeClient(new WebChromeClient());
        webview.setWebViewClient(new WebViewClient());
        webview.setHorizontalScrollBarEnabled(false);//水平不显示
        webview.setVerticalScrollBarEnabled(false); //垂直不显示
        webview.getSettings().setUseWideViewPort(true);//自适应屏幕
        webview.getSettings().setLayoutAlgorithm(WebSettings.LayoutAlgorithm.SINGLE_COLUMN);
        webview.getSettings().setLoadWithOverviewMode(true);
        webview.getSettings().setJavaScriptEnabled(true);
        //在js中调用本地java方法
        webview.addJavascriptInterface(new JsInterface(this), "AndroidWebView");
        String url = "file:///android_asset/register/feedback.html";
        webview.loadUrl(url);
    }

    private class JsInterface {
        private Context mContext;

        public JsInterface(Context context) {
            this.mContext = context;
        }

        //在js中调用window.AndroidWebView.showInfoFromJs(name)，便会触发此方法。
        @JavascriptInterface
        public String showInfoFromJs(String flag, String xxdz, String ywm, String ywx, String zwxm, String xb, String lxdh, String gjdq,
                String zjhm, String zjlx, String zjdq, String tlsy, String sspcs, String gnlxr, String gnlxdh, String nlksj, String type, String fzdh, String fwdz, String csrq) {
            if (flag.equals("scan")) {
                Intent intent = new Intent(OwnerActivity.this, CameraActivity.class);
                if (Build.VERSION.SDK_INT >= 23) {
                    CheckPermission checkPermission = new CheckPermission(OwnerActivity.this);
                    if (checkPermission.permissionSet(com.kernal.passportreader.sdk.MainActivity.PERMISSION)) {
                        PermissionActivity.startActivityForResult(OwnerActivity.this, 0,
                                SharedPreferencesHelper.getInt(
                                        getApplicationContext(), "nMainId", 13),
                                Devcode.devcode, 0,0, com.kernal.passportreader.sdk.MainActivity.PERMISSION);
                    } else {
                        intent.putExtra("nMainId", SharedPreferencesHelper.getInt(
                                getApplicationContext(), "nMainId", 13));
                        intent.putExtra("devcode", Devcode.devcode);
                        intent.putExtra("flag", 0);
                        intent.putExtra("from", "owner");
                        OwnerActivity.this.finish();
                        startActivity(intent);
                    }
                } else {
                    intent.putExtra("nMainId", SharedPreferencesHelper.getInt(
                            getApplicationContext(), "nMainId", 13));
                    intent.putExtra("devcode", Devcode.devcode);
                    intent.putExtra("flag", 0);
                    intent.putExtra("from", "owner");
                    OwnerActivity.this.finish();
                    startActivity(intent);
                }
            } else if (flag.equals("fwxx")) {
                String fwidfh = SPHelper.get(mContext, "fwid", "");
                return fwidfh;
            } else if (flag.equals("record")) {
                startRecorder();
            } else if (flag.equals("userInfoNew")) {
                String userInfo = SPHelper.get(mContext, Constants.USERFZ_INFO, "");
                return userInfo;
            } else if (flag.equals("preview")) {
                String playpath = SPHelper.get(OwnerActivity.this,Constants.VIDEOFZPATH,"novideo");
                if (StringUtils.isEmpty(playpath) || "novideo".equals(playpath)){
                    Toast.makeText(OwnerActivity.this,"请先采集人像信息",Toast.LENGTH_SHORT).show();
                }else {
                    Intent intent = new Intent(OwnerActivity.this,PreviewFzActivity.class);
                    startActivity(intent);
                }
            } else if (flag.equals("save")) {
//                xxdz = xxdz;
                String playpath = SPHelper.get(OwnerActivity.this,Constants.VIDEOFZPATH,"novideo");
//                if (StringUtils.isEmpty(playpath) || "novideo".equals(playpath)){
//                    Toast.makeText(OwnerActivity.this,"请先采集人像信息",Toast.LENGTH_SHORT).show();
//                    return "";
//                }

                //uploadVideo(playpath, "cedddd");
                //foreignListController.do?doAdd
                long timeStamp = System.currentTimeMillis();
                //获取当前时间
                Calendar c = Calendar.getInstance();//可以对每个时间域单独修改
                int year = c.get(Calendar.YEAR);
                int month = c.get(Calendar.MONTH);
                //获取后缀名
                File file = new File(playpath);
                String name = file.getName();
                String prefix = name.substring(name.lastIndexOf(".")+1);
                String fileName = zjhm + timeStamp + "_" + year + (month + 1);

                SPHelper.put(OwnerActivity.this, "fzzwxm", zwxm);
                SPHelper.put(OwnerActivity.this, "fzxxdz", xxdz);
                SPHelper.put(OwnerActivity.this, "fzywm", ywm);
                SPHelper.put(OwnerActivity.this, "fzywx", ywx);
                SPHelper.put(OwnerActivity.this, "fzxb", xb);
                SPHelper.put(OwnerActivity.this, "fzby3", csrq);
                SPHelper.put(OwnerActivity.this, "fzlxdh", lxdh);
                SPHelper.put(OwnerActivity.this, "fzgjdq", gjdq);
                SPHelper.put(OwnerActivity.this, "fzzjhm", zjhm);
                SPHelper.put(OwnerActivity.this, "fzzjlx", zjlx);
                SPHelper.put(OwnerActivity.this, "fzzjdq", zjdq);
                SPHelper.put(OwnerActivity.this, "fztlsy", tlsy);
                SPHelper.put(OwnerActivity.this, "fzsspcs", sspcs);
                SPHelper.put(OwnerActivity.this, "fzgnlxr", gnlxr);
                SPHelper.put(OwnerActivity.this, "fzgnlxdh", gnlxdh);
                SPHelper.put(OwnerActivity.this, "fznlksj", nlksj);
                SPHelper.put(OwnerActivity.this, "fztype", type);
                SPHelper.put(OwnerActivity.this, "fzfileName", fileName + "." + prefix);
                SPHelper.put(OwnerActivity.this, "fzfzdh", fzdh);
                SPHelper.put(OwnerActivity.this, "fzfwdz", fwdz);
                User user = GsonHelper.gson.fromJson(SPHelper.get(OwnerActivity.this, Constants.USERFZ_INFO, ""), User.class);
                if (user != null && !"".equals(user.getFullImg())) {
                    File fileImg = new File(user.getFullImg());
                    String nameImg = fileImg.getName();
                    String prefixImg = nameImg.substring(nameImg.lastIndexOf(".")+1);
                    SPHelper.put(OwnerActivity.this, "fzzjzppath", fileName + "." + prefixImg);
                }
                startRecorder();
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
        Intent intent = new Intent(OwnerActivity.this, CameraActivity.class);
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
                intent.putExtra("from", "owner");
                OwnerActivity.this.finish();
                startActivity(intent);
            }
        } else {
            intent.putExtra("nMainId", SharedPreferencesHelper.getInt(
                    getApplicationContext(), "nMainId", 13));
            intent.putExtra("devcode", Devcode.devcode);
            intent.putExtra("flag", 0);
            intent.putExtra("from", "owner");
            OwnerActivity.this.finish();
            startActivity(intent);
        }
    }

    private void changeLanguage() {
        int r = Math.abs(new Random().nextInt()) % 2;
        LocaleHelper.setLocale(OwnerActivity.this, langs[r]);
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
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        switch (resultCode) {
            case 99:
                checkVideo();
                break;

            default:
                break;
        }

        super.onActivityResult(requestCode, resultCode, data);
    }

    private void checkVideo() {
        File file = new File(Constants.VIDEOFZ_ROOT);
        files = file.listFiles();
        String playpath = SPHelper.get(OwnerActivity.this,Constants.VIDEOFZPATH,"novideo");
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
                    Intent intentSu = new Intent(OwnerActivity.this, SuccessActivity.class);
                    OwnerActivity.this.startActivity(intentSu);
                } catch (Exception e) {
                    e.printStackTrace();
                }

            }
        });
    }
    /*
	 * 获取文件
	 */
    private void showFileItems() {
        String playpath = SPHelper.get(OwnerActivity.this,Constants.VIDEOFZPATH,"novideo");
        String fileName = SPHelper.get(OwnerActivity.this, "fzfileName", "");
        MultipartBody.Builder builder =  new MultipartBody.Builder().setType(MultipartBody.FORM);
        builder.addFormDataPart("zwxm", SPHelper.get(OwnerActivity.this, "fzzwxm", ""));
        builder.addFormDataPart("xxdz", SPHelper.get(OwnerActivity.this, "fzxxdz", ""));
        builder.addFormDataPart("ywm", SPHelper.get(OwnerActivity.this, "fzywm", ""));
        builder.addFormDataPart("ywx", SPHelper.get(OwnerActivity.this, "fzywx", ""));
        builder.addFormDataPart("xb", SPHelper.get(OwnerActivity.this, "fzxb", ""));
        builder.addFormDataPart("lxdh", SPHelper.get(OwnerActivity.this, "fzlxdh", ""));
        builder.addFormDataPart("gjdq", SPHelper.get(OwnerActivity.this, "fzgjdq", ""));
        builder.addFormDataPart("zjhm", SPHelper.get(OwnerActivity.this, "fzzjhm", ""));
        builder.addFormDataPart("zjlx", SPHelper.get(OwnerActivity.this, "fzzjlx", ""));
        builder.addFormDataPart("zjdq", SPHelper.get(OwnerActivity.this, "fzzjdq", ""));
        builder.addFormDataPart("tlsy", SPHelper.get(OwnerActivity.this, "fztlsy", ""));
        builder.addFormDataPart("sspcs", SPHelper.get(OwnerActivity.this, "fzsspcs", ""));
        builder.addFormDataPart("gnlxr", SPHelper.get(OwnerActivity.this, "fzgnlxr", ""));
        builder.addFormDataPart("gnlxdh", SPHelper.get(OwnerActivity.this, "fzgnlxdh", ""));
        builder.addFormDataPart("nlksj", SPHelper.get(OwnerActivity.this, "fznlksj", ""));
        builder.addFormDataPart("type", SPHelper.get(OwnerActivity.this, "fztype", ""));
        builder.addFormDataPart("htcjpath", fileName);
        builder.addFormDataPart("fzdh", SPHelper.get(OwnerActivity.this, "fzfzdh", ""));
        builder.addFormDataPart("fwdz", SPHelper.get(OwnerActivity.this, "fzfwdz", ""));

//                builder.addFormDataPart("file", file.getName(), RequestBody.create(MediaType.parse("video/mp4"), file));//此方法第二个参数非视频文件名
        String url = "http://crj.gafw.jl.gov.cn/jeecg/foreignListController.do?doAdd";
        RequestBody body = builder.build();
        Request request = new Request.Builder().url(url).post(body).build();
        OkHttpClient client = new OkHttpClient();
        client.newCall(request).enqueue(new Callback() {
            @Override
            public void onFailure(Call call, IOException c) {
//                        Toast.makeText(OwnerActivity.this,"OK",Toast.LENGTH_SHORT).show();
                c.printStackTrace();
            }

            @Override
            public void onResponse(Call call, Response response) throws IOException {
                try {
                    uploadVideo(playpath, fileName);
                } catch (Exception e) {
                    e.printStackTrace();
                }

            }
        });
//        File file = new File(Constants.VIDEOFZ_ROOT));
//        files = file.listFiles();
//        // 按时间排序
//        Arrays.sort(files, new CompratorByLastModified());
//
//        int count = files.length;
//        names = new String[count];
//        paths = new String[count];
//        longTime = new String[count];
//        seconds = new String[count];
//        createTime = new Long[count];
//        for (int i = 0; i < count; i++) {
//            File f = files[i];
//            names[i] = f.getName();
//            paths[i] = f.getPath();
//            createTime[i] = f.lastModified();
//            MediaPlayer mediaPlayer = new MediaPlayer();
//            try {
//                mediaPlayer.setDataSource(f.getPath());
//                mediaPlayer.prepare();
//            } catch (IllegalArgumentException e) {
//                e.printStackTrace();
//            } catch (SecurityException e) {
//                e.printStackTrace();
//            } catch (IllegalStateException e) {
//                e.printStackTrace();
//            } catch (IOException e) {
//                e.printStackTrace();
//            }
//            seconds[i] = mediaPlayer.getDuration()+"";
//            longTime[i] = mediaPlayer.getDuration()/1000 + getString(R.string.second);
//        }
//        adapter.notifyDataSetChanged();
//        // 初始化视频预览图片
//        videoBitmap = new Bitmap[count];
//        new Thread(new Runnable() {
//            @Override
//            public void run() {
//                try {
//                    for(int i=0;i<paths.length;i++){
//                        Bitmap bitmap = ThumbnailUtils.createVideoThumbnail(paths[i], MediaStore.Images.Thumbnails.MINI_KIND);
//                        videoBitmap[i] = bitmap;
//                        handler.sendEmptyMessage(1);
//                    }
//                } catch (Exception e) {
//                    e.printStackTrace();
//                }
//            }
//        }).start();
    }

    public  void requestPermissionMc(){
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            MyCheckPermission checkPermission = new MyCheckPermission(OwnerActivity.this);
            if (checkPermission.permissionSet(PermissionContant.MediaRecordPermission)) {
                MyPermissionActivity.startActivityForResult(OwnerActivity.this,MCameraFZ.class,0,PermissionContant.MediaRecordPermission);
            } else {//获取全部权限
                Intent intent = new Intent(OwnerActivity.this,MCameraFZ.class);
                startActivity(intent);
            }
        } else {//6.0以下版本
            Intent intent = new Intent(OwnerActivity.this,MCameraFZ.class);
            startActivity(intent);
        }
    }

}
