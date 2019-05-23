package com.zhhl.ui;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.Window;
import android.webkit.JavascriptInterface;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.reflect.TypeToken;
import com.zhhl.R;
import com.zhhl.common.Constants;
import com.zhhl.common.GsonHelper;
import com.zhhl.common.SPHelper;
import com.zhhl.model.RequestBean;
import com.zhhl.model.RetInfo;
import com.zhhl.model.User;
import com.zhhl.model.UserInfo;

import org.apache.commons.lang3.StringUtils;
import org.json.JSONObject;

import java.io.File;
import java.io.IOException;
import java.lang.reflect.Type;
import java.util.Map;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.MediaType;
import okhttp3.MultipartBody;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

/**
 * 选择登记类型(外国人，房东)
 */
public class CheckSubmitActivity extends Activity {
    public WebView webview;
    public String userType = "";
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        requestWindowFeature(Window.FEATURE_NO_TITLE);
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_check);
        webview = (WebView) findViewById(R.id.webView);
        webview.setWebChromeClient(new WebChromeClient());
        webview.setWebViewClient(new WebViewClient());
        webview.setHorizontalScrollBarEnabled(false);//水平不显示
        webview.setVerticalScrollBarEnabled(false); //垂直不显示
        webview.getSettings().setUseWideViewPort(true);//自适应屏幕
        webview.getSettings().setLayoutAlgorithm(WebSettings.LayoutAlgorithm.SINGLE_COLUMN);
        webview.getSettings().setLoadWithOverviewMode(true);
        webview.getSettings().setJavaScriptEnabled(true);
        String url = "";
        userType =  getIntent().getStringExtra("type");
        if ("fz".equals(userType)) {
            url = "file:///android_asset/register/check_submit.html";
        } else if ("ld".equals(userType)) {
            url = "file:///android_asset/hostel/check_submit.html";
        } else {
            String languagetype = SPHelper.get(CheckSubmitActivity.this, "languagetype", "");
            if (languagetype != null && !"".equals(languagetype) && "ch".equals(languagetype)) {
                url = "file:///android_asset/register/check_submit.html";
            } else if (languagetype != null && !"".equals(languagetype) && "en".equals(languagetype)) {
                url = "file:///android_asset/register/check_submit_en.html";
            } else {
                url = "file:///android_asset/register/check_submit.html";
            }
        }

//        AndroidInterface af = new AndroidInterface(CheckSubmitActivity.this, FirstActivity.class);
//        webview.addJavascriptInterface(af, "AndroidInterface");
        webview.addJavascriptInterface(new JsInterface(this), "AndroidWebView");
        
        webview.loadUrl(url);
    }
    private class JsInterface {
        private Context mContext;

        public JsInterface(Context context) {
            this.mContext = context;
        }

        //在js中调用window.AndroidWebView.showInfoFromJs(name)，便会触发此方法。
        @JavascriptInterface
        public String showInfoFromJs(String flag) {
            if (flag.equals("record")) {
                if ("fz".equals(userType)) {
                    startRecorderFz();
                } else if ("ld".equals(userType)) {
                    startRecorderLd();
                } else {
                    startRecorder();
                }
            } else if (flag.equals("hf")) {
                if ("fz".equals(userType)) {
                    String playpath = SPHelper.get(CheckSubmitActivity.this,Constants.VIDEOFZPATH,"novideo");
                    if (StringUtils.isEmpty(playpath) || "novideo".equals(playpath)){
                        Toast.makeText(CheckSubmitActivity.this,"请先采集人像信息",Toast.LENGTH_SHORT).show();
                    }else {
                        Intent intent = new Intent(CheckSubmitActivity.this,PreviewFzActivity.class);
                        startActivity(intent);
                    }
                } else if ("ld".equals(userType)) {
                    String playpath = SPHelper.get(CheckSubmitActivity.this,Constants.VIDEOLDPATH,"novideo");
                    if (StringUtils.isEmpty(playpath) || "novideo".equals(playpath)){
                        Toast.makeText(CheckSubmitActivity.this,"请先采集人像信息",Toast.LENGTH_SHORT).show();
                    }else {
                        Intent intent = new Intent(CheckSubmitActivity.this,PreviewLdActivity.class);
                        startActivity(intent);
                    }
                } else {
                    String playpath = SPHelper.get(CheckSubmitActivity.this,Constants.VIDEOPATH,"novideo");
                    if (StringUtils.isEmpty(playpath) || "novideo".equals(playpath)){
                        Toast.makeText(CheckSubmitActivity.this,"请先采集人像信息",Toast.LENGTH_SHORT).show();
                    }else {
                        Intent intent = new Intent(CheckSubmitActivity.this,PreviewActivity.class);
                        startActivity(intent);
                    }
                }
            } else if (flag.equals("save")) {
                if ("fz".equals(userType)) {
                    String playpath = SPHelper.get(CheckSubmitActivity.this,Constants.VIDEOFZPATH,"");
                    String fileName = SPHelper.get(CheckSubmitActivity.this, "fzfileName", "");
                    MultipartBody.Builder builder =  new MultipartBody.Builder().setType(MultipartBody.FORM);
                    builder.addFormDataPart("zwxm", SPHelper.get(CheckSubmitActivity.this, "fzzwxm", ""));
                    builder.addFormDataPart("xxdz", SPHelper.get(CheckSubmitActivity.this, "fzxxdz", ""));
                    builder.addFormDataPart("ywm", SPHelper.get(CheckSubmitActivity.this, "fzywm", ""));
                    builder.addFormDataPart("ywx", SPHelper.get(CheckSubmitActivity.this, "fzywx", ""));
                    builder.addFormDataPart("xb", SPHelper.get(CheckSubmitActivity.this, "fzxb", ""));
                    builder.addFormDataPart("lxdh", SPHelper.get(CheckSubmitActivity.this, "fzlxdh", ""));
                    builder.addFormDataPart("by3", SPHelper.get(CheckSubmitActivity.this, "fzby3", ""));
                    builder.addFormDataPart("gjdq", SPHelper.get(CheckSubmitActivity.this, "fzgjdq", ""));
                    builder.addFormDataPart("zjhm", SPHelper.get(CheckSubmitActivity.this, "fzzjhm", ""));
                    builder.addFormDataPart("zjlx", SPHelper.get(CheckSubmitActivity.this, "fzzjlx", ""));
                    builder.addFormDataPart("zjdq", SPHelper.get(CheckSubmitActivity.this, "fzzjdq", ""));
                    builder.addFormDataPart("tlsy", SPHelper.get(CheckSubmitActivity.this, "fztlsy", ""));
                    builder.addFormDataPart("sspcs", SPHelper.get(CheckSubmitActivity.this, "fzsspcs", ""));
                    builder.addFormDataPart("gnlxr", SPHelper.get(CheckSubmitActivity.this, "fzgnlxr", ""));
                    builder.addFormDataPart("gnlxdh", SPHelper.get(CheckSubmitActivity.this, "fzgnlxdh", ""));
                    builder.addFormDataPart("nlksj", SPHelper.get(CheckSubmitActivity.this, "fznlksj", ""));
                    builder.addFormDataPart("type", SPHelper.get(CheckSubmitActivity.this, "fztype", ""));
                    builder.addFormDataPart("htcjpath", fileName);
                    builder.addFormDataPart("fzdh", SPHelper.get(CheckSubmitActivity.this, "fzfzdh", ""));
                    builder.addFormDataPart("fwdz", SPHelper.get(CheckSubmitActivity.this, "fzfwdz", ""));
                    builder.addFormDataPart("zjzppath", SPHelper.get(CheckSubmitActivity.this, "fzzjzppath", ""));

//                builder.addFormDataPart("file", file.getName(), RequestBody.create(MediaType.parse("video/mp4"), file));//此方法第二个参数非视频文件名
                    String url = "http://crj.gafw.jl.gov.cn/jeecg/foreignListController.do?doAdd";
                    RequestBody body = builder.build();
                    Request request = new Request.Builder().url(url).post(body).build();
                    OkHttpClient client = new OkHttpClient();
                    client.newCall(request).enqueue(new Callback() {
                        @Override
                        public void onFailure(Call call, IOException c) {
//                        Toast.makeText(CheckSubmitActivity.this,"OK",Toast.LENGTH_SHORT).show();
                            //c.printStackTrace();
                            webview.post(new Runnable() {
                                @Override
                                public void run() {
                                    webview.loadUrl("javascript:showInfoFromJava('失败')");
                                }
                            });
                        }

                        @Override
                        public void onResponse(Call call, Response response) throws IOException {
                            try {
                                String msg = response.body().string();
                                JSONObject jsonObject = new JSONObject(msg);
                                String str = jsonObject.getJSONObject("obj").getString("type");
                                if ("0".equals(str)) {
                                    uploadVideo(playpath, fileName);
                                } else {
                                    webview.post(new Runnable() {
                                        @Override
                                        public void run() {
                                            webview.loadUrl("javascript:showInfoFromJava('失败')");
                                        }
                                    });
                                }
                            } catch (Exception e) {
                                e.printStackTrace();
                            }

                        }
                    });
                } else if ("ld".equals(userType)) {
                    String playpath = SPHelper.get(CheckSubmitActivity.this,Constants.VIDEOLDPATH,"novideo");
                    String fileName = SPHelper.get(CheckSubmitActivity.this, "ldfileName", "");
                    MultipartBody.Builder builder =  new MultipartBody.Builder().setType(MultipartBody.FORM);
                    builder.addFormDataPart("zwxm", SPHelper.get(CheckSubmitActivity.this, "ldzwxm", ""));
                    builder.addFormDataPart("xxdz", SPHelper.get(CheckSubmitActivity.this, "ldxxdz", ""));
                    builder.addFormDataPart("ywm", SPHelper.get(CheckSubmitActivity.this, "ldywm", ""));
                    builder.addFormDataPart("ywx", SPHelper.get(CheckSubmitActivity.this, "ldywx", ""));
                    builder.addFormDataPart("xb", SPHelper.get(CheckSubmitActivity.this, "ldxb", ""));
                    builder.addFormDataPart("lxdh", SPHelper.get(CheckSubmitActivity.this, "ldlxdh", ""));
                    builder.addFormDataPart("by3", SPHelper.get(CheckSubmitActivity.this, "ldby3", ""));
                    builder.addFormDataPart("gjdq", SPHelper.get(CheckSubmitActivity.this, "ldgjdq", ""));
                    builder.addFormDataPart("zjhm", SPHelper.get(CheckSubmitActivity.this, "ldzjhm", ""));
                    builder.addFormDataPart("zjlx", SPHelper.get(CheckSubmitActivity.this, "ldzjlx", ""));
                    builder.addFormDataPart("zjdq", SPHelper.get(CheckSubmitActivity.this, "ldzjdq", ""));
                    builder.addFormDataPart("tlsy", SPHelper.get(CheckSubmitActivity.this, "ldtlsy", ""));
                    String ldsspcs = SPHelper.get(CheckSubmitActivity.this, "ldsspcs", "");
                    builder.addFormDataPart("sspcs", ldsspcs);
                    builder.addFormDataPart("gnlxr", SPHelper.get(CheckSubmitActivity.this, "ldgnlxr", ""));
                    builder.addFormDataPart("gnlxdh", SPHelper.get(CheckSubmitActivity.this, "ldgnlxdh", ""));
                    builder.addFormDataPart("nlksj", SPHelper.get(CheckSubmitActivity.this, "ldnlksj", ""));
                    builder.addFormDataPart("type", SPHelper.get(CheckSubmitActivity.this, "ldtype", ""));
                    builder.addFormDataPart("htcjpath", fileName);
                    // 房主电话
                    String ldphone = SPHelper.get(CheckSubmitActivity.this, "ldphone", "");
                    builder.addFormDataPart("fzdh", ldphone);
                    String ldlddz = SPHelper.get(CheckSubmitActivity.this, "ldlddz", "");
                    builder.addFormDataPart("fwdz", ldlddz);
                    builder.addFormDataPart("ldxm", SPHelper.get(CheckSubmitActivity.this, "ldldcm", ""));
                    // 房主姓名
                    String ldfwid = SPHelper.get(CheckSubmitActivity.this, "ldfwid", "");
                    builder.addFormDataPart("fzxm", ldfwid);

                    builder.addFormDataPart("zjzppath", SPHelper.get(CheckSubmitActivity.this, "ldzjzppath", ""));

//                builder.addFormDataPart("file", file.getName(), RequestBody.create(MediaType.parse("video/mp4"), file));//此方法第二个参数非视频文件名
                    String url = "http://crj.gafw.jl.gov.cn/jeecg/foreignListController.do?doAdd";
                    RequestBody body = builder.build();
                    Request request = new Request.Builder().url(url).post(body).build();
                    OkHttpClient client = new OkHttpClient();
                    client.newCall(request).enqueue(new Callback() {
                        @Override
                        public void onFailure(Call call, IOException c) {
//                        Toast.makeText(CheckSubmitActivity.this,"OK",Toast.LENGTH_SHORT).show();
                            //c.printStackTrace();
                            webview.post(new Runnable() {
                                @Override
                                public void run() {
                                    webview.loadUrl("javascript:showInfoFromJava('失败')");
                                }
                            });
                        }

                        @Override
                        public void onResponse(Call call, Response response) throws IOException {
                            try {
                                String msg = response.body().string();
                                JSONObject jsonObject = new JSONObject(msg);
                                String str = jsonObject.getJSONObject("obj").getString("type");
                                if ("0".equals(str)) {
                                    uploadVideo(playpath, fileName);
                                } else {
                                    webview.post(new Runnable() {
                                        @Override
                                        public void run() {
                                            webview.loadUrl("javascript:showInfoFromJava('失败')");
                                        }
                                    });
                                }
                            } catch (Exception e) {
                                webview.post(new Runnable() {
                                    @Override
                                    public void run() {
                                        webview.loadUrl("javascript:showInfoFromJava('失败')");
                                    }
                                });
                                e.printStackTrace();
                            }

                        }
                    });
                } else {
                    String playpath = SPHelper.get(CheckSubmitActivity.this,Constants.VIDEOPATH,"novideo");
                    String fileName = SPHelper.get(CheckSubmitActivity.this, "zwfileName", "");
                    MultipartBody.Builder builder =  new MultipartBody.Builder().setType(MultipartBody.FORM);
                    builder.addFormDataPart("zwxm", SPHelper.get(CheckSubmitActivity.this, "zwzwxm", ""));
                    builder.addFormDataPart("xxdz", SPHelper.get(CheckSubmitActivity.this, "zwxxdz", ""));
                    builder.addFormDataPart("ywm", SPHelper.get(CheckSubmitActivity.this, "zwywm", ""));
                    builder.addFormDataPart("ywx", SPHelper.get(CheckSubmitActivity.this, "zwywx", ""));
                    builder.addFormDataPart("xb", SPHelper.get(CheckSubmitActivity.this, "zwxb", ""));
                    builder.addFormDataPart("by3", SPHelper.get(CheckSubmitActivity.this, "zwby3", ""));
                    builder.addFormDataPart("lxdh", SPHelper.get(CheckSubmitActivity.this, "zwlxdh", ""));
                    builder.addFormDataPart("gjdq", SPHelper.get(CheckSubmitActivity.this, "zwgjdq", ""));
                    builder.addFormDataPart("zjhm", SPHelper.get(CheckSubmitActivity.this, "zwzjhm", ""));
                    builder.addFormDataPart("zjlx", SPHelper.get(CheckSubmitActivity.this, "zwzjlx", ""));
                    builder.addFormDataPart("zjdq", SPHelper.get(CheckSubmitActivity.this, "zwzjdq", ""));
                    builder.addFormDataPart("tlsy", SPHelper.get(CheckSubmitActivity.this, "zwtlsy", ""));
                    builder.addFormDataPart("sspcs", SPHelper.get(CheckSubmitActivity.this, "zwsspcs", ""));
                    builder.addFormDataPart("gnlxr", SPHelper.get(CheckSubmitActivity.this, "zwgnlxr", ""));
                    builder.addFormDataPart("gnlxdh", SPHelper.get(CheckSubmitActivity.this, "zwgnlxdh", ""));
                    builder.addFormDataPart("nlksj", SPHelper.get(CheckSubmitActivity.this, "zwnlksj", ""));
                    builder.addFormDataPart("type", SPHelper.get(CheckSubmitActivity.this, "zwtype", ""));
                    builder.addFormDataPart("htcjpath", fileName);
                    builder.addFormDataPart("zjzppath", SPHelper.get(CheckSubmitActivity.this, "zwzjzppath", ""));

//                builder.addFormDataPart("file", file.getName(), RequestBody.create(MediaType.parse("video/mp4"), file));//此方法第二个参数非视频文件名
                    String url = "http://crj.gafw.jl.gov.cn/jeecg/foreignListController.do?doAdd";
                    RequestBody body = builder.build();
                    Request request = new Request.Builder().url(url).post(body).build();
                    OkHttpClient client = new OkHttpClient();
                    client.newCall(request).enqueue(new Callback() {
                        @Override
                        public void onFailure(Call call, IOException c) {
//                        Toast.makeText(CheckSubmitActivity.this,"OK",Toast.LENGTH_SHORT).show();
                            //c.printStackTrace();
                            webview.post(new Runnable() {
                                @Override
                                public void run() {
                                    webview.loadUrl("javascript:showInfoFromJava('失败')");
                                }
                            });
                        }

                        @Override
                        public void onResponse(Call call, Response response) throws IOException {
                            try {
                                String msg = response.body().string();
                                JSONObject jsonObject = new JSONObject(msg);
                                String str = jsonObject.getJSONObject("obj").getString("type");
                                if ("0".equals(str)) {
                                    uploadVideo(playpath, fileName);
                                } else {
                                    webview.post(new Runnable() {
                                        @Override
                                        public void run() {
                                            webview.loadUrl("javascript:showInfoFromJava('失败')");
                                        }
                                    });
                                }
//                                Gson gson = new Gson();
//                                Map<String,String> map = gson.fromJson(response.body().toString(),new TypeToken<Map<String, String>>() {}.getType());
//                               String type =  map.get("type");
//                                String cc = response.body().toString();
//                                String aa = response.toString();
//                                //RetInfo retInfo = GsonHelper.gson.fromJson(response.body().toString(), RetInfo.class);
//                                RequestBean requestBean = GsonHelper.gson.fromJson(response.toString(), RequestBean.class);
//                                String type = requestBean.getType();
//                                Log.i("555555555555555555", "getUsePath:" + response.body());
                            } catch (Exception e) {
                                webview.post(new Runnable() {
                                    @Override
                                    public void run() {
                                        webview.loadUrl("javascript:showInfoFromJava('失败')");
                                    }
                                });
                                e.printStackTrace();
                            }

                        }
                    });
                }
            }
            return "";
        }
    }

    // 保存视频
    public void uploadVideo(String playpath, String filename) {
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
                    if ("fz".equals(userType)) {
                        User user = GsonHelper.gson.fromJson(SPHelper.get(CheckSubmitActivity.this, Constants.USERFZ_INFO, ""), User.class);
                        if (user != null && !"".equals(user.getFullImg())) {
                            uploadImg(user.getFullImg(), SPHelper.get(CheckSubmitActivity.this, "fzzjzppath", ""));
                        } else{
                            //File file = new File(user.getFullImg());
                            //Toast.makeText(CheckSubmitActivity.this,"OK",Toast.LENGTH_SHORT).show();
                            Intent intentFzSu = new Intent(CheckSubmitActivity.this, SuccessActivity.class);
                            CheckSubmitActivity.this.startActivity(intentFzSu);
                        }
                    } else if ("ld".equals(userType)) {
                        User user = GsonHelper.gson.fromJson(SPHelper.get(CheckSubmitActivity.this, Constants.USERLD_INFO, ""), User.class);
                        if (user != null && !"".equals(user.getFullImg())) {
                            uploadImg(user.getFullImg(), SPHelper.get(CheckSubmitActivity.this, "ldzjzppath", ""));
                        } else{
                            //File file = new File(user.getFullImg());
                            //Toast.makeText(CheckSubmitActivity.this,"OK",Toast.LENGTH_SHORT).show();
                            Intent intentFzSu = new Intent(CheckSubmitActivity.this, SuccessLdActivity.class);
                            CheckSubmitActivity.this.startActivity(intentFzSu);
                        }
                    } else {
                        User user = GsonHelper.gson.fromJson(SPHelper.get(CheckSubmitActivity.this, Constants.USER_INFO, ""), User.class);
                        if (user != null && !"".equals(user.getFullImg())) {
                            uploadImg(user.getFullImg(), SPHelper.get(CheckSubmitActivity.this, "zwzjzppath", ""));
                        } else{
                            //File file = new File(user.getFullImg());
                            //Toast.makeText(CheckSubmitActivity.this,"OK",Toast.LENGTH_SHORT).show();
                            Intent intentSu = null;
                            String languagetype = SPHelper.get(CheckSubmitActivity.this, "languagetype", "");
                            if (languagetype != null && !"".equals(languagetype) && "ch".equals(languagetype)) {
                                intentSu = new Intent(CheckSubmitActivity.this, SuccessActivity.class);
                            } else if (languagetype != null && !"".equals(languagetype) && "en".equals(languagetype)) {
                                intentSu = new Intent(CheckSubmitActivity.this, SuccessYwActivity.class);
                            } else {
                                intentSu = new Intent(CheckSubmitActivity.this, SuccessActivity.class);
                            }
                            CheckSubmitActivity.this.startActivity(intentSu);
                        }
                    }
                } catch (Exception e) {
                    webview.post(new Runnable() {
                        @Override
                        public void run() {
                            webview.loadUrl("javascript:showInfoFromJava('失败')");
                        }
                    });
                    e.printStackTrace();
                }

            }
        });
    }

    // 保存扫描图片
    public void uploadImg(String playpath, String filename) {
        //上传数据
        File file = new File(playpath);
        MultipartBody.Builder builder =  new MultipartBody.Builder().setType(MultipartBody.FORM);
        builder.addFormDataPart("zjhm", filename);
        builder.addFormDataPart("file", file.getName(), RequestBody.create(MediaType.parse("image/png"), file));
       // builder.addFormDataPart("file", file.getName(), RequestBody.create(MediaType.parse("video/mp4"), file));//此方法第二个参数非视频文件名
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
                    if ("fz".equals(userType)) {
                        Intent intentSu = new Intent(CheckSubmitActivity.this, SuccessActivity.class);
                        CheckSubmitActivity.this.startActivity(intentSu);
                    } else if ("ld".equals(userType)) {
                        Intent intentSu = new Intent(CheckSubmitActivity.this, SuccessLdActivity.class);
                        CheckSubmitActivity.this.startActivity(intentSu);
                    } else {
                        Intent intentSu = null;
                        String languagetype = SPHelper.get(CheckSubmitActivity.this, "languagetype", "");
                        if (languagetype != null && !"".equals(languagetype) && "ch".equals(languagetype)) {
                            intentSu = new Intent(CheckSubmitActivity.this, SuccessActivity.class);
                        } else if (languagetype != null && !"".equals(languagetype) && "en".equals(languagetype)) {
                            intentSu = new Intent(CheckSubmitActivity.this, SuccessYwActivity.class);
                        } else {
                            intentSu = new Intent(CheckSubmitActivity.this, SuccessActivity.class);
                        }
                        CheckSubmitActivity.this.startActivity(intentSu);
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }

            }
        });
    }
    
    /** * 录像 */
    public void startRecorder() {
        Log.i("99999999999","66666666666");
        Intent intent = new Intent();
        intent.setClass(CheckSubmitActivity.this, MCamera.class);
        startActivityForResult(intent, 99);
    }

    /** * 录像 */
    public void startRecorderFz() {
        Log.i("99999999999","66666666666");
        Intent intent = new Intent();
        intent.setClass(CheckSubmitActivity.this, MCameraFZ.class);
        startActivityForResult(intent, 99);
    }

    /** * 旅店录像 */
    public void startRecorderLd() {
        Log.i("99999999999","66666666666");
        Intent intent = new Intent();
        intent.setClass(CheckSubmitActivity.this, MCameraLd.class);
        startActivityForResult(intent, 99);
    }
}
