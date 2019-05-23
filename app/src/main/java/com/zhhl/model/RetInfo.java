package com.zhhl.model;

import com.google.gson.annotations.SerializedName;

/**
 * 返回信息bean
 * Created by zgj on 2017/10/12.
 */
public class RetInfo {

    /** id */
    private String id = "";

    /** 返回值类型 0 : 成功 1 : 失败 */
    @SerializedName("type")
    private String type = "";

    /** 返回错误信息 */
    @SerializedName("mess")
    private String mess = "";

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getMess() {
        return mess;
    }

    public void setMess(String mess) {
        this.mess = mess;
    }
}
