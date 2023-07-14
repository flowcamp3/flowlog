import BlogTabBar from "../../component/BlogTabBar";
import UserProfile from "../../component/UserProfile";
import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function BlogLayout({ children }: LayoutProps) {
  return (
    <div className="">
      <div>
        <UserProfile />
      </div>
      <div>
        <BlogTabBar />
      </div>
      <div>{children}</div>
    </div>
  );
}
