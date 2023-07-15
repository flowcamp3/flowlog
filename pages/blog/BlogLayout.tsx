import BlogTabBar from "../../component/BlogTabBar";
import UserProfile from "../../component/UserProfile";
import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function BlogLayout({ children }: LayoutProps) {
  return (
    <div>
      <div>
        <BlogTabBar />
      </div>
      <div className={"blog_content"}>
        <UserProfile />
        {children}
      </div>

      <style jsx>{`
        .blog_content {
          display: flex;
        }
      `}</style>
    </div>
  );
}
