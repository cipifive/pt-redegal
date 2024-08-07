import { IThumb } from './shared'

export interface ICharacter {
  id: number
  name: string
  description: string
  thumbnail: IThumb
  modified?: any
  resourceUri?: any
}

export interface IDates {
  type: string
  date: string
}

export interface IComic {
  id: number
  modified: string
  characters: any
  collectedIssues: any[]
  creators: any
  dates: IDates[]
  description: string
  diamondCode: string
  digitalId: number
  ean: string
  events: any
  format: string
  images: IThumb[]
  isbn: string
  issn: string
  issueNumber: number
  pageCount: number
  prices: any
  series: any
  stories: any
  textObjects: any
  thumbnail: IThumb
  title: string
  upc: string
  urls: any
  variantDescription: string
  variants: any
}
