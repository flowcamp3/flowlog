import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";

const BlogHeader: React.FC = () => {
  const charContainerRef = useRef<HTMLDivElement>(null);
  const [charPosition, setCharPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const container = charContainerRef.current;
      if (!container) return;

      const { top, left } = charPosition;
      let newTop = top;
      let newLeft = left;

      switch (event.key) {
        case "ArrowUp":
          newTop -= 10;
          break;
        case "ArrowDown":
          newTop += 10;
          break;
        case "ArrowLeft":
          newLeft -= 10;
          break;
        case "ArrowRight":
          newLeft += 10;
          break;
        default:
          return;
      }

      setCharPosition({ top: newTop, left: newLeft });
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [charPosition]);

  return (
    <div>
      <div className="container">
        <div className="img_container">
          <Image
            src="/assets/sample_header2.jpg"
            alt="sample header"
            layout="fill"
            objectFit="cover"
          />
          <div
            className="char_container"
            ref={charContainerRef}
            style={{
              top: `${charPosition.top}px`,
              left: `${charPosition.left}px`,
            }}
          >
            <Image
              src="/assets/walking_char.gif"
              alt="sample header"
              width={200}
              height={200}
              className="character"
            />
          </div>
        </div>
      </div>
      <style jsx>{`
        .container {
          z-index: -1;
          width: 100vw;
          @media (min-width: 1080px) {
            width: 1080px;
          }
          height: 400px;
          overflow: hidden;
          position: relative;
          display: flex;
        }
        .img_container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        .char_container {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
          transition: top 0.3s ease, left 0.3s ease; /* 추가 */
        }
        .character {
          max-width: 400%;
          max-height: 400%;
        }
      `}</style>
    </div>
  );
};

export default BlogHeader;
