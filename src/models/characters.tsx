import { IThumb } from './shared'

export interface ICharacters {
  id: number
  name: string
  modified: string
  comics?: any
  description: string
  events?: any
  resourceUri: string
  series?: any
  stories?: any
  thumbnail?: IThumb
  urls?: any[]
}
