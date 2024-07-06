import React, { useEffect, useRef, useState } from 'react'
import SparkleIcon from '../icons/SparkleIcon'
import {FFmpeg} from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from '@ffmpeg/util';

const ResultedVid = ({ filename, transcriptionItems }: any | any[]) => {
  const videoUrl = "https://trannamson-caption-generator.s3.amazonaws.com/" +filename;
  const [loaded, setLoaded] = useState(false);
    const ffmpegRef = useRef(new FFmpeg());
    const videoRef = useRef(null);
  useEffect(() => {
    videoRef.current.src = videoUrl;
    load();
  }, []);

  const load = async () => {
    const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd'
    const ffmpeg = ffmpegRef.current;
    // toBlobURL is used to bypass CORS issue, urls with the same
    // domain can be used directly.
    await ffmpeg.load({
        coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
        wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
    });
    setLoaded(true);
  }

  const transcode = async () => {
    const ffmpeg = ffmpegRef.current;
    await ffmpeg.writeFile(filename, await fetchFile(videoUrl));
    console.log(transcriptionItems);
    ffmpeg.on('log', ({ message }) => {
      // messageRef.current.innerHTML = message;
      console.log(message);
    });
    await ffmpeg.exec(['-i', filename, 'output.mp4']);
    const data = await ffmpeg.readFile('output.mp4');
    videoRef.current.src =
        URL.createObjectURL(new Blob([data.buffer], {type: 'video/mp4'}));
}

  return (
    <>
      <div className=' relative my-3'>
          <button className='bg-blue-300 px-4 py-2 rounded-full border-2 border-blue-950 border-solid inline-flex hover:cursor-pointer'
            onClick={transcode}>
              <SparkleIcon/>
               <span>Generate captions</span>
          </button>
        </div>
        <div className=' rounded-xl overflow-hidden'>
        <video
        ref={videoRef}
        data-video={0}
        controls
        />
        </div>
    </>
  )
}

export default ResultedVid