package com.zhhl.ui;

import android.app.Activity;
import android.media.MediaPlayer;
import android.net.Uri;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.support.annotation.Nullable;
import android.view.SurfaceHolder;
import android.view.SurfaceView;
import android.view.View;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.MediaController;
import android.widget.SeekBar;
import android.widget.TextView;
import android.widget.Toast;

import com.zhhl.R;
import com.zhhl.common.Constants;
import com.zhhl.common.SPHelper;
import com.zhhl.media.MySeekBar;
import com.zhhl.media.MyVideoView;

import org.apache.commons.lang3.StringUtils;

import java.util.Timer;
import java.util.TimerTask;

/**
 * Created by JunpLi on 2017/10/2.
 */

public class PreviewActivity extends Activity implements SurfaceHolder.Callback, SeekBar.OnSeekBarChangeListener, View.OnClickListener {
    private MediaPlayer mediaPlayer1;
    private SurfaceView sv_media;
    private MyVideoView vv_video;
    private String path;
    private Button bt_reset;
    private Button bt_submit;
    private int duration;
    private MySeekBar videoSeekBar;
    private TextView videoCurTime;
    private TextView videoTotalTime;
    private String formatTotalTime;
    private final int UPDATE_VIDEO_SEEKBAR = 1000;
    private LinearLayout ll_controlor;
    private Timer timer = new Timer();
    private TimerTask timerTask = new TimerTask() {
        @Override
        public void run() {
            videoHandler.sendEmptyMessage(UPDATE_VIDEO_SEEKBAR);
        }
    };
    private Handler videoHandler = new Handler() {
        @Override
        public void handleMessage(Message msg) {
            switch (msg.what) {
                case UPDATE_VIDEO_SEEKBAR:
                    if (vv_video.isPlaying()) {
                        videoSeekBar.setProgress(vv_video.getCurrentPosition());
                    }
                    break;
            }
        }
    };
    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_preview);
        vv_video = findViewById(R.id.vv_video);
        videoCurTime = findViewById(R.id.videoCurTime);
        videoTotalTime = findViewById(R.id.videoTotalTime);
        ll_controlor = findViewById(R.id.ll_controlor);
        ll_controlor.setOnClickListener(this);
        videoSeekBar = findViewById(R.id.videoSeekBar);
        videoSeekBar.setOnSeekBarChangeListener(this);
        //本地的视频  需要在手机SD卡根目录添加一个 fl1234.mp4 视频
        //String videoUrl1 = Environment.getExternalStorageDirectory().getPath()+"/fl1234.mp4" ;
//        String playpath= getIntent().getStringExtra("path");
        String playpath = SPHelper.get(PreviewActivity.this,Constants.VIDEOPATH,"novideo");
        if (StringUtils.isEmpty(playpath) || "novideo".equals(playpath)){
            Toast.makeText(PreviewActivity.this,"请先采集人像信息",Toast.LENGTH_SHORT).show();
        }else {
        //网络视频
        //String videoUrl2 = Utils.videoUrl ;
        Uri uri = Uri.parse( playpath );

        //vv_video = (MyVideoView)this.findViewById(R.id.vv_video );

        //设置视频控制器
        MediaController mc = new MediaController(this);
        mc.setVisibility(View.INVISIBLE);
        vv_video.setMediaController(mc);
        //播放完成回调
        vv_video.setOnCompletionListener( new MyPlayerOnCompletionListener());

        vv_video.setOnPreparedListener(new MediaPlayer.OnPreparedListener() {
            @Override
            public void onPrepared(MediaPlayer mediaPlayer) {
                duration = vv_video.getDuration();
                int[] time = getMinuteAndSecond(duration);
                videoTotalTime.setText(String.format("%02d:%02d", time[0], time[1]));
                formatTotalTime = String.format("%02d:%02d", time[0], time[1]);
                videoSeekBar.setMax(duration);

                mediaPlayer.start();
//                videoPauseBtn.setEnabled(true);
//                videoSeekBar.setEnabled(true);
//                videoPauseImg.setImageResource(R.mipmap.icon_video_pause);
                timer.schedule(timerTask, 0, 1000);
            }
        });
        //设置视频路径
        vv_video.setVideoURI(uri);
        //开始播放视频
        vv_video.start();
        }
    }

    @Override
    protected void onPause() {
        super.onPause();
        finish();
    }

    @Override
    public void surfaceCreated(SurfaceHolder surfaceHolder) {
    }

    @Override
    public void surfaceChanged(SurfaceHolder surfaceHolder, int i, int i1, int i2) {
    }

    @Override
    public void surfaceDestroyed(SurfaceHolder surfaceHolder) {
    }




    @Override
    public void onProgressChanged(SeekBar seekBar, int progress, boolean b) {
        int[] time = getMinuteAndSecond(progress);
        videoCurTime.setText(String.format("%02d:%02d", time[0], time[1]));
    }

    @Override
    public void onStartTrackingTouch(SeekBar seekBar) {

    }

    @Override
    public void onStopTrackingTouch(SeekBar seekBar) {

    }

    @Override
    public void onClick(View v) {
        switch (v.getId()){
            case R.id.ll_controlor:
                vv_video.start();
                ll_controlor.setVisibility(View.INVISIBLE);
                break;
        }
    }

    class MyPlayerOnCompletionListener implements MediaPlayer.OnCompletionListener {

        @Override
        public void onCompletion(MediaPlayer mp) {
            vv_video.seekTo(0);
            videoSeekBar.setProgress(0);
            ll_controlor.setVisibility(View.VISIBLE);
        }
    }

    private int[] getMinuteAndSecond(int mils) {
        mils /= 1000;
        int[] time = new int[2];
        time[0] = mils / 60;
        time[1] = mils % 60;
        return time;
    }

}

