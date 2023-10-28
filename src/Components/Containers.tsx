import React,{useEffect} from 'react'
import { Connection_Api } from '../helpers/api' 
const Containers = () => {
  useEffect(() => {
    async function fetchData() {
    const response : any = await Connection_Api()
    console.log(response)
    }
    fetchData()
  }, [])
  return (
    <div>
      <div className='ml-44 text-white text-5xl mt-12'>
        Containers
      </div>
      <div className='flex ml-48 mt-8'>
        <p className='text-white text-lg mr-20'>Name</p>
        <div className='h-4 w-0.5 bg-slate-400 mt-1.5 mr-2'></div>
        <p className='text-white text-lg mr-20'>Status</p>
        <div className='h-4 w-0.5 bg-slate-400 mt-1.5 mr-2'></div>
        <p className='text-white text-lg mr-20'>Cpu Usage</p>
        <div className='h-4 w-0.5 bg-slate-400 mt-1.5 mr-2'></div>
        <p className='text-white text-lg mr-20'>Memory Usage</p>
        <div className='h-4 w-0.5 bg-slate-400 mt-1.5 mr-2'></div>
        <p className='text-white text-lg mr-20'>MEM(%)</p>
        <div className='h-4 w-0.5 bg-slate-400 mt-1.5 mr-2'></div>
        <p className='text-white text-lg mr-40'>Network I/O</p>
        <p className='text-white text-lg mr-20'>Optimize Container</p>
      </div>
      <div className='w-2/3 h-0.5 ml-44 bg-slate-400'></div>
      <div className='flex ml-44 mt-8'>
        <div className='w-40'>
          <p className='text-white text-lg mr-20'>Container ddfdffffffff</p>
        </div>
        <div>
          <p className='text-white text-lg mr-20'>Running</p>
        </div>
        <div>
          <p className='text-white text-lg mr-40'>30%</p>
        </div>
        <div>
          < p className='text-white text-lg mr-40'>50%</p>
        </div>
        <div>
          <p className='text-white text-lg mr-40'>20%</p>
        </div>
        <div>
          <p className='text-white text-lg mr-48'>0B</p>
        </div>
        <div className='ml-8'>
          <button className='text-black text-md bg-white rounded-md w-24 h-8 hover:shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)]'>optimize</button>
        </div>
        </div>
        <div className='w-2/3 h-0.5 ml-44 bg-slate-400 mt-3 mb-3'></div>
        
    </div>
  )
}

export default Containers
