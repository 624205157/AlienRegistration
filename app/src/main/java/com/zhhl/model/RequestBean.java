package com.zhhl.model;

/**
 * Created by JunpLi on 2017/10/12.
 */

public class RequestBean {
    private String protocol;
    private String code;
    private String message;
    private String url;

    private String type = "";

    /** 返回错误信息 */
    private String mess = "";

    public String getProtocol() {
        return protocol;
    }

    public void setProtocol(String protocol) {
        this.protocol = protocol;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getMess() {
        return mess;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public void setMess(String mess) {
        this.mess = mess;
    }
}
