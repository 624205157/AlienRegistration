package com.zhhl.common;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.TypeAdapter;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonToken;
import com.google.gson.stream.JsonWriter;

import java.io.IOException;

/**
 * Created by zane on 2017/9/23.
 */

public class GsonHelper {

    private static final TypeAdapter<String> STRING = new TypeAdapter<String>() {
        public String read(JsonReader reader) throws IOException {
            if (reader.peek() == JsonToken.NULL) {
                reader.nextNull();
                return "";
            }
            return reader.nextString();
        }

        public void write(JsonWriter writer, String value) throws IOException {
            if (value == null) {
                // 在这里处理null改为空字符串
                writer.value("");
                return;
            }
            writer.value(value);
        }
    };

    private static GsonBuilder gsonBuilder = new GsonBuilder().registerTypeAdapter(String.class, STRING);

    public static Gson gson = gsonBuilder.create();
}
