import React from 'react'

const Usagecards = () => {
  return (
    <div className='flex mt-10'>
      <div className='card1  w-96 h-40 bg-slate-800 ml-48 mr-10 border-black rounded-lg p-5'>
        <p className='text-slate-400'>
          CPU Resource Usage
        </p>
        <p className='text-white mt-10'>
          Used <span className='text-green-500 text-3xl ml-44'>87%</span><span>/100%</span>
        </p>
        <div className='w-80 h-1 bg-slate-300 mt-3 rounded-md'></div>
      </div>
      <div className='card2  w-96 h-40 bg-slate-800 mr-10 border-black rounded-lg p-5'>
        <p className='text-slate-400 font-poppins'>
          Memory Usage
        </p>
        <p className='text-white mt-10'>
          Used<span className='text-green-500 text-3xl ml-44'>87%</span><span>/100%</span>
        </p>
        <div className='w-80 h-1 bg-slate-300 mt-3 rounded-md'></div>
      </div>
      <div className='card3  w-96 h-40 bg-slate-800 mr-10 border-black rounded-lg p-5'>
        <p className='text-slate-400'>
          CPU Resource Usage
        </p>
        <p className='text-white mt-10'>
          Used<span className='text-green-500 text-3xl ml-44'>87%</span><span>/100%</span>
        </p>
        <div className='w-80 h-1 bg-slate-300 mt-3 rounded-md'></div>
      </div>
      </div>
  )
}

export default Usagecards;
