package com.zhhl.model;

/**
 * Created by zane on 2017/9/23.
 */

public class User {

    /** id */
    private String id = "";

    /** 英文姓名" */
    private String ywxm = "";

    /** 英文名 */
    private String ywm = "";

    /** 英文姓 */
    private String ywx = "";

    /** 中文姓名 */
    private String zwxm = "";

    /** 性别 */
    private String xb = "";

    /** 联系电话 */
    private String lxdh = "";

    /** 国家地区 */
    private String gjdq = "";

    /** 证件类型 */
    private String zjlx = "护照";

    /** 证件号码 */
    private String zjhm = "";

    /** 证件到期 */
    private String zjdq = "";

    /** 停留事由 */
    private String tlsy = "";

    /** 国内联系人 */
    private String gnlxr = "";

    /** 国内联系人电话 */
    private String gnlxdh = "";

    /** 拟离开时间 */
    private String nlksj = "";

    /** 所属派出所 */
    private String sspcs = "";

    /** 详细地址 */
    private String xxdz = "";


    /** 房屋地址 */
    private String fwdz = "";

    /** 房主姓名 */
    private String fzxm = "";

    /** 房主电话 */
    private String fzdh = "";

    /** 区分房主还是个人标记 0 个人1 出租屋房主 */
    private String type = "";

    /** 原图路径 */
    private String fullImg = "";

    /** 缩略图路径 */
    private String cutImg = "";

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getYwm() {
        return ywm;
    }

    public void setYwm(String ywm) {
        this.ywm = ywm;
    }

    public String getYwx() {
        return ywx;
    }

    public void setYwx(String ywx) {
        this.ywx = ywx;
    }

    public String getZwxm() {
        return zwxm;
    }

    public void setZwxm(String zwxm) {
        this.zwxm = zwxm;
    }

    public String getXb() {
        return xb;
    }

    public void setXb(String xb) {
        this.xb = xb;
    }

    public String getLxdh() {
        return lxdh;
    }

    public void setLxdh(String lxdh) {
        this.lxdh = lxdh;
    }

    public String getGjdq() {
        return gjdq;
    }

    public void setGjdq(String gjdq) {
        this.gjdq = gjdq;
    }

    public String getZjlx() {
        return zjlx;
    }

    public void setZjlx(String zjlx) {
        this.zjlx = zjlx;
    }

    public String getZjhm() {
        return zjhm;
    }

    public void setZjhm(String zjhm) {
        this.zjhm = zjhm;
    }

    public String getZjdq() {
        return zjdq;
    }

    public void setZjdq(String zjdq) {
        this.zjdq = zjdq;
    }

    public String getTlsy() {
        return tlsy;
    }

    public void setTlsy(String tlsy) {
        this.tlsy = tlsy;
    }

    public String getGnlxr() {
        return gnlxr;
    }

    public void setGnlxr(String gnlxr) {
        this.gnlxr = gnlxr;
    }

    public String getGnlxdh() {
        return gnlxdh;
    }

    public void setGnlxdh(String gnlxdh) {
        this.gnlxdh = gnlxdh;
    }

    public String getNlksj() {
        return nlksj;
    }

    public void setNlksj(String nlksj) {
        this.nlksj = nlksj;
    }

    public String getSspcs() {
        return sspcs;
    }

    public void setSspcs(String sspcs) {
        this.sspcs = sspcs;
    }

    public String getXxdz() {
        return xxdz;
    }

    public void setXxdz(String xxdz) {
        this.xxdz = xxdz;
    }

    public String getFwdz() {
        return fwdz;
    }

    public void setFwdz(String fwdz) {
        this.fwdz = fwdz;
    }

    public String getFzxm() {
        return fzxm;
    }

    public void setFzxm(String fzxm) {
        this.fzxm = fzxm;
    }

    public String getFzdh() {
        return fzdh;
    }

    public void setFzdh(String fzdh) {
        this.fzdh = fzdh;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getFullImg() {
        return fullImg;
    }

    public void setFullImg(String fullImg) {
        this.fullImg = fullImg;
    }

    public String getCutImg() {
        return cutImg;
    }

    public void setCutImg(String cutImg) {
        this.cutImg = cutImg;
    }

    public String getYwxm() {
        return ywxm;
    }

    public void setYwxm(String ywxm) {
        this.ywxm = ywxm;
    }

    @Override
    public String toString() {
        return "{\"id\":\"" + id + "\"" +
                ", \"ywxm\":\"" + ywxm + "\"" +
                ", \"ywm\":\"" + ywm + "\"" +
                ", \"ywx\":\"" + ywx + "\"" +
                ", \"zwxm\":\"" + zwxm + "\"" +
                ", \"xb\":\"" + xb + "\"" +
                ", \"lxdh\":\"" + lxdh + "\"" +
                ", \"gjdq\":\"" + gjdq + "\"" +
                ", \"zjlx\":\"" + zjlx + "\"" +
                ", \"zjhm\":\"" + zjhm + "\"" +
                ", \"zjdq\":\"" + zjdq + "\"" +
                ", \"tlsy\":\"" + tlsy + "\"" +
                ", \"gnlxr\":\"" + gnlxr + "\"" +
                ", \"gnlxdh\":\"" + gnlxdh + "\"" +
                ", \"nlksj\":\"" + nlksj + "\"" +
                ", \"sspcs\":\"" + sspcs + "\"" +
                ", \"xxdz\":\"" + xxdz + "\"" +
                ", \"fwdz\":\"" + fwdz + "\"" +
                ", \"fzxm\":\"" + fzxm + "\"" +
                ", \"fzdh\":\"" + fzdh + "\"" +
                ", \"fullImg\":\"" + fullImg + "\"" +
                ", \"cutImg\":\"" + cutImg + "\"" +
                ", \"type\":\"" + type + "\"}";
    }
}