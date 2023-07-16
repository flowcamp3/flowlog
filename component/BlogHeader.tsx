import Image from "next/image";

export default function BlogHeader() {
  return (
    <div>
      <div className={"container"}>
        <div className="img_container">
          <Image
            src="/assets/sample_header2.jpg"
            alt="sample header"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>
      <style jsx>{`
        .container {
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
      `}</style>
    </div>
  );
}
