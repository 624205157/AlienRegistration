package com.zhhl.ui;

import android.app.Activity;
import android.os.Bundle;

import com.zhhl.R;

public class FourthActivity extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_fourth);
//
//        Intent intent = new Intent(MediaStore.ACTION_VIDEO_CAPTURE);
//        intent.putExtra(MediaStore.EXTRA_VIDEO_QUALITY,0);
//        //好使
//        intent.putExtra(MediaStore.EXTRA_SIZE_LIMIT,10485760L);
//        intent.putExtra(MediaStore.EXTRA_DURATION_LIMIT,10);
//        startActivityForResult(intent, VIDEO_CAPTURE);

    }

//    @Override
//    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
////        super.onActivityResult(requestCode, resultCode, data);
////        if (resultCode == RESULT_OK && requestCode == VIDEO_CAPTURE){
////            Uri videoUri = data.getData();
////        }
//    }



}
