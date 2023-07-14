import BlogTabBar from "../../component/BlogTabBar";
import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function BlogLayout({ children }: LayoutProps) {
  return (
    <div>
      <h1>내 블로그</h1>
      <BlogTabBar />
      <div>{children}</div>
    </div>
  );
}
