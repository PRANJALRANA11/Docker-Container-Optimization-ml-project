
import React,{SetStateAction} from 'react'
import {useNavigate } from 'react-router-dom';



interface ContainersProps {
  containers: ContainerStats[] | null;
  ID:(set: SetStateAction<string>) => void;
}

const Containers: React.FC<ContainersProps> = ({containers,ID}) => {
 
  let navigate = useNavigate();

  const handleInspectImage = async(containerID:string) => {
    try{
      ID(containerID);
      navigate('/inspect_image');
      console.log(containerID)
    }catch(error){
      console.log(error);
    }
const Containers = () => {
  const [containerData, setContainerData] = useState<ContainerStats[] | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response:any = await Connection_Api();
        const containerStatsArray: ContainerStats[] = response.map((container:any) => {
          const previousTotalUsage:number = container.stats.precpu_stats.cpu_usage.total_usage;
          const currentTotalUsage:number = container.stats.cpu_stats.cpu_usage.total_usage;
          const numberOfCPUs:number = container.stats.precpu_stats.online_cpus;
          const cpuUsagePercentage:number = ((currentTotalUsage - previousTotalUsage) / numberOfCPUs) * 100;
          const memoryUsageInBytes:number = container.stats.memory_stats.usage;
          const memoryLimitInBytes:number = container.stats.memory_stats.limit;
          const memoryUsageInMebibytes:number = memoryUsageInBytes / 1024 / 1024;
          const rxBytes:number = container.stats.networks.eth0.rx_bytes;
          const txBytes:number = container.stats.networks.eth0.tx_bytes;
          const network:number = rxBytes / txBytes;
          const containerName:string = container.stats.name;
          const containerID:string = container.stats.id;
          const pids:number = container.stats.pids_stats.current;

          return {
            containerID,
            containerName,
            cpuUsagePercentage,
            memoryUsageInMebibytes,
            memoryLimitInBytes,
            network,
            pids,
          };
        });

        setContainerData(containerStatsArray);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  const handleInspectImage = (containerID:string) => {
    const response = Inspect_Image_Api(containerID);
  }
  return (
    <div>
  <div className='ml-44 text-white text-5xl mt-12'>Containers</div>
  <div className='flex ml-44 mt-8'>
    <div className='w-40'>
      <p className='text-white text-lg mr-20'>Name</p>
    </div>
    <div className='w-40 ml-10 flex'>
      <div className='h-4 w-0.5 bg-slate-400 mt-1.5 mr-2'></div>
      <p className='text-white text-lg mr-20'>Status</p>
    </div>
    <div className='w-40 flex'>
      <div className='h-4 w-0.5 bg-slate-400 mt-1.5 mr-2'></div>
      <p className='text-white text-lg mr-20'>Cpu Usage</p>
    </div>
    <div className='w-40 mr-10 flex'>
      <div className='h-4 w-0.5 bg-slate-400 mt-1.5 mr-2'></div>
      <p className='text-white text-lg mr-20'>Memory Usage</p>
    </div>
    <div className='w-40 mr-10 flex'>
       <div className='h-4 w-0.5 bg-slate-400 mt-1.5 mr-2'></div>
      <p className='text-white text-lg mr-20'>Network I/O</p>
    </div>
    <div className='w-40 flex'>
       <div className='h-4 w-0.5 bg-slate-400 mt-1.5 mr-2'></div>
      <p className='text-white text-lg mr-20'>Inspect Layers</p>
    </div>
    <div className='w-40 flex'>
       <div className='h-4 w-0.5 bg-slate-400 mt-1.5 mr-2'></div>
      <p className='text-white text-lg mr-20'>Optimize Container</p>
    </div>
  </div>
  <div className='w-4/5 h-0.5 ml-44 bg-slate-400'></div>
  {containers &&
    containers.map((container, index) => (

      <div>
      <div key={index} className='flex ml-44 mt-8'>
        <div className='w-40'>
          <p className='text-white text-lg'>{container.containerName}</p>
        </div>
        <div className='w-40 ml-14'>
          <p className='text-white text-lg'>Running</p>
        </div>
        <div className='w-40'>
          <p className='text-white text-lg'>{container.cpuUsagePercentage} %</p>
        </div>
        <div className='w-40 mr-10'>
          <p className='text-white text-lg'>{container.memoryUsageInMebibytes} MiB</p>
        </div>
        <div className='w-40 mr-10'>
          <p className='text-white text-lg'>{container.network} B</p>
        </div>
        <div className='w-40'>
          <button onClick={()=>handleInspectImage(container.containerID)} className='text-black text-md ml-2 bg-white rounded-md w-24 h-8 hover:shadow-[5px_5px_0px_0px_rgba(109,40,217)] transition-all '>
            Inspect
          </button>
        </div>
        <div className='w-40'>
          <button className='text-black text-md bg-white rounded-md w-24 h-8 hover:shadow-[5px_5px_0px_0px_rgba(109,40,217)] transition-all'>
            Optimize
          </button>
        </div>
      </div>
      <div className='w-4/5 h-0.5 ml-44 mt-3 bg-slate-400'></div>
      </div>
    ))}
</div>

  );
}

export default Containers
