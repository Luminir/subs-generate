'use client'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { clearTranscriptionItems } from '../libs/AwsTranscribHelper';
import TranscriptionItem from '../components/Transcription';
import SparkleIcon from '../icons/SparkleIcon';
import ResultedVid from '../components/ResultedVid';

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

    function updateTranscriptionItem(i: number, prop: any | any[], ev: any | any[]){
      const newAwsItems = [...awsTranscriptionItem];
      const newItem = {...newAwsItems[i]};
      newItem[prop] = ev.target.value;
      console.log(newItem);
      newAwsItems[i] = newItem;
      setAwsTranscriptionItems(newAwsItems);
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
      {awsTranscriptionItem.length > 0 &&
          awsTranscriptionItem.map((item, key) => {
            <TranscriptionItem item={item} 
              handleStartTimeChange={(ev)=> {updateTranscriptionItem(key, 'start_time', ev)}}
              handleEndTimeChange={(ev)=> {updateTranscriptionItem(key, 'end_time', ev)}}
              handleContentChange={(ev)=> {updateTranscriptionItem(key, 'content', ev)}} />
          })
        }
      <div>
        <h2 className=' text-2xl mb-4 text-white/60'>
            Result
        </h2>
            <ResultedVid filename={filename} transcriptionItems={awsTranscriptionItem} />
        </div>
    </>
  )
}

export default page