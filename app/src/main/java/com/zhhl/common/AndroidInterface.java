package com.zhhl.common;

import android.content.Context;
import android.content.Intent;
import android.util.Log;
import android.webkit.JavascriptInterface;

import com.zhhl.interfaces.UploadInterface;
import com.zhhl.model.User;

import java.io.File;
import java.io.IOException;
import java.util.concurrent.Callable;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.MediaType;
import okhttp3.MultipartBody;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

/**
 * Created by zane on 2017/9/23.
 */

public class AndroidInterface {

    private Context packageContext;
    private Class<?> cls;


    public Callable scanCallBack;
    public Callable recordVideo;
    public Callable previewVideo;

    public UploadInterface uploadInterface;


    public AndroidInterface(Context packageContext, Class<?> cls) {
        this.packageContext = packageContext;
        this.cls = cls;
    }

    @JavascriptInterface
    public void go() {
        Intent intent = new Intent(packageContext, cls);
        packageContext.startActivity(intent);
    }

    @JavascriptInterface
    public void startView() {
        try {
            recordVideo.call();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @JavascriptInterface
    public void save(String ss, String gf) {
        try {
            uploadInterface.myCallBack(ss, gf);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @JavascriptInterface
    public String userInfo() {
        String st = SPHelper.get(packageContext, Constants.USER_INFO, "");
        return SPHelper.get(packageContext, Constants.USER_INFO, "");
    }

    @JavascriptInterface
    public void scan() throws Exception {
        scanCallBack.call();
    }

    @JavascriptInterface
    public void preview() throws Exception{
        previewVideo.call();
    }
    @JavascriptInterface
    public void uploadImg() throws Exception {
        Log.i("file++++++++++++", "dsdsdsdsdsdsd");
        Log.i("file++++++++++++", SPHelper.get(packageContext, Constants.USER_INFO, ""));
        User user = GsonHelper.gson.fromJson(SPHelper.get(packageContext, Constants.USER_INFO, ""), User.class);
        File file = new File(user.getFullImg());
        Log.i("file++++++++++++", file.getName());
        MultipartBody.Builder builder =  new MultipartBody.Builder().setType(MultipartBody.FORM);
        builder.addFormDataPart("zjhm", user.getZjhm() + "_zp");
        builder.addFormDataPart("file", file.getName(), RequestBody.create(MediaType.parse("image/png"), file));
        String url = "http://crj.gafw.jl.gov.cn/jeecg/fileUploadController.do?uploadnewApp";
        RequestBody body = builder.build();
        Request request = new Request.Builder().url(url).post(body).build();
        OkHttpClient client = new OkHttpClient();
        client.newCall(request).enqueue(new Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
                Log.i("http+++++++", "请求失败");
            }

            @Override
            public void onResponse(Call call, Response response) throws IOException {
                Log.i("http+++++++", "请求成功");
                try {
                    recordVideo.call();
                } catch (Exception e) {
                    e.printStackTrace();
                }

            }
        });
    }


}
