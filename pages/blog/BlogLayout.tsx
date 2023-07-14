import BlogTabBar from "../../component/BlogTabBar";
import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function BlogLayout({ children }: LayoutProps) {
  return (
    <div>
      <div style={{ display: "flex", fontSize: "20px" }}>
        <h1>내 블로그</h1>
        <BlogTabBar />
      </div>
      <div>{children}</div>
    </div>
  );
}
