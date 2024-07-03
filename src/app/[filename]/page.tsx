'use client'
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const page = ({params}: VideoParamsProps) => {
    // console.log(JSON.stringify(params))
    const filename = params.filename;
    // const [requestSent, setRequestSent] = useState(false)
    const [isTranscribing, setIsInTranscriing] = useState(false);
    const[awsTranscriptionItem, setAwsTranscriptionItems] = useState([]);

    useEffect(() => {
      getTranscription()
    }, [filename])

    function getTranscription(){
      // setRequestSent(true);
        // console.log(requestSent);
        axios.get('/api/transcribe?filename=' + filename).then((res) => {
          // console.log(res);
          const status = res.data?.status;
          const transcription = res.data?.transcription;
          if(status === 'IN_PROGRESS'){
            setIsInTranscriing(true);
            setTimeout(getTranscription, 3000)
          } else {
            setIsInTranscriing(false);
            // console.log(transcription)
            setAwsTranscriptionItems(transcription.results.items);
      }});
    }

  return (
    <div>
      {filename}
      <div>is transcribing: {JSON.stringify(isTranscribing)}</div>
      {awsTranscriptionItem.length > 0 && (
        awsTranscriptionItem.map((item) => {
          <div>
            <span className='text-white/50 mr-2 p-3 rounded-full mb-2'>
            {item.start_time} - {item.end_time}
          </span>
          <span>
            {item.alternatives[0].content}
          </span>
          </div>
        })
      )}
    </div>
  )
}

export default page