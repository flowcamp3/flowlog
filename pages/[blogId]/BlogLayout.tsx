import BlogTabBar from "../../component/BlogTabBar";
import BlogHeader from "../../component/BlogHeader";
import UserProfile from "../../component/UserProfile";
import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function BlogLayout({ children }: LayoutProps) {
  return (
    <div className="blog">
      <div>
        <BlogHeader />
        <BlogTabBar />
      </div>
      <div>
        <div className={"blog_content"}>
          <UserProfile />
          {children}
        </div>
      </div>

      <style jsx>{`
        .blog {
          display: flex;
          flex-direction: column;
          place-items: center;
        }
        .blog_content {
          display: flex;
          width: 100vw;
          @media (min-width: 1080px) {
            width: 1080px;
          }
        }
      `}</style>
    </div>
  );
}
