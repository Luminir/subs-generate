import DemoSection from "./components/DemoSection";
import MainBody from "./components/MainBody";
import UploadButton from "./components/UploadButton";

export default function Home() {
  return (
      <>
      <MainBody h1Text={'Add captions to your videos, reels, YT-short, etc.'} h2Text={'Upload yours & watch the magic unfolds'}/>
      <UploadButton/>
      <DemoSection/>
      </>
  );
}
