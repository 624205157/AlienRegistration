package com.zhhl.ui;

import android.app.Activity;
import android.content.Intent;
import android.graphics.PixelFormat;
import android.graphics.drawable.Drawable;
import android.hardware.Camera;
import android.hardware.Camera.Size;
import android.media.MediaPlayer;
import android.media.MediaRecorder;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.util.DisplayMetrics;
import android.util.Log;
import android.view.SurfaceHolder;
import android.view.SurfaceView;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.widget.ImageView;
import android.widget.ProgressBar;
import android.widget.RelativeLayout;
import android.widget.TextView;
import android.widget.Toast;

import com.zhhl.R;
import com.zhhl.common.Constants;
import com.zhhl.common.FileHelper;
import com.zhhl.common.GsonHelper;
import com.zhhl.common.SPHelper;
import com.zhhl.model.User;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Timer;
import java.util.TimerTask;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.MediaType;
import okhttp3.MultipartBody;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

public class MCameraFZ extends Activity implements SurfaceHolder.Callback {
    private ImageView mVideoStartBtn;
    private SurfaceView mSurfaceview;
    private MediaRecorder mMediaRecorder;
    private SurfaceHolder mSurfaceHolder;
    private File mRecVedioPath;
    private File mRecAudioFile;
    //    private TextView timer;
    private TextView num;
    private int hour = 0;
    private int minute = 0;
    private int second = 0;
    private boolean bool;
    protected Camera camera;
    private Drawable iconStart;
    private Drawable iconStop;
    private boolean isRecording = true; //true表示没有录像，点击开始；false表示正在录像，点击暂停
    //	private SurfaceHolder holder;
    private int cameraPosition = 1;        //1代表前置摄像头，0代表后置摄像头
    private Timer timerNew;
    private TimerTask taskNew;
    private Handler handlerNew;
    private int mWidth = 0, mHeight = 0;
    private boolean bIfPreview = true;
    private Boolean ParameterFlag; // 设置分辨率标示

    private TextView tv_preview;
    private MediaPlayer mediaPlayer1;
    private String playpath;
    long starttime;
    long endtime;
    public static final int HANDLER_LEFT = 0;
    /**
     * 进度条
     */
    private ProgressBar mColor = null;
    private TextView tv_remind;
    /**
     * 当前进度的值
     */
    private int mCount = 0;

    /**
     * Handler消息处理
     */
    private Handler mHandler = new Handler() {
        @Override
        public void handleMessage(Message msg) {
            if (msg.what == HANDLER_LEFT) {
                // TODO: 2017/10/4
            }
            super.handleMessage(msg);
        }
    };
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        this.requestWindowFeature(Window.FEATURE_NO_TITLE);/** 全屏显示 **/
        this.getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN, WindowManager.LayoutParams.FLAG_FULLSCREEN);
        getWindow().setFormat(PixelFormat.TRANSLUCENT);//设置半透明模式
        setContentView(R.layout.map_video);
        InitViews();
        tv_remind.setText("请在5秒内念出下面数字完成录制");

    }

    private void InitViews() {
//        timer = (TextView) findViewById(R.id.arc_hf_video_timer);
        mVideoStartBtn = (ImageView) findViewById(R.id.btn_video_start);
        mSurfaceview = (SurfaceView) this.findViewById(R.id.arc_hf_video_view);
        num = (TextView) findViewById(R.id.num);
        tv_remind = findViewById(R.id.tv_remind);
        int random = (int) (Math.random() * 10000);
        num.setText(String.valueOf(random));
        mSurfaceHolder = mSurfaceview.getHolder();//取得holder
        mSurfaceHolder.addCallback(this);
        mSurfaceHolder.setFixedSize(mWidth, mHeight);
        // 设置计时器不可见
//        timer.setVisibility(View.GONE);

        // 设置缓存路径
        mRecVedioPath = new File(Constants.PARENTPATH + "recodevideo");
        if (!mRecVedioPath.exists()) {
            mRecVedioPath.mkdirs();
        }

        //拍视频btn控制
        mVideoStartBtn.setOnClickListener(v -> recordVideo());

        handlerNew = new Handler() {
            public void handleMessage(Message msg) {
                switch (msg.what) {
                    case 1:
//                        if (second == 5) {
////						mVideoStartBtn.setBackgroundResource(R.drawable.arc_hf_btn_video_start);
//                            EndVideoRecord();
//                            showMsg("超出时间");
//                        }
//                        showMsg("超出时间");
                        EndVideoRecord();
                        Intent intent = new Intent(MCameraFZ.this, CheckSubmitActivity.class);
                        intent.putExtra("type", "fz");
                        startActivity(intent);
                        finish();
//                        Intent intent = new Intent(MCamera.this,PreviewActivity.class);
//                        intent.putExtra("path",playpath);
//                        startActivity(intent);
                        break;
                }
                super.handleMessage(msg);
            }
        };
    }

    private void recordVideo() {
        if (isRecording) {
            StartVideoRecord();

        } else {
            EndVideoRecord();
        }
    }

    /*
     * 点击停止
     *显示镜头切换按钮
     */
    private void EndVideoRecord() {

        try {
            mVideoStartBtn.setBackgroundResource(R.mipmap.arc_hf_btn_video_start);
            bool = false;
            if (mMediaRecorder != null) {
                //设置后不会崩
                mMediaRecorder.setOnErrorListener(null);
                mMediaRecorder.setPreviewDisplay(null);
            }
//			camera.stopPreview();
            mMediaRecorder.stop();
            mMediaRecorder.reset();
            minute = 0;
            second = 0;
//            timer.setText(format(minute) + ":" + format(second));
            mMediaRecorder.release();
            mMediaRecorder = null;

            videoRename();
            isRecording = !isRecording;

// 			mVideoStartBtn.setBackgroundDrawable(iconStart);
            showMsg(getResources().getString(R.string.video_recording_success));
            camera.reconnect();
// 			if (camera != null) {
//            	camera.lock();
//				camera.release();
//				camera = null;
// 	        }

//			if (cameraPosition == 1) {
//				camera = Camera.open(Camera.CameraInfo.CAMERA_FACING_FRONT);
//			} else {
//				camera = Camera.open(Camera.CameraInfo.CAMERA_FACING_BACK);
//			}
            Camera.Parameters parameters = camera.getParameters();
//            parameters.setPreviewSize(mWidth, mHeight);
            camera.setParameters(parameters);
            camera.setPreviewDisplay(mSurfaceHolder);
            camera.startPreview();
         //   upload();


        } catch (IllegalStateException e) {
            Log.w("yj", "stopRecord", e);
        } catch (RuntimeException e) {
            Log.w("yj", "stopRecord", e);
        } catch (Exception e) {
            Log.w("yj", "stopRecord", e);
        }
    }

    /*
     * 录制视频
     * 点击开始录像/取消镜头切换按钮的显示
     */
    private void StartVideoRecord() {
        try {
            FileHelper.delAllFile(Constants.VIDEO_ROOT);
            mVideoStartBtn.setVisibility(View.GONE);
            if (camera != null) {
                camera.release();
                camera = null;
            }

            if (cameraPosition == 1) {
                camera = Camera.open(Camera.CameraInfo.CAMERA_FACING_FRONT);
            } else {
                camera = Camera.open(Camera.CameraInfo.CAMERA_FACING_BACK);
            }

            Camera.Parameters parameters = camera.getParameters();
            camera.setDisplayOrientation(90);
            camera.setParameters(parameters);
//			if(cameraPosition == 0){
//				parameters.setFocusMode(Camera.Parameters.FOCUS_MODE_CONTINUOUS_VIDEO);//1连续对焦
//			}
            second = 0;
            minute = 0;
            hour = 0;
            bool = true;
            camera.unlock();

            if (mMediaRecorder == null)
                mMediaRecorder = new MediaRecorder();
            else
                mMediaRecorder.reset();
            mMediaRecorder.setCamera(camera);
            mMediaRecorder.setPreviewDisplay(mSurfaceHolder.getSurface());//null pointer
            mMediaRecorder.setVideoSource(MediaRecorder.VideoSource.CAMERA);
            mMediaRecorder.setAudioSource(MediaRecorder.AudioSource.MIC);
            mMediaRecorder.setOutputFormat(MediaRecorder.OutputFormat.MPEG_4);
            mMediaRecorder.setVideoEncoder(MediaRecorder.VideoEncoder.H264);
            mMediaRecorder.setAudioEncoder(MediaRecorder.AudioEncoder.AMR_NB);
            mMediaRecorder.setVideoSize(mWidth, mHeight);
            mMediaRecorder.setVideoFrameRate(30);
            mMediaRecorder.setVideoEncodingBitRate(2 * 1024 * 1024);
            mMediaRecorder.setMaxDuration(5000);
            if (cameraPosition == 0) {
                mMediaRecorder.setOrientationHint(90);
            } else {
                mMediaRecorder.setOrientationHint(270);
            }
            // 设置最大持续时间
//			mMediaRecorder.setMaxDuration(30000);
            taskNew = new TimerTask() {
                public void run() {
                    Message message = new Message();
                    message.what = 1;
                    handlerNew.sendMessage(message);
                }
            };
            timerNew = new Timer(true);
            timerNew.schedule(taskNew, 7000);//延时1000ms后执行，1000ms执行一次
            starttime = System.currentTimeMillis();
            mRecAudioFile = File.createTempFile("Vedio", ".mp4", mRecVedioPath);
            System.out.println("存储路径"+mRecAudioFile.getAbsolutePath());
            mMediaRecorder.setOutputFile(mRecAudioFile.getAbsolutePath());
            mMediaRecorder.prepare();
//            timer.setVisibility(View.VISIBLE);
            //  handler.postDelayed(task, 1000);
            mMediaRecorder.start();
            showIndeterDialog();
            showMsg(getResources().getString(R.string.start_recording));


//			mVideoStartBtn.setBackgroundDrawable(iconStop);
            isRecording = !isRecording;
        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
        }
    }

    private void upload() {
        Log.i("file++++++++++++", "dsdsdsdsdsdsd");
        File file = new File(Constants.VIDEOFZ_ROOT);
        File[] files = file.listFiles();
        if (files == null || files.length == 0)
            return;

        File video = new File(files[0].getPath());
        Log.i("file++++++++++++", video.getPath());
        User user = GsonHelper.gson.fromJson(SPHelper.get(this, Constants.USER_INFO, ""), User.class);
        MultipartBody.Builder builder =  new MultipartBody.Builder().setType(MultipartBody.FORM);
        builder.addFormDataPart("zjhm", user.getZjhm()+ "_sp");
        builder.addFormDataPart("file", video.getName(), RequestBody.create(MediaType.parse("video/mp4"), video));
        String url = "http://crj.gafw.jl.gov.cn/jeecg/fileUploadController.do?uploadnewApp";
        RequestBody body = builder.build();
        Request request = new Request.Builder().url(url).post(body).build();
        OkHttpClient client = new OkHttpClient();
        client.newCall(request).enqueue(new Callback() {
            @Override
            public void onFailure(Call call, IOException e) {

                Log.i("http+++++++", "请求失败");
            }

            @Override
            public void onResponse(Call call, Response response) throws IOException {
                Log.i("http+++++++", "请求成功");
//                Intent intent = new Intent(MCamera.this, FirstActivity.class);
//                startActivity(intent);
            }
        });
    }

    /*
     * 消息提示
     */
    private Toast toast;

    public void showMsg(String arg) {
        if (toast == null) {
            toast = Toast.makeText(this, arg, Toast.LENGTH_SHORT);
        } else {
            toast.cancel();
            toast.setText(arg);
        }
        toast.show();
    }

    /*
     * 生成video文件名字
     */
    protected void videoRename() {
        String path = Constants.VIDEOFZ_ROOT;
        String fileName = new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) + ".mp4";
        File out = new File(path);
        if (!out.exists()) {
            out.mkdirs();
        }
        System.out.println("存储的路径："+path+"文件名："+fileName);
        playpath = path+"/"+fileName;
        SPHelper.put(MCameraFZ.this, Constants.VIDEOFZPATH, playpath.toString());
        out = new File(path, fileName);
        if (mRecAudioFile.exists())
            mRecAudioFile.renameTo(out);
    }

    /*
     * 定时器设置，实现计时
     */
    private Handler handler = new Handler();
    private Runnable task = new Runnable() {
        public void run() {
            if (bool) {
                handler.postDelayed(this, 1000);
                second++;
                if (second >= 60) {
                    minute++;
                    second = second % 60;
                }
                if (minute >= 60) {
                    hour++;
                    minute = minute % 60;
                }
                if (second == 6) {
//					mVideoStartBtn.setBackgroundResource(R.drawable.arc_hf_btn_video_start);
                    EndVideoRecord();
                    showMsg("");
//                    Log.w("yj", "视频录制最长时间是30秒!!");
                }
                System.out.println(second);
//                timer.setText(format(minute) + ":" + format(second));
            }
        }
    };

    /*
     * 格式化时间
     */
    public String format(int i) {
        String s = i + "";
        if (s.length() == 1) {
            s = "0" + s;
        }
        return s;
    }

    /*
     * 覆写返回键监听
     */
    @Override
    public void onBackPressed() {
        if (mMediaRecorder != null) {
            //设置后不会崩
            mMediaRecorder.setOnErrorListener(null);
            mMediaRecorder.setPreviewDisplay(null);
            try {
                mMediaRecorder.stop();
                mMediaRecorder.release();
                mMediaRecorder = null;
                videoRename();
            } catch (IllegalStateException e) {
                Log.w("yj", "stopRecord", e);
            } catch (RuntimeException e) {
                Log.w("yj", "stopRecord", e);
            } catch (Exception e) {
                Log.w("yj", "stopRecord", e);
            }
        }

        if (camera != null) {
            try {
                camera.lock();
            } catch (RuntimeException e) {
                Log.e("yj", "stopRecord", e);
            }
        }
        finish();
    }


    @Override
    protected void onPause() {
        super.onPause();
        onBackPressed();
    }

    @Override
    public void surfaceCreated(SurfaceHolder arg0) {
        try {
            // 取得屏幕 分辨率
            DisplayMetrics dm = new DisplayMetrics();
            getWindowManager().getDefaultDisplay().getMetrics(dm);
            int widthPixels = dm.widthPixels;
            int heightPixels = dm.heightPixels;
            if (widthPixels == 1080) {
                heightPixels = 1920;
            }

            camera = Camera.open(Camera.CameraInfo.CAMERA_FACING_FRONT);
            List<Size> previewSizes = camera.getParameters()
                    .getSupportedPreviewSizes();
            ParameterFlag = true;
            Size vsize = null;

            mWidth = 0;
            mHeight = 0;
            // 720p 优先级最高
            for (int i = 0; i < previewSizes.size(); i++) {
                vsize = previewSizes.get(i);
                if (720 == vsize.height && 1280 == vsize.width) {
                    mWidth = vsize.width;
                    mHeight = vsize.height;
                    ParameterFlag = false;
                }
            }
            // 1080p 优先级第二
            if (ParameterFlag) {
                for (int i = 0; i < previewSizes.size(); i++) {
                    vsize = previewSizes.get(i);
                    if (1080 == vsize.height && 1920 == vsize.width) {
                        mWidth = vsize.width;
                        mHeight = vsize.height;
                        ParameterFlag = false;
                    }
                }
            }
            if (ParameterFlag) {
                for (int i = 0; i < previewSizes.size(); i++) {
                    vsize = previewSizes.get(i);
                    if (vsize.width > mWidth) {
                        mWidth = vsize.width;
                        mHeight = vsize.height;
                    }
                }
            }
            Camera.Parameters parameters = camera.getParameters();
            parameters.setPreviewSize(mWidth, mHeight);
            camera.setParameters(parameters); // 将Camera.Parameters设定予Camera
            camera.setPreviewDisplay(mSurfaceHolder);
        } catch (Exception e) {
            Toast.makeText(this, getResources().getString(R.string.system_disable_the_camera), Toast.LENGTH_LONG).show();
            e.printStackTrace();
        }
    }

    @Override
    public void surfaceChanged(SurfaceHolder holder, int format, int width, int height) {
        initCamera();
    }

    /**
     * 停止预览
     */
    @Override
    public void surfaceDestroyed(SurfaceHolder holder) {
        // TODO Auto-generated method stub
        if (camera != null) {
            camera.release();
            camera = null; // 记得释放
        }
        mSurfaceview = null;
        mSurfaceHolder = null;
        mMediaRecorder = null;
    }

    Camera.PictureCallback mPictureCallback = new Camera.PictureCallback() {
        public void onPictureTaken(byte[] imageData, Camera c) {
        }
    };

    private void initCamera()// surfaceChanged中调用
    {
        if (null != camera) {
            if (bIfPreview) {
                camera.stopPreview();// stopCamera();
            }
            try {
                Camera.Parameters parameters = camera.getParameters();
                // 取得屏幕 分辨率
                DisplayMetrics dm = new DisplayMetrics();
                getWindowManager().getDefaultDisplay().getMetrics(dm);
                int widthPixels = dm.widthPixels;
                int heightPixels = dm.heightPixels;
                if (widthPixels == 1080) {
                    heightPixels = 1920;
                }
                // 【调试】获取caera支持的PictrueSize，看看能否设置？？
                List<Size> previewSizes = camera.getParameters()
                        .getSupportedPreviewSizes();
                List<Size> videoSizes = camera.getParameters()
                        .getSupportedVideoSizes();

                if (videoSizes != null) {
                    ParameterFlag = true;
                    Size psize = null;
                    // 720p 优先级最高
                    for (int i = 0; i < videoSizes.size(); i++) {
                        psize = videoSizes.get(i);
                        if (720 == psize.height && 1280 == psize.width) {
                            mWidth = psize.width;
                            mHeight = psize.height;
                            ParameterFlag = false;
                        }
                    }
                    // 1080p 优先级第二
                    if (ParameterFlag) {
                        for (int i = 0; i < videoSizes.size(); i++) {
                            psize = videoSizes.get(i);
                            if (1080 == psize.height && 1920 == psize.width) {
                                mWidth = psize.width;
                                mHeight = psize.height;
                                ParameterFlag = false;
                            }
                        }
                    }

                    // 录像不支持720p或1080p时 根据屏幕分辨率查找
                    if (ParameterFlag) {
                        for (int i = 0; i < videoSizes.size(); i++) {
                            psize = videoSizes.get(i);
                            if (widthPixels == psize.height && heightPixels == psize.width) {
                                mWidth = psize.width;
                                mHeight = psize.height;
                            }
                        }
                    }

                } else {
                    ParameterFlag = true;
                    Size vsize = null;

                    mWidth = 0;
                    mHeight = 0;
                    // 720p 优先级最高
                    for (int i = 0; i < previewSizes.size(); i++) {
                        vsize = previewSizes.get(i);
                        if (720 == vsize.height && 1280 == vsize.width) {
                            mWidth = vsize.width;
                            mHeight = vsize.height;
                            ParameterFlag = false;
                        }
                    }
                    // 1080p 优先级第二
                    if (ParameterFlag) {
                        for (int i = 0; i < previewSizes.size(); i++) {
                            vsize = previewSizes.get(i);
                            if (1080 == vsize.height && 1920 == vsize.width) {
                                mWidth = vsize.width;
                                mHeight = vsize.height;
                                ParameterFlag = false;
                            }
                        }
                    }
                    if (ParameterFlag) {
                        for (int i = 0; i < previewSizes.size(); i++) {
                            vsize = previewSizes.get(i);
                            if (vsize.width > mWidth) {
                                mWidth = vsize.width;
                                mHeight = vsize.height;
                            }
                        }
                    }

                }

                //按比例设置高度
                int layoutWidth = 0;
                int layoutHeight = 0;
                if (mHeight != widthPixels) {
                    float point = (float) mWidth / (float) mHeight;
                    layoutHeight = Math.round(widthPixels * point);
                    layoutWidth = Math.round(heightPixels * point);
                } else {
                    layoutHeight = mHeight;
                    layoutWidth = mWidth;
                }
                RelativeLayout.LayoutParams lp = new RelativeLayout.LayoutParams(
                        RelativeLayout.LayoutParams.MATCH_PARENT,
                        layoutWidth);
                mSurfaceview.setLayoutParams(lp);
//				for (int i = 0; i < previewSizes.size(); i++) {
//					psize = previewSizes.get(i);
//					Log.i("initCamera", "PreviewSize,width: " + psize.width
//							+ " height" + psize.height);
//				}


                parameters.setPreviewSize(mWidth, mHeight); // 指定preview的大小
//					parameters.setFlashMode(Parameters.FLASH_MODE_OFF);
                if (cameraPosition == 0) {
                    parameters.setFocusMode(Camera.Parameters.FOCUS_MODE_CONTINUOUS_VIDEO);//1连续对焦
                }

                // 设定配置参数并开启预览
                camera.setDisplayOrientation(90);
                camera.setParameters(parameters); // 将Camera.Parameters设定予Camera
                camera.startPreview(); // 打开预览画面
                camera.cancelAutoFocus();
                bIfPreview = true;

                // 【调试】设置后的图片大小和预览大小以及帧率
                Size csize = camera.getParameters().getPreviewSize();
                // mPreviewHeight = csize.height; //
                // mPreviewWidth = csize.width;
                csize = camera.getParameters().getPictureSize();

            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    @Override
    protected void onResume() {
        super.onResume();
    }

    @Override
    public void finish() {
        this.setResult(99);
        super.finish();
    }


    private void showIndeterDialog() {
        mCount = 0;

        mColor = (ProgressBar) findViewById(R.id.progress_horizontal_color);
        mColor.setMax(57);
        mColor.setProgress(0);
        mColor.setIndeterminate(false);
        new Thread() {
            public void run() {
                try {
                    while (mCount <= 57) {
                        mColor.setProgress(mCount++);
                        Thread.sleep(100);
                    }
                    if (mCount > 57) {
                        mHandler.sendEmptyMessage(HANDLER_LEFT);
                    }
                } catch (Exception ex) {
                }
            }
        }.start();
    }
}
