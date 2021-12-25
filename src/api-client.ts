import axios, { AxiosInstance } from 'axios'

const apiClient: AxiosInstance = axios.create({
  baseURL: 'https://tiktok33.p.rapidapi.com',
  headers: {
    'Content-type': 'application/json',
    'x-rapidapi-host': 'tiktok33.p.rapidapi.com',
    'x-rapidapi-key': 'e8b2933888msh784eea07a632ba0p1b8642jsn2976e13ffbf2'
  }
})

export default apiClient
