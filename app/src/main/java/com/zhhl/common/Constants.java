package com.zhhl.common;

import android.os.Environment;

/**
 * Created by zane on 2017/9/22.
 */

public class Constants {
    public static final String SELECTED_LANGUAGE = "Locale.Helper.Selected.Language";
    public static final String USER_INFO = "UserInfo";
    public static final String USERFZ_INFO = "UserFzInfo";
    public static final String USERLD_INFO = "UserLdInfo";
    public static final String USERVISA_INFO = "UserVisaInfo";
    //预览视频的路径
    public static final String VIDEOPATH = "videopath";
    //预览视频的路径
    public static final String FZFWID = "fzfwid";
    //预览视频的路径
    public static final String LDFWID = "ldfwid";
    //房主预览视频的路径
    public static final String VIDEOFZPATH = "videofzpath";
    //旅店预览视频的路径
    public static final String VIDEOLDPATH = "videofzldpath";
    //房主预览视频的路径
    public static final String VIDEOVISAPATH = "videoVisapath";

    /**
     * 根目录
     */
    public static final String PARENTPATH = Environment.getExternalStorageDirectory() + "/zhhl/";

    /**
     * 视频简历目录
     */
    public static final String VIDEO_ROOT = PARENTPATH + "video/";

    /**
     * 房主视频简历目录
     */
    public static final String VIDEOFZ_ROOT = PARENTPATH + "videofz/";

    /**
     * 旅店视频简历目录
     */
    public static final String VIDEOLD_ROOT = PARENTPATH + "videold/";

    /**
     * 旅店视频简历目录
     */
    public static final String VIDEOVISA_ROOT = PARENTPATH + "videovisa/";
}
