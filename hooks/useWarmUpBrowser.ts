import React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { Platform } from 'react-native';

export const useWarmUpBrowser = () => {
  React.useEffect(() => {
    // Warm up and cool down are native device-only features (primarily Android).
    // Calling them on the web browser will crash the app, so we bypass it on the web.
    if (Platform.OS !== 'web') {
      void WebBrowser.warmUpAsync();
    }
    
    return () => {
      if (Platform.OS !== 'web') {
        void WebBrowser.coolDownAsync();
      }
    };
  }, []);
};
