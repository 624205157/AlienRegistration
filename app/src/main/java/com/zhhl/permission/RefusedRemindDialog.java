package com.zhhl.permission;

import android.app.AlertDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.net.Uri;
import android.provider.Settings;

import com.zhhl.common.SPHelper;
import com.zhhl.ui.ThirdActivity;

/**
 * Created by JunpLi on 2017/10/10.
 */

public class RefusedRemindDialog {
    private Context context;
    public RefusedRemindDialog(Context context){
        this.context = context;
    }
    // 打开系统应用设置(ACTION_APPLICATION_DETAILS_SETTINGS:系统设置权限)
    private void startAppSettings() {
        Intent intent = new Intent(Settings.ACTION_APPLICATION_DETAILS_SETTINGS);
        intent.setData(Uri.parse("package:" + context.getPackageName()));
        context.startActivity(intent);
    }

    public void showMissingPermissionDialog(String msg,String type ) {
        String sub1 = "";
        String sub2 = "";
        AlertDialog.Builder builder = new AlertDialog.Builder(context);
//        builder.setTitle("提醒");
        if (type.equals("en")){
            sub1="Exit";
            sub2="Set";
        }else {
                sub1="退出";
                sub2="设置";
        }
        builder.setMessage(msg);//"您禁用了"+msg+"权限，需要在设置中打开"

        // 拒绝, 退出应用
        builder.setNegativeButton(sub1, new DialogInterface.OnClickListener() {//退出
            @Override public void onClick(DialogInterface dialog, int which) {
                dialog.dismiss();
            }
        });

        builder.setPositiveButton(sub2, new DialogInterface.OnClickListener() {//设置
            @Override public void onClick(DialogInterface dialog, int which) {
                startAppSettings();
            }
        });

        builder.show();
    }
}
