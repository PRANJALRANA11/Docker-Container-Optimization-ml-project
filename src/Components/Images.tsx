import React, { useEffect } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import {  Inspect_Image_Api } from '../helpers/api' 
import 'react-circular-progressbar/dist/styles.css';



export default function Images({ID}:any){
  const [details_image,setdetails_image] = React.useState<any>({});
  const [details_layers,setdetails_layers] = React.useState<any[]>([]);
  useEffect(() => {
    const handleInspectImage = async(ID:string) => {
      try{
        console.log(ID)
        const response =  await Inspect_Image_Api(ID);
        if(response.status === 200){
        console.log(response.data);
        setdetails_image(response.data.image);
        setdetails_layers(response.data.layer);
        }
      }catch(error){
        console.log(error);
      }
    }
    handleInspectImage(ID);
    
    },[ID]);
  return (
    <div className="pl-5 space-y-4" style={{backgroundColor:"#0f1d32"}}>
      <h3 className="text-3xl ml-80 mt-10 text-white" style={{fontFamily:"poppins"}}>Analyzing:</h3>
      <div className="flex ml-80 space-x-4">
        <div>
        <div className=" rounded-md p-4">
          <div className="text-sm text-gray-400" style={{fontFamily:"poppins"}}>Total Size</div>
          <h2 className="text-2xl text-white" style={{fontFamily:"poppins"}}>{details_image.sizeBytes} Bytes</h2>
        </div>
        <div className=" rounded-md p-4">
          <div className="text-sm text-gray-400" style={{fontFamily:"poppins"}}>Inefficient Bytes</div>
          <h2 className="text-2xl text-white" style={{fontFamily:"poppins"}}>{details_image.inefficientBytes} Bytes</h2>
        </div>
        <div className=" rounded-md p-4">
          <div className="text-sm text-gray-400" style={{fontFamily:"poppins"}}>Efficiency Score</div>
          <h2 className="text-2xl text-white" style={{fontFamily:"poppins"}}>{Math.floor(details_image.efficiencyScore*100)} %</h2>
          
        </div>
        <div className='flex'>
        <div className='w-40 mt-5'>
          <button className='text-black text-md bg-white rounded-md w-32 h-8 hover:shadow-[5px_5px_0px_0px_rgba(109,40,217)] transition-all' style={{fontFamily:"poppins"}}>
            Optimize
          </button>
        </div>
        <div className='w-40 mt-5'>
          <button className='text-black text-md bg-white rounded-md w-32 h-8 hover:shadow-[5px_5px_0px_0px_rgba(109,40,217)] transition-all' style={{fontFamily:"poppins"}}>
            Containers
          </button>
        </div>
        </div>
        
        </div>
        <div >
        <div style={{ width: 200, height: 200, marginLeft:200 }}>
        <CircularProgressbar  strokeWidth={4} value={Math.floor(details_image.efficiencyScore*100)} text={`${Math.floor(details_image.efficiencyScore*100)}%`} styles={buildStyles({
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
      <div className="ml-20  space-y-2">
        <h3 className="text-3xl text-white" style={{fontFamily:"poppins"}}>Layers</h3>
        <div>
      <div className="mt-10 w-4/5">
      <div className="bg-white  shadow-md  rounded-lg">
        <table className="w-full table-fixed">
          <thead style={{backgroundColor:"rgb(29 50 80)"}}>
            <tr>
              <th className="px-4 py-2 text-left text-white font-semibold" style={{fontFamily:"poppins"}}>Index</th>
              <th className="px-4 py-2 text-left text-white font-semibold" style={{fontFamily:"poppins"}}>Digest ID</th>
              <th className="px-4 py-2 text-left text-white font-semibold" style={{fontFamily:"poppins"}}>ID</th>
              <th className="px-4 py-2 text-left text-white font-semibold" style={{fontFamily:"poppins"}}>Size</th>
              <th className="px-4 py-2 text-right text-white font-semibold" style={{fontFamily:"poppins"}}>Command</th>
            </tr>
          </thead>
          <tbody>
  {details_layers.map((layer:any, index:number) => (
    <tr key={index}  style={{ backgroundColor: "rgb(36 64 105)", borderBottom: "1px solid #1d3250",cursor: "pointer" }}>
      <td className="px-4 text-white py-2" style={{  maxWidth: "100px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", fontFamily:"poppins" }}>{layer.index}</td>
      <td className="px-4 text-white py-2" style={{  maxWidth: "200px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", fontFamily:"poppins" }}>{layer.digestId}</td>
      <td className="px-4 text-white py-2" style={{  maxWidth: "200px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", fontFamily:"poppins" }}>{layer.id}</td>
      <td className="px-4 text-white py-2" style={{ }}>{layer.sizeBytes} Bytes</td>
      <td className="px-4 text-white py-2 text-right" style={{  maxWidth: "150px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", fontFamily:"poppins" }}>{layer.command}</td>
    </tr>
  ))}
</tbody>

        </table>
      </div>
    </div>
    </div>
      </div>
    </div>
  )
}
