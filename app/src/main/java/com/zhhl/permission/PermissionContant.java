package com.zhhl.permission;

import android.Manifest;

import java.lang.reflect.GenericDeclaration;

/**
 * Created by JunpLi on 2017/10/8.
 */

public class PermissionContant {

    public static String[] MediaRecordPermission = new String[]{Manifest.permission.RECORD_AUDIO};

    public static String[] GdMapPermission =  new String[]{
            Manifest.permission.ACCESS_COARSE_LOCATION,
            Manifest.permission.ACCESS_FINE_LOCATION
                         };
}
