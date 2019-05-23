package com.zhhl.ui;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.webkit.JavascriptInterface;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import com.zhhl.R;
import com.zhhl.common.AndroidInterface;
import com.zhhl.common.SPHelper;

import java.text.SimpleDateFormat;

/**
 * 选择登记类型(外国人，房东)
 */
public class OwnerLdIndexActivity extends Activity {
    public WebView webview;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_success);
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
        webview.addJavascriptInterface(new OwnerLdIndexActivity.JsInterface(this), "AndroidWebView");
        String url = "file:///android_asset/hostel/addresses.html";
//        AndroidInterface af = new AndroidInterface(OwnerLdIndexActivity.this, OwnerLdActivity.class);
//        webview.addJavascriptInterface(af, "AndroidInterface");
        webview.loadUrl(url);
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
            if (name.equals("ld")) {
                Intent intentFz = new Intent(OwnerLdIndexActivity.this, OwnerLdActivity.class);
                SPHelper.put(OwnerLdIndexActivity.this, "ldlddz", xxdz);
                SPHelper.put(OwnerLdIndexActivity.this, "ldsspcs", sspcs);
                SPHelper.put(OwnerLdIndexActivity.this, "ldfwid", fwid);
                mContext.startActivity(intentFz);
            } else if (name.equals("getphone")) {
                return SPHelper.get(OwnerLdIndexActivity.this, "ldphone", "");
            }
            return "";
        }
    }
}
