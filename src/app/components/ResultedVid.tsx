import React from 'react'
import SparkleIcon from '../icons/SparkleIcon'

const ResultedVid = ({ filename }: any) => {
  return (
    <>
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
    </>
  )
}

export default ResultedVid