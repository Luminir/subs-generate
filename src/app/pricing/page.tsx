import React from 'react'

const page = () => {
  return (
    <>
       <div className="mt-20 text-white">
      <h1 className="text-center text-6xl max-sm:text-5xl font-bold">
        Packages
      </h1>
      <div className="flex sm:space-x-4 max-sm:space-y-4 max-sm:flex-col text-center">
        <div className="flex-1 text-xl mt-14 rounded-xl border border-[#4E67E5]/25 bg-[#080C23] p-10 w-full">
          <div className="text-cyan-400 font-semibold text-2xl">Beginner ⛳</div>
          <div className="text-2xl my-5 font-bold">$1.99/m</div>
          <div>
            Free massages
          </div>
          <button
            className="my-5 w-full text-black p-5 max-sm:p-2 rounded-3xl bg-cyan-400 text-xl max-sm:text-lg hover:bg-[#8a9dfc] transition-all"
          >
            Purchase
          </button>
          <ul>
            <li>First feature</li>
            <li>Second feature</li>
          </ul>
        </div>
        
        <div
          className="flex-1 text-xl mt-14 rounded-xl border-8 border-green-400 bg-[#120d1d] p-10 w-full "
        >
          <div className="text-green-300 font-semibold text-2xl">Intermidate</div>
          <div className="text-2xl my-5 font-bold">$4.99/m</div>
          <div className=' text-yellow-500 font-semibold'>
            Best seller
          </div>
          <button
            className="my-5 w-full text-black p-5 max-sm:p-2 rounded-3xl bg-green-300 text-xl max-sm:text-lg hover:bg-[#BB99FF] transition-all"
          >
            Purchase
          </button>
          <ul>
            <li>First Feature</li>
            <li>Second Feature</li>
            <li>Thired Feature</li>
          </ul>
        </div>
        <div
          className="flex-1 text-xl mt-14 rounded-xl border border-[#F7E16F]/25 bg-[#19170d] p-10 w-full"
        >
          <div className="text-[#F7E16F] font-semibold text-2xl">Pro ✨</div>
          <div className="text-2xl my-5 font-bold">$9.99/m</div>
          <div>
            W Rizz + Aura
          </div>
          <button
            className="my-5 w-full text-black p-5 max-sm:p-2 rounded-3xl bg-[#F7E16F] text-xl max-sm:text-lg hover:bg-[#fdf2bb] transition-all"
          >
            Purchase
          </button>
          <ul>
            <li>First Feature</li>
            <li>Second Feature</li>
            <li>Thired Feature</li>
            <li>Fourth Feature</li>
            <li>Fifth Feature</li>
          </ul>
        </div>
      </div>
    </div>
    </>
  )
}

export default page