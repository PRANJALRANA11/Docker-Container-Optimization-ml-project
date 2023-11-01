import React from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import Containers from './Components/Containers';
import Images from './Components/Images';

import { useEffect, useState } from 'react';
import { Connection_Api } from './helpers/api';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';



interface ContainerStats {
  containerID: string;
  containerName: string;
  cpuUsagePercentage: number;
  memoryUsageInMebibytes: number;
  memoryLimitInBytes: number;
  network: number;
  pids: number;
}


function App() {

  const [containerData, setContainerData] = useState<ContainerStats[] | null>(null);
  const [ID,setID]=useState("");

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

  return (
    <div className=" App">
       <Navbar/>
       <Routes>
        <Route path="/" element={<Containers containers={containerData} ID={setID} />}/>
        <Route path="/inspect_image" element={<Images ID={ID}/>}/>
       </Routes>

    </div>
  );
}

export default App;
