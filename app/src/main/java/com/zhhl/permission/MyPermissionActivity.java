package com.zhhl.permission;

import android.app.Activity;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.provider.Settings;
import android.support.annotation.RequiresApi;
import android.widget.Toast;

import com.kernal.passport.sdk.utils.CheckPermission;
import com.kernal.passportreader.sdk.R;
import com.zhhl.common.SPHelper;
import com.zhhl.ui.MCamera;

/**
 * Created by LaiYingtang on 2016/5/18. 用户权限获取页面，权限处理
 */
public class MyPermissionActivity extends Activity {
	// 首先声明权限授权
	public static final int PERMISSION_GRANTED = 0;// 标识权限授权
	public static final int PERMISSION_DENIEG = 1;// 权限不足，权限被拒绝的时候
	private static final int PERMISSION_REQUEST_CODE = 0;// 系统授权管理页面时的结果参数
	private static final String EXTRA_PERMISSION = "com.zhhl.permissiondemo";// 权限参数
	private static final String PACKAGE_URL_SCHEME = "package:";// 权限方案
	private MyCheckPermission checkPermission;// 检测权限类的权限检测器
	private boolean isrequestCheck;// 判断是否需要系统权限检测。防止和系统提示框重叠

	private static Class activityclz;
	// 启动当前权限页面的公开接口
	public static void startActivityForResult(Activity activity, Class activityClas, int requestCode, String... permission) {
		Intent intent = new Intent(activity, MyPermissionActivity.class);
		intent.putExtra(EXTRA_PERMISSION, permission);
		//ActivityCompat.startActivityForResult(activity, intent, requestCode,
		//		null);
		activityclz = activityClas;
		if (Build.VERSION.SDK_INT >= 16) {
			activity.startActivityForResult(intent, requestCode, null);
		} else{
			activity.startActivityForResult(intent, requestCode);
		}
	}

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.permission_layout);
		if (getIntent() == null || !getIntent().hasExtra(EXTRA_PERMISSION))// 如果参数不等于配置的权限参数时
		{
			throw new RuntimeException(
					"当前Activity需要使用静态的StartActivityForResult方法启动");// 异常提示
		}
		checkPermission = new MyCheckPermission(this);
		isrequestCheck = true;// 改变检测状态
	}

	// 检测完之后请求用户授权
	@RequiresApi(api = Build.VERSION_CODES.M)
	@Override
	protected void onResume() {
		super.onResume();
		if (isrequestCheck) {
			String[] permission = getPermissions();
			if (checkPermission.permissionSet(permission)) {
				requestPermissions(permission); // 去请求权限
			} else {
				allPermissionGranted();// 获取全部权限
			}
		} else {
			isrequestCheck = true;
		}
	}

	// 获取全部权限
	private void allPermissionGranted() {
		// 权限是否已经 授权 GRANTED---授权  DINIED---拒绝
		setResult(PERMISSION_GRANTED);
		Intent intent = new Intent(this, activityclz);
		startActivity(intent);
		finish();
	}

	// 请求权限去兼容版本
	@RequiresApi(api = Build.VERSION_CODES.M)
	private void requestPermissions(String... permission) {
		MyPermissionActivity.this.requestPermissions(permission,
				PERMISSION_REQUEST_CODE);
	}

	// 返回传递过来的权限参数
	private String[] getPermissions() {
		return getIntent().getStringArrayExtra(EXTRA_PERMISSION);
	}

	/**
	 * 用于权限管理 如果全部授权的话，则直接通过进入 如果权限拒绝，缺失权限时，则使用dialog提示
	 *
	 * @param requestCode
	 *            请求代码
	 * @param permissions
	 *            权限参数
	 * @param grantResults
	 *            结果
	 */
	@Override
	public void onRequestPermissionsResult(int requestCode,
										   String[] permissions, int[] grantResults) {
		super.onRequestPermissionsResult(requestCode, permissions, grantResults);
		if (PERMISSION_REQUEST_CODE == requestCode
				&& hasAllPermissionGranted(grantResults)) // 判断请求码与请求结果是否一致
		{
			isrequestCheck = true;// 需要检测权限，直接进入，否则提示对话框进行设置
			allPermissionGranted(); // 进入
		} else { // 提示对话框设置
			isrequestCheck = false;
			// showMissingPermissionDialog();//dialog
//			Toast.makeText(this, "您禁止了此权限！请选择允许", Toast.LENGTH_SHORT).show();
			String languagetype = SPHelper.get(MyPermissionActivity.this, "languagetype", "");
			String msg = "";
			if (languagetype != null && !"".equals(languagetype) && "en".equals(languagetype)) {
				msg = "You forbid recording permission! Please choose to allow";
			} else {
				msg = "您禁止了录音权限！请选择允许";

			}
			RefusedRemindDialog refusedRemindDialog = new RefusedRemindDialog(MyPermissionActivity.this);
			refusedRemindDialog.showMissingPermissionDialog(msg, languagetype);
			finish();
		}

	}

	// 显示对话框提示用户缺少权限
	// private void showMissingPermissionDialog() {
	// AlertDialog.Builder builder = new
	// AlertDialog.Builder(MyPermissionActivity.this);
	// builder.setTitle(R.string.help);//提示帮助
	// builder.setMessage(R.string.string_help_text);
	//
	// //如果是拒绝授权，则退出应用
	// //退出
	// builder.setNegativeButton(R.string.quit, new
	// DialogInterface.OnClickListener() {
	// @Override
	// public void onClick(DialogInterface dialog, int which) {
	// setResult(PERMISSION_DENIEG);//权限不足
	// finish();
	// }
	// });
	// //打开设置，让用户选择打开权限
	// builder.setPositiveButton(R.string.settings, new
	// DialogInterface.OnClickListener() {
	// @Override
	// public void onClick(DialogInterface dialog, int which) {
	// startAppSettings();//打开设置
	// }
	// });
	// builder.setCancelable(false);
	// builder.show();
	// }

	// 获取全部权限
	private boolean hasAllPermissionGranted(int[] grantResults) {
		for (int grantResult : grantResults) {
			if (grantResult == PackageManager.PERMISSION_DENIED) {
				return false;
			}
		}
		return true;
	}

	// 打开系统应用设置(ACTION_APPLICATION_DETAILS_SETTINGS:系统设置权限)
	private void startAppSettings() {
		Intent intent = new Intent(Settings.ACTION_APPLICATION_DETAILS_SETTINGS);
		intent.setData(Uri.parse(PACKAGE_URL_SCHEME + getPackageName()));
		startActivity(intent);
	}

}
