import React, { useState } from "react";
import { WebView } from "react-native-webview";
import { Loader } from "../components";

export default function Profile() {
  const [isLoading, setLoading] = useState(true);

  return (
    <>
      <WebView
        style={{ flex: 1 }}
        onLoad={() => setLoading(false)}
        source={{ uri: "https://github.com/lucasvnborges" }}
      />

      {isLoading && <Loader />}
    </>
  );
}
