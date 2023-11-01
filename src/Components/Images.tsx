
import React, { useEffect } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import {  Inspect_Image_Api } from '../helpers/api' 
import 'react-circular-progressbar/dist/styles.css';



export default function Images({ID}:any){
  useEffect(() => {
    const handleInspectImage = async(ID:string) => {
      try{
        console.log(ID)
        const response =  await Inspect_Image_Api(ID);
        if(response.status === 200){
        console.log(response);
        }
      }catch(error){
        console.log(error);
      }
    }
    handleInspectImage(ID);
    
    },[ID]);
  return (
    <div className="ml-5 space-y-4">
      <h3 className="text-3xl ml-80 mt-10 text-white">Analyzing:</h3>
      <div className="flex ml-80 space-x-4">
        <div>
        <div className=" rounded-md p-4">
          <div className="text-sm text-gray-500">Total Size</div>
          <h2 className="text-2xl text-slate-300">size Bytes</h2>
        </div>
        <div className=" rounded-md p-4">
          <div className="text-sm text-gray-500">Inefficient Bytes</div>
          <h2 className="text-2xl text-slate-300">Inneficent bytes</h2>
        </div>
        <div className=" rounded-md p-4">
          <div className="text-sm text-gray-500">Efficiency Score</div>
          <h2 className="text-2xl text-slate-300">90</h2>
        </div>
        </div>
        <div >
        <div style={{ width: 200, height: 200, marginLeft:200 }}>
        <CircularProgressbar  strokeWidth={4} value={66} text={`${66}%`} styles={buildStyles({
                                    strokeLinecap: 'round',
                                    textSize: '16px',
                                    pathTransitionDuration: 0.5,
                                    textColor: '#97feef',
                                    trailColor: 'transparent',
                                    pathColor:"#f06155",
            
                                })}
                            />;
        </div>
        </div>
      </div>
      <div className="ml-10  space-y-2">
        <h3 className="text-3xl text-white">Layers</h3>
        <div>
      <div className="mt-10 w-4/5">
      <div className="bg-white  shadow-md  rounded-lg">
        <table className="w-full table-fixed">
          <thead style={{backgroundColor:"#8554fe"}}>
            <tr>
              <th className="px-4 py-2 text-left text-white font-semibold">Index</th>
              <th className="px-4 py-2 text-left text-white font-semibold">ID</th>
              <th className="px-4 py-2 text-left text-white font-semibold">Size</th>
              <th className="px-4 py-2 text-right text-white font-semibold">Command</th>
            </tr>
          </thead>
          <tbody>
              <tr  style={{backgroundColor:"#610df9"}}>
                <td className="px-4 text-white py-2">row</td>
                <td className="px-4 text-white py-2">extract ID</td>
                <td className="px-4 text-white py-2">size bytes</td>
                <td className="px-4 text-white py-2 text-right">Command</td>
              </tr>
              <tr  style={{backgroundColor:"#610df9"}}>
                <td className="px-4 text-white py-2">row</td>
                <td className="px-4 text-white py-2">extract ID</td>
                <td className="px-4 text-white py-2">size bytes</td>
                <td className="px-4 text-white py-2 text-right">Command</td>
              </tr>
              <tr  style={{backgroundColor:"#610df9"}}>
                <td className="px-4 text-white py-2">row</td>
                <td className="px-4 text-white py-2">extract ID</td>
                <td className="px-4 text-white py-2">size bytes</td>
                <td className="px-4 text-white py-2 text-right">Command</td>
              </tr>
              <tr  style={{backgroundColor:"#610df9"}}>
                <td className="px-4 text-white py-2">row</td>
                <td className="px-4 text-white py-2">extract ID</td>
                <td className="px-4 text-white py-2">size bytes</td>
                <td className="px-4 text-white py-2 text-right">Command</td>
              </tr>
          </tbody>
        </table>
      </div>
    </div>
    </div>
      </div>
    </div>
  )
}
