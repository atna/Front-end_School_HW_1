import api from '@/api-client'
import { AxiosResponse } from 'axios'

class TiktokDataService {
  getTrandingFeed (): Promise<AxiosResponse> {
    return api.get('/trending/feed')
  }

  getUserInfo (name: string): Promise<AxiosResponse> {
    return api.get(`user/info/${name}`)
  }

  getUserFeed (name: string): Promise<AxiosResponse> {
    return api.get(`user/feed/${name}`)
  }
}

export default new TiktokDataService()
