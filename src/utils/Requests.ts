import axios from 'axios'
import { GetToken } from './Token'

const CreateHeaders = () => {
    let token = GetToken()
    if(!token)
        return {}

    return { Authorization: `Bearer ${token}` }
}

export const GetRequest = (path: string) => {
    return axios.get(path, { headers: CreateHeaders() })
}

export const PostRequest = (path: string, data: any) => {
    return axios.post(path, data, { headers: CreateHeaders() })
}

export const PutRequest = (path: string, data: any) => {
    return axios.put(path, data, { headers: CreateHeaders() })
}

export const DeleteRequest = (path: string) => {
    return axios.delete(path, { headers: CreateHeaders() })
}
