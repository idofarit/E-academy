import { ConfigProvider } from "antd";
import React from "react";

function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#273297",
        },
        components: {
          Button: {
            controlHeight: 40,
            borderRadius: 5,
            controlOutline: "none",
            colorBorder: "none",
            defaultHoverBg: "#61C7F2",
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
