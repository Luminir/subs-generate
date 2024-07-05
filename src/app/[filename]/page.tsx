'use client'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { clearTranscriptionItems } from '../libs/AwsTranscribHelper';
import TranscriptionItem from '../components/Transcription';
import SparkleIcon from '../icons/SparkleIcon';

const page = ({params}: VideoParamsProps) => {
    // console.log(JSON.stringify(params))
    const filename = params.filename;
    // const [requestSent, setRequestSent] = useState(false)
    const [isTranscribing, setIsInTranscriing] = useState(false);
    const[awsTranscriptionItem, setAwsTranscriptionItems] = useState([]);
    const [isFetchingInfo, setIsFetchingInfo] = useState(false);

    useEffect(() => {
      getTranscription()
    }, [filename])

    function getTranscription(){
      // setRequestSent(true);
        // console.log(requestSent);
        setIsFetchingInfo(true);
        axios.get('/api/transcribe?filename=' + filename).then((res) => {
          // console.log(res);
          setIsFetchingInfo(false);
          const status = res.data?.status;
          const transcription = res.data?.transcription;
          if(status === 'IN_PROGRESS'){
            setIsInTranscriing(true);
            setTimeout(getTranscription, 3000)
          } else {
            setIsInTranscriing(false);
            // console.log(transcription)
            
            setAwsTranscriptionItems(clearTranscriptionItems(transcription.result.items));
      }});
    }

    if (isTranscribing) {
      return (<div>Transcribing your vid...</div>);
    }

    if (isFetchingInfo) {
      return (<div>Fetching info...</div>);
    }

  return (
    <>
      <div className=' max-w-xs'>
        <div>is transcribing: {JSON.stringify(isTranscribing)}</div>
        <h2 className="text-2xl mb-3" style={{textShadow: '1px 1px 4px rgb(0,0,0)'}}>Transcription</h2>
        <div className="grid grid-cols-3 gap-1 sticky top-0 bg-green-700 p-2">
          <div className=' '>From:</div>
          <div className=' '>End:</div>
          <div className=' '>Content:</div>
        </div>
      </div>
      {awsTranscriptionItem.length > 0 && (
          awsTranscriptionItem.map((item) => {
            <TranscriptionItem item={item} />
          })
        )}
      <div>
        <h2 className=' text-2xl mb-4 text-white/60'>
            Result
        </h2>
        <div className=' relative my-3'>
          <button className='bg-blue-300 px-4 py-2 rounded-full border-2 border-blue-950 border-solid inline-flex hover:cursor-pointer'>
              <SparkleIcon/>
               <span>Generate captions</span>
          </button>
        </div>
        <div className=' rounded-xl overflow-hidden'>
        <video 
        controls
        src={"https://trannamson-caption-generator.s3.amazonaws.com/" + filename}></video>
      </div>
        </div>
    </>
  )
}

export default page