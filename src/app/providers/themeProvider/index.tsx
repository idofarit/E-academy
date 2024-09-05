import { ConfigProvider } from "antd";
import React from "react";

function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#000",
        },
        components: {
          Button: {
            controlHeight: 45,
            borderRadius: 5,
            controlOutline: "none",
            defaultBorderColor: "#ffff",
          },
          Input: {
            borderRadius: 5,
            controlHeight: 45,
            controlOutline: "none",
          },
          Select: {
            borderRadius: 5,
            controlHeight: 45,
            controlOutline: "none",
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
export default ThemeProvider;
