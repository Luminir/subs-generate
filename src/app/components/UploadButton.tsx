'use client'

import React, { useState } from 'react'
import CloudIcon from '../icons/CloudIcon'
import axios from 'axios'
import { UploadSpinner } from '../icons/UploadSpinner'
import { useRouter } from 'next/navigation'

const UploadButton = () => {
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);

  const upload = async (ev: any) => {
    ev.preventDefault();
    console.log(ev) // info of everything can be found in the console
    const files = ev.target?.files;
    if (files.length > 0){
      const file = files[0]; // send this file to the backend
      setIsUploading(true);
      // axios backend:
      const res = await axios.postForm('/api/upload', {
        file, 
      });
      setIsUploading(false);
      console.log(res.data)
      const newName = res.data.newName; // find the name of the file u just upload
      router.push('/' + newName); // redirect to a page with unique id of the vid just uploaded
    }
  }
  return (
    <>
      {isUploading && (
        <div className='fixed inset-0 bg-black/30 text-white flex items-center'>
          <div className='w-full text-center'>
            <UploadSpinner/>
          </div>
        </div>
      )}
      <div className="text-center mt-3 ">
        <label className=" bg-blue-300 px-4 py-2 rounded-full border-2 border-blue-950 border-solid inline-flex hover:cursor-pointer">
          <div className=" flex gap-1"><CloudIcon/><span>Upload file</span></div>
          <input onChange={upload} type="file" className=' hidden'/>
        </label>
      </div>
    </>
  )
}

export default UploadButton