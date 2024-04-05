import React from "react";
import { WebView } from 'react-native-webview';

export default function Profile() {
  return (
    <WebView
      style={{ flex: 1 }}
      source={{ uri: "https://github.com/lucasvnborges" }}
    />
  );
}
