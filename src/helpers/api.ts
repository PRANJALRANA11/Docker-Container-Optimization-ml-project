// Purpose: API helper functions.
import axios from 'axios'

export function Connection_Api() {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket("ws://localhost:8000/stats");

    ws.onopen = (event) => {
      ws.send("Connect");
    };

    ws.onmessage = (e) => {
      const message = JSON.parse(e.data);
      resolve(message); // Resolve the promise with the received data
    };

    ws.onerror = (error) => {
      reject(error); // Reject the promise in case of an error
    };
  });
}
export async function Inspect_Image_Api(id:string) {
  const response= await axios.get(`http://localhost:8000/inspect_image/${id}`);
  return response;
}

