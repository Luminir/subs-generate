import React from 'react'

const MainBody = ({h1Text, h2Text}: MainBodyProps) => {
  return (
    <>
        <div className=" text-center mt-20">
        <h1 className=" text-3xl font-sans text-zinc-200" style={{textShadow: '1px 1px 4px rgb(0,0,0)'}}>{h1Text}</h1>
        <h2 className=" text-white/70 mt-5 ">{h2Text}</h2>
      </div>
    </>
  )
}

export default MainBody