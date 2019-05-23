package com.zhhl.permission;
import android.content.Context;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.os.Build;
import android.support.annotation.RequiresApi;
import android.support.v4.content.PermissionChecker;

import com.zhhl.ui.ThirdActivity;

/**
 *
 * 检查权限的工具类
 */
public class MyCheckPermission {
	private final Context context;
	private int targetSdkVersion;
	//构造器
	public MyCheckPermission(Context context) {
		this.context = context.getApplicationContext();
		try {
			final PackageInfo info = context.getPackageManager().getPackageInfo(
					context.getPackageName(), 0);
			targetSdkVersion = info.applicationInfo.targetSdkVersion;
		} catch (PackageManager.NameNotFoundException e) {
			e.printStackTrace();
		}
	}
	//检查权限时，判断系统的权限集合
	@RequiresApi(api = Build.VERSION_CODES.M)
	public boolean permissionSet(String... permissions) {
		for (String permission : permissions) {
			if (!isLackPermission(permission)) {//是否添加完全部权限集合
				return true;//缺少权限
			}
		}
		return false;//全部授权
	}
	//检查系统权限是，判断当前是否缺少权限(PERMISSION_DENIED:权限是否足够)
	private boolean isLackPermission(String permission) {
		//PERMISSION_GRANTED
		//PERMISSION_DENIED
//		return context.checkSelfPermission(permission) == PackageManager.PERMISSION_DENIED;

		boolean result = true;

		if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {

			if (targetSdkVersion >= Build.VERSION_CODES.M) {
				// targetSdkVersion >= Android M, we can
				// use Context#checkSelfPermission
				result = context.checkSelfPermission(permission)
						== PackageManager.PERMISSION_GRANTED;
			} else {
				// targetSdkVersion < Android M, we have to use PermissionChecker
				result = PermissionChecker.checkSelfPermission(context, permission)
						== PermissionChecker.PERMISSION_GRANTED;
			}
		}

		return result;
	}

}
