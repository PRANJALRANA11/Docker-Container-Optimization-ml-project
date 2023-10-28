// Purpose: API helper functions.
import axios from 'axios'
export  async function Connection_Api() {
    try {
        const response= await axios.get('http://localhost:8000/containers')
        console.log(response)
    } catch (error) {
        console.log(error)
    }
}
