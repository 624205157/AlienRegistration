package com.zhhl.model;

/**
 * Created by 76611 on 2018/5/3.
 */

public class UpdateInfo {
    /**
     * attributes : null
     * obj : {"toUpdate":"版本更新:\\n1.修复已知问题;\\n2.提升用户体验","by1":"正整数","download":"http://crj.gafw.jl.gov.cn/jeecg/app/","by2":"","version":"3.0.0"}
     * success : true
     * jsonStr : {"obj":{"toUpdate":"版本更新:\\n1.修复已知问题;\\n2.提升用户体验","by1":"正整数","download":"http://crj.gafw.jl.gov.cn/jeecg/app/","by2":"","version":"3.0.0"},"msg":"操作成功","success":true}
     * msg : 操作成功
     */

    private Object attributes;
    private ObjBean obj;
    private boolean success;
    private String jsonStr;
    private String msg;

    public Object getAttributes() {
        return attributes;
    }

    public void setAttributes(Object attributes) {
        this.attributes = attributes;
    }

    public ObjBean getObj() {
        return obj;
    }

    public void setObj(ObjBean obj) {
        this.obj = obj;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getJsonStr() {
        return jsonStr;
    }

    public void setJsonStr(String jsonStr) {
        this.jsonStr = jsonStr;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public static class ObjBean {
        /**
         * toUpdate : 版本更新:\n1.修复已知问题;\n2.提升用户体验
         * by1 : 正整数
         * download : http://crj.gafw.jl.gov.cn/jeecg/app/
         * by2 :
         * version : 3.0.0
         */

        private String toUpdate;
        private String by1;
        private String download;
        private String by2;
        private String version;

        public String getToUpdate() {
            return toUpdate;
        }

        public void setToUpdate(String toUpdate) {
            this.toUpdate = toUpdate;
        }

        public String getBy1() {
            return by1;
        }

        public void setBy1(String by1) {
            this.by1 = by1;
        }

        public String getDownload() {
            return download;
        }

        public void setDownload(String download) {
            this.download = download;
        }

        public String getBy2() {
            return by2;
        }

        public void setBy2(String by2) {
            this.by2 = by2;
        }

        public String getVersion() {
            return version;
        }

        public void setVersion(String version) {
            this.version = version;
        }
    }
}
