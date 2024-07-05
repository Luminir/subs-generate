import React, { useState } from 'react'

const TranscriptionItem = ({item}: any | any[]) => {
  const [startSeconds, setStartSeconds] = useState(item.start_time);
  const [endSeconds, setEndSeconds] = useState(item.end_time);
  const [content, setContent] = useState(item.content);
  return (
    <>
        <div className=' my-1 grid grid-cols-3 gap-1 items-center'>
            <input
              type="text" 
              value={startSeconds} 
              className=' text-white bg-white/20 w-[70px] text-center rounded-md p-1'
              onChange={(ev) => {
              setStartSeconds(ev.target.value);
            }} />
            <input
              type="text" 
              value={endSeconds} 
              className=' text-white bg-white/20 w-[70px] text-center rounded-md p-1'
              onChange={(ev) => {
              setEndSeconds(ev.target.value);
            }} />
          <input
              type="text" 
              value={content} 
              className=' text-white bg-white/20 w-[70px] text-center rounded-md p-1'
              onChange={(ev) => {
              setContent(ev.target.value);
            }} />
          </div>
    </>
  )
}

export default TranscriptionItem