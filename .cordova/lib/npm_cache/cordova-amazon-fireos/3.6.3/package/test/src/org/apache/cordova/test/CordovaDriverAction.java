/*
       Licensed to the Apache Software Foundation (ASF) under one
       or more contributor license agreements.  See the NOTICE file
       distributed with this work for additional information
       regarding copyright ownership.  The ASF licenses this file
       to you under the Apache License, Version 2.0 (the
       "License"); you may not use this file except in compliance
       with the License.  You may obtain a copy of the License at

         http://www.apache.org/licenses/LICENSE-2.0

       Unless required by applicable law or agreed to in writing,
       software distributed under the License is distributed on an
       "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
       KIND, either express or implied.  See the License for the
       specific language governing permissions and limitations
       under the License.
*/

package org.apache.cordova.test;

import java.util.concurrent.ExecutorService;

import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;

import com.amazon.android.webkit.AmazonWebKitFactories;
import com.amazon.android.webkit.AmazonWebKitFactory;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;


public class CordovaDriverAction extends Activity implements CordovaInterface {
    /** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    public void startActivityForResult(CordovaPlugin command, Intent intent,
            int requestCode) {
        // TODO Auto-generated method stub
        
    }

    public void setActivityResultCallback(CordovaPlugin plugin) {
        // TODO Auto-generated method stub
        
    }

    public Activity getActivity() {
        // TODO Auto-generated method stub
        return null;
    }

    @Deprecated
    public Context getContext() {
        // TODO Auto-generated method stub
        return null;
    }

    @Deprecated
    public void cancelLoadUrl() {
        // TODO Auto-generated method stub
        
    }

    public Object onMessage(String id, Object data) {
        // TODO Auto-generated method stub
        return null;
    }

    public ExecutorService getThreadPool() {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public AmazonWebKitFactory getFactory() {
        return AmazonWebKitFactories.getDefaultFactory();
    }

}
