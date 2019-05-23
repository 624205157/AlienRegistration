package com.zhhl.ui;

import android.app.Activity;
import android.os.Bundle;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;

import com.zhhl.R;
import com.zhhl.common.AndroidInterface;

public class PromptActivity extends Activity {
    public WebView webview;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_prompt);
        webview = (WebView) findViewById(R.id.webView);
        webview.setWebChromeClient(new WebChromeClient());
        webview.setHorizontalScrollBarEnabled(false);//水平不显示
        webview.setVerticalScrollBarEnabled(false); //垂直不显示
        webview.getSettings().setUseWideViewPort(true);//自适应屏幕
        webview.getSettings().setLayoutAlgorithm(WebSettings.LayoutAlgorithm.SINGLE_COLUMN);
        webview.getSettings().setLoadWithOverviewMode(true);
        webview.getSettings().setJavaScriptEnabled(true);
        String url = "file:///android_asset/register/photo_hint.html";
        AndroidInterface af = new AndroidInterface(PromptActivity.this, ThirdActivity.class);
        webview.addJavascriptInterface(af, "AndroidInterface");
        webview.loadUrl(url);
    }

}
