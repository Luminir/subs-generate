import React, { useState } from 'react'

const TranscriptionItem = ({
  item,
  handleStartTimeChange,
  handleEndTimeChange,
  handleContentChange,
}: TransactionItemProps) => {
  // const [startSeconds, setStartSeconds] = useState(item.start_time);
  // const [endSeconds, setEndSeconds] = useState(item.end_time);
  // const [content, setContent] = useState(item.content);
  if(!item){
    return '';
  }
  return (
    <>
        <div className=' my-1 grid grid-cols-3 gap-1 items-center'>
            <input
              type="text" 
              value={item.start_time} 
              className=' text-white bg-white/20 w-[70px] text-center rounded-md p-1'
              onChange={handleStartTimeChange} />
            <input
              type="text" 
              value={item.end_time} 
              className=' text-white bg-white/20 w-[70px] text-center rounded-md p-1'
              onChange={handleEndTimeChange} />
          <input
              type="text" 
              value={item.content} 
              className=' text-white bg-white/20 w-[70px] text-center rounded-md p-1'
              onChange={handleContentChange} />
          </div>
    </>
  )
}

export default TranscriptionItem