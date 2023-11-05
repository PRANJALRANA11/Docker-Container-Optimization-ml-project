
import React,{SetStateAction,useState,useEffect} from 'react'
import {useNavigate } from 'react-router-dom';


export interface ContainerStats {
  containerID: string;
  containerName: string;
  cpuUsagePercentage: number;
  memoryUsageInMebibytes: number;
  memoryLimitInBytes: number;
  network: number;
  pids: number;
}

interface ContainersProps {
  containers: ContainerStats[] | null;
  ID:(set: SetStateAction<string>) => void;
}

const Containers: React.FC<ContainersProps> = ({containers,ID}) => {
 
  let navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    if (containers) {
      setIsLoading(false);
    }
  }, [containers]);

  const handleInspectImage = async(containerID:string) => {
    
    try{
      ID(containerID);
      navigate('/inspect_image');
      console.log(containerID)
    }catch(error){
      console.log(error);
    }
  }
  return (
    <div>
  <div className='ml-44 text-white text-5xl mt-16' style={{fontFamily:"poppins"}}>Containers 
    
  </div>
   
  <div className='flex ml-44 mt-14'>
    <div className='w-40'>
      <p className='text-white text-lg mr-20' style={{fontFamily:"poppins"}}>Name</p>
    </div>
    <div className='w-40 ml-10 flex'>
      <div className='h-4 w-0.5 bg-slate-400 mt-1.5 mr-2'></div>
      <p className='text-white text-lg mr-20' style={{fontFamily:"poppins"}}>Status</p>
    </div>
    <div className='w-40 flex'>
      <div className='h-4 w-0.5 bg-slate-400 mt-1.5 mr-2'></div>
      <p className='text-white text-lg mr-20' style={{fontFamily:"poppins"}}>Cpu Usage</p>
    </div>
    <div className='w-40 mr-10 flex'>
      <div className='h-4 w-0.5 bg-slate-400 mt-1.5 mr-2'></div>
      <p className='text-white text-lg mr-20'>Memory Usage</p>
    </div>
    <div className='w-40 mr-10 flex'>
       <div className='h-4 w-0.5 bg-slate-400 mt-1.5 mr-2'></div>
      <p className='text-white text-lg mr-20' style={{fontFamily:"poppins"}}>Network I/O</p>
    </div>
    <div className='w-40 flex'>
       <div className='h-4 w-0.5 bg-slate-400 mt-1.5 mr-2'></div>
      <p className='text-white text-lg mr-20' style={{fontFamily:"poppins"}}>Inspect Layers</p>
    </div>
  </div>
  <div className='w-2/3 h-0.5 ml-44 bg-slate-400'></div>
  {isLoading ? (
        // Display loading GIF while data is being fetched
        <div className='flex justify-center mt-8'>
          <img src="../../1488.gif" alt="Loading" />
        </div>
      ) : (
        containers &&
    containers.map((container, index) => (
      <div>
      <div key={index} className='flex ml-44 mt-8'>
        <div className='w-40'>
          <p className='text-white text-lg' style={{fontFamily:"poppins"}}>{container.containerName}</p>
        </div>
        <div className='w-40 ml-14'>
          <p className='text-white text-lg' style={{fontFamily:"poppins"}}>Running</p>
        </div>
        <div className='w-40'>
          <p className='text-white text-lg' style={{fontFamily:"poppins"}}>{container.cpuUsagePercentage} %</p>
        </div>
        <div className='w-40 mr-10'>
          <p className='text-white text-lg' style={{fontFamily:"poppins"}}>{container.memoryUsageInMebibytes} MiB</p>
        </div>
        <div className='w-40 mr-5'>
          <p className='text-white text-lg' style={{fontFamily:"poppins"}}>{container.network} B</p>
        </div>
        <div className='w-40'>
          <button onClick={()=>handleInspectImage(container.containerID)} style={{fontFamily:"poppins"}} className='text-black text-md  bg-white rounded-md w-24 h-8 hover:shadow-[5px_5px_0px_0px_rgba(109,40,217)] transition-all '>
            Inspect
          </button>
        </div>
      </div>
      <div className='w-2/3 h-0.5 ml-44 mt-3 bg-slate-400'></div>
      </div>
       ))
       )}
</div>

  );
}

export default Containers
