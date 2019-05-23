package com.zhhl.common;

import android.content.Context;
import android.database.Cursor;
import android.net.Uri;
import android.provider.MediaStore;

import java.io.File;

/**
 * 
 * @author fengtianxiang 涉及到文和目录相关辅助操作
 * 
 */
public class FileHelper {

	/**
	 * 删除单个文件
	 * 
	 * @param filePath 被删除文件的文件名
	 *            （全路径）
	 * @return 文件删除成功返回true，否则返回false
	 * 
	 */
	public static boolean deleteFile(String filePath) {
		File file = new File(filePath);
		if (file.isFile() && file.exists()) {
			return file.delete();
		}
		return false;
	}
	
	/**
	 *  删除指定文件夹下所有文件
	 * @param path
	 */
	public static void deleteAPK(String path) {
		File file = new File(path);
		if (file.exists()) {
			file.delete();
		}
	}

	/**
	 * 在指定目录下创建文件
	 * 
	 * @param filePath
	 *            创建文件全路径
	 * @param fileName
	 *            文件名称
	 * @return 返回该文件
	 * 
	 */
	public static File getFilePath(String filePath, String fileName) {
		File file = null;
		makeRootDirectory(filePath);
		try {
			file = new File(filePath + fileName);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return file;
	}

	/**
	 * 判断路径是否存在不存在就创建该路径的文件夹
	 * @param filePath 创建文件全路径
	 * @return 返回该文件
	 */
	public static void makeRootDirectory(String filePath) {
		File file = null;
//		Logs.w("filePath " + filePath);
		try {
			file = new File(filePath);
			if (!file.exists()) {
//				Logs.w("filePath = " + filePath);
				// file.mkdir();//单个文件
				file.mkdirs();// 包含文件和目录
			}
		} catch (Exception e) {

		}
	}

	/**
	 * 判断该文件是否存在
	 * 
	 * @param filePath
	 *            文件全路径包含文件名
	 * 
	 * @return 是否存在该文件
	 * 
	 */
	public static boolean isFileExist(String filePath) {
		File file = null;
		file = new File(filePath);
		if (file.exists()){
			return true;
		}else{
			return false;
		}
	}

	/**
	 * 获取图片的绝对路径
	 * 
	 * @param fileUrl
	 * @return
	 */
	public static String getRealPath(Context context, Uri fileUrl) {
		String fileName = "";
		Uri filePathUri = fileUrl;
		if (fileUrl != null) {
			if (fileUrl.getScheme().toString().compareTo("content") == 0) // content://开头的uri
			{
				String[] proj = { MediaStore.Images.Media.DATA };
				Cursor cursor = context.getContentResolver().query(fileUrl, proj, null, null, null);
				if (cursor != null && cursor.moveToFirst()) {
					int column_index = cursor.getColumnIndexOrThrow(MediaStore.Images.Media.DATA);
					fileName = cursor.getString(column_index); // 取出文件路径
					cursor.close();
				}
			} else if (fileUrl.getScheme().compareTo("file") == 0) {
				fileName = filePathUri.toString();
				fileName = filePathUri.toString().replace("file://", "");
			}
		}
//		Logs.i("读取的文件路径" + fileName);
		return fileName;
	}

	/**
	 * 获取目录下所有文件大小
	 * 
	 * @param file
	 * @return
	 * @date 2015-6-23上午11:03:47
	 */
	public static double getDirSize(File file) {
		// 判断文件是否存在
		if (file.exists()) {
			// 如果是目录则递归计算其内容的总大小
			if (file.isDirectory()) {
				File[] children = file.listFiles();
				double size = 0;
				if(null!=children){
					for (File f : children)
						size += getDirSize(f);
				}
				return size;
			} else {// 如果是文件则直接返回其大小,以“兆”为单位
				double size = (double) file.length() / 1024;
				return size;
			}
		} else {
			return 0.0;
		}
	}

	// 删除指定文件夹下所有文件
	// param path 文件夹完整绝对路径
	public static boolean delAllFile(String path) {
		boolean flag = false;
		File file = new File(path);
		if (!file.exists()) {
			return flag;
		}
		if (file.isDirectory()) {// 检查表示此抽象路径名的文件是否是一个目录
			String[] tempList = file.list();
			if(null!=tempList){
				if (tempList.length == 0) {// 首次加载或被手动清空
					return !flag;
				}
				File temp = null;
				for (int i = 0; i < tempList.length; i++) {
					if (path.endsWith(File.separator)) {// 有/为文件夹
						temp = new File(path + tempList[i]);
					} else {
						temp = new File(path + File.separator + tempList[i]);
					}
					if (temp.isFile()) {
						temp.delete();
						flag = true;
					}
					if (temp.isDirectory()) {
						delAllFile(path + "/" + tempList[i]);// 先删除文件夹里面的文件
						flag = true;
					}
				}
			}
		} else {
			flag = file.delete();
		}
		return flag;
	}
}
