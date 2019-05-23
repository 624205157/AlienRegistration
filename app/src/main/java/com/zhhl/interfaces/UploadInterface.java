package com.zhhl.interfaces;

import java.util.concurrent.Callable;

/**
 * Created by 76611 on 2017/10/4.
 */
public  interface UploadInterface extends Callable{
    void myCallBack(String st1 ,String str2);
}
