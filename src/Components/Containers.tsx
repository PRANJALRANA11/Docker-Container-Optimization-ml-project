import React,{useEffect,useState} from 'react'
import { Connection_Api } from '../helpers/api' 
const Containers = () => {
  interface ContainerStats {
    containerID: string;
    containerName: string;
    cpuUsagePercentage: number;
    memoryUsageInMebibytes: number;
    memoryLimitInBytes: number;
    network: number;
    pids: number;
  }
  const [data, setData] = useState<ContainerStats | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response: any = await Connection_Api();
        const previousTotalUsage:number = response[0].stats.precpu_stats.cpu_usage.total_usage;
        const currentTotalUsage:number = response[0].stats.cpu_stats.cpu_usage.total_usage;
        const numberOfCPUs:number = response[0].stats.precpu_stats.online_cpus;
        const cpuUsagePercentage:number = ((currentTotalUsage - previousTotalUsage) / numberOfCPUs) * 100;
        const memoryUsageInBytes:number = response[0].stats.memory_stats.usage;
        const memoryLimitInBytes:number = response[0].stats.memory_stats.limit;
        const memoryUsageInMebibytes:number = memoryUsageInBytes / 1024 / 1024;
        const rxBytes:number = response[0].stats.networks.eth0.rx_bytes;
        const txBytes:number = response[0].stats.networks.eth0.tx_bytes;
        const network:number = rxBytes/txBytes
        const containerName:string = response[0].stats.name;
        const containerID:string = response[0].stats.id;
        const pids:number = response[0].stats.pids_stats.current;

        const containerStats: ContainerStats = {
          containerID,
          containerName,
          cpuUsagePercentage,
          memoryUsageInMebibytes,
          memoryLimitInBytes,
          network,
          pids,
        };

        setData(containerStats);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);
  return (
    <div>
      <div className='ml-44 text-white text-5xl mt-12'>Containers</div>
      <div className='flex ml-48 mt-8'>
        <p className='text-white text-lg mr-20'>Name</p>
        <div className='h-4 w-0.5 bg-slate-400 mt-1.5 mr-2'></div>
        <p className='text-white text-lg mr-20'>Status</p>
        <div className='h-4 w-0.5 bg-slate-400 mt-1.5 mr-2'></div>
        <p className='text-white text-lg mr-20'>Cpu Usage</p>
        <div className='h-4 w-0.5 bg-slate-400 mt-1.5 mr-2'></div>
        <p className='text-white text-lg mr-20'>Memory Usage</p>
        <div className='h-4 w-0.5 bg-slate-400 mt-1.5 mr-2'></div>
        <p className='text-white text-lg mr-20'>Network I/O</p>
        <div className='h-4 w-0.5 bg-slate-400 mt-1.5 mr-2'></div>
        <p className='text-white text-lg mr-20'>Inspect Layers</p>
        <div className='h-4 w-0.5 bg-slate-400 mt-1.5 mr-2'></div>
        <p className='text-white text-lg mr-20'>Optimize Container</p>
      </div>
      <div className='w-4/5 h-0.5 ml-44 bg-slate-400'></div>
      <div className='flex ml-44 mt-8'>
        <div className='w-40'>
          <p className='text-white text-lg mr-20'>{data?.containerName}</p>
        </div>
        <div>
          <p className='text-white text-lg mr-20'>Running</p>
        </div>
        <div>
          <p className='text-white text-lg mr-40'>{data?.cpuUsagePercentage } %</p>
        </div>
        <div>
          <p className='text-white text-lg mr-40'>{data?.memoryUsageInMebibytes} MiB / {data?.memoryLimitInBytes} MiB</p>
        </div>
  
        <div>
          <p className='text-white text-lg mr-28'>{data?.network} B</p>
        </div>
        <div>
          <button className='text-black text-md ml-8 bg-white rounded-md w-24 h-8 hover:shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)]'>
            Inspect
          </button>
          </div>
        <div className='ml-28'>
          <button className='text-black text-md bg-white rounded-md w-24 h-8 hover:shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)]'>
            Optimize
          </button>
        </div>
      </div>
      <div className='w-4/5 h-0.5 ml-44 bg-slate-400 mt-3 mb-3'></div>
    </div>
  );
}

export default Containers
