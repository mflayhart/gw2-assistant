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
package org.apache.cordova.pluginApi;

import org.apache.cordova.CordovaPlugin;

import android.util.Log;

public class Plugin5 extends CordovaPlugin {
    private static final String TAG = "Plugin5";
    private static final String Plugin5_URL = "file:///android_asset/www/plugins/Plugin5.html";

    /**
     * Handles onMessage call back
     * 
     * @return true to stop from propagating {@inheritDoc}
     */
    @Override
    public Object onMessage(String id, Object data) {
        if (id.equals("plugintest")) {
            this.webView.loadUrl(Plugin5_URL);
            Log.e(TAG, "plugintest -> data: " + data.toString());
        }
        return true;
    }

}
