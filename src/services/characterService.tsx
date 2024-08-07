import axiosInstance from '../config/axios/axios-config'

export const getAllCharacters = (uri: string) => {
  const response = axiosInstance.get(uri)
  return response
}

export const getNCharacters = (uri: string) => {
  const response = axiosInstance.get(uri)
  return response
}
