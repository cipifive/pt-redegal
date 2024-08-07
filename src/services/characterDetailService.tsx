import axiosInstance from '../config/axios/axios-config'

export const getCharacterById = (uri: string) => {
  const response = axiosInstance.get(uri)
  return response
}

export const getComicsByCharacterId = (uri: string) => {
  const response = axiosInstance.get(uri)
  return response
}
