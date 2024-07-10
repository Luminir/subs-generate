import React, { useEffect, useRef, useState } from 'react'
import SparkleIcon from '../icons/SparkleIcon'
import {FFmpeg} from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from '@ffmpeg/util';
import { transcriptionItemsToSrt } from '../libs/AwsTranscribHelper';
import robotoBold from '@/app/fonts/Roboto-Bold.ttf';
import roboto from '@/app/fonts/Roboto-Regular.ttf';

const ResultedVid = ({ filename, transcriptionItems }: any | any[]) => {
  const videoUrl = "https://trannamson-caption-generator.s3.amazonaws.com/" +filename;
  const [loaded, setLoaded] = useState(false);
  const [primaryColour, setPrimaryColour] = useState('#FFFFFF');
  const [outlineColor, setOutlineColor] = useState('#000000');
  const [progress, setProgress] = useState(1);
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
    await ffmpeg.writeFile('/tmp/roboto.ttf', await fetchFile(roboto));
    await ffmpeg.writeFile('/tmp/roboto-bold.ttf', await fetchFile(robotoBold));
    setLoaded(true);
  }

  function rgbToColour(rgb: String){
    const bgr = rgb.slice(5, 7) + rgb.slice(3, 5) + rgb.slice(1, 3);
    // console.log({rgb, bgr});
    return '&H' + bgr + '&';
  }

  const transcode = async () => {
    const ffmpeg = ffmpegRef.current;
    const srt = transcriptionItemsToSrt(transcriptionItems);
    await ffmpeg.writeFile(filename, await fetchFile(videoUrl));
    await ffmpeg.writeFile('subs.srt', srt);
    await new Promise((resolve, reject) => {
      videoRef.current.onloadedmetadata = resolve;
    });
    const ffmpeg = ffmpegRef.current;
    const duration = videoRef.current.duration;
    console.log(duration);
    // console.log(transcriptionItemsToSrt(transcriptionItems));
    ffmpeg.on('log', ({ message }) => {
      // messageRef.current.innerHTML = message;
      const regexResult = /time=([0-9:.]+)/.exec(message);
      // console.log(regexResult);
      // console.log(message);
      if(regexResult && regexResult?.[1]){
        const howMuchIsDone = regexResult?.[1];
        // console.log({howMuchIsDone});
        const [Hours, Minutes, seconds] = howMuchIsDone.split(':');
        const doneHours = Number(Hours);
        const doneMinutes = Number(Minutes);
        const doneSeconds = Number(seconds);
        // console.log({doneHours, doneMinutes, doneSeconds});
        const doneTotalSeconds = doneHours * 3600 + doneMinutes * 60 + doneSeconds;
        const videoProgress = doneTotalSeconds / duration;
        setProgress(videoProgress);
      }
    });
    await ffmpeg.exec([
      '-i', filename, 
      '-preset', 'ultrafast',
      '-to', '00:00:05', 
      '-vf', `subtitles=sub.srt:fontsdir=/tmp:force_style='Fontname=Roboto Bold,
      PrimaryColour=${rgbToColour(primaryColour)}, OutlineColour=${rgbToColour(outlineColor)},
      FontSize=30, MarginV=100'`, 
      'output.mp4'
    ]);
    const data = await ffmpeg.readFile('output.mp4');
    videoRef.current.src =
        URL.createObjectURL(new Blob([data.buffer], {type: 'video/mp4'}));
        setProgress(1);
}

  return (
    <>
      <div className=' relative my-3'>
        <div>
          <h2 className=' font-semibold text-black flex mr-2'>Primary Color: </h2>
          <input type="color" name="" id="" value={primaryColour} onChange={(ev) => { setPrimaryColour(ev.target.value)}}/>
          <br />
          <h2 className=' font-semibold text-black flex mr-2'>Outline Color: </h2>
          <input type="color" name="" id="" value={outlineColor} onChange={(ev) => { setOutlineColor(ev.target.value)}}/>
        </div>
          <button className='bg-blue-300 px-4 py-2 rounded-full border-2 border-blue-950 border-solid inline-flex hover:cursor-pointer'
            onClick={transcode}>
              <SparkleIcon/>
               <span>Generate captions</span>
          </button>
        </div>
        <div className=' rounded-xl overflow-hidden relative'>
          {progress && progress < 1 && (
            <div className=' absolute inset-0 bg-black/80 text-white flex items-center'>
              <div className=' w-full text-center'>
                <h3 className=' text-white text-3xl w-full text-center'>
                    {parseInt(progress * 100)}%
                </h3>
                <div className=' bg-purple-500/50 mx-4 rounded-lg overflow-hidden'>
                  <div className=' bg-green-500' style={{width: progress * 100 +'%'}}/>
                </div>
              </div>
            </div>
          )}
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