export default function BlogHeader() {
  return (
    <div>
      <div className={"container"}></div>
      <style jsx>{`
        .container {
          width: 100vw;
          @media (min-width: 1080px) {
            width: 1080px;
          }
          height: 200px;
        }
      `}</style>
    </div>
  );
}
