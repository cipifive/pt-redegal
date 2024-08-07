import { ComponentType } from 'react'
import { IComic } from './character'

export interface IFavs {
  id: number
  name: string
  description: string
  thumbnail: IThumb
  modified?: string
  comics?: any
  events?: any
  resourceUri?: string
  series?: any
  stories?: any
  urls?: any[]
}

export interface State {
  filteredCharacters: IFavs[]
  characters: IFavs[]
  favorites: IFavs[]
  favView: boolean
}

export interface ContextProps {
  state: State
  setFilteredCharacters: (fchars: IFavs[]) => void
  setCharacters: (chars: IFavs[]) => void
  setFavorites: (favs: IFavs[]) => void
  setFavView: (fview: boolean) => void
}

export interface IThumb {
  path: string
  extension: string
}

export interface PropsLayout {
  Component: ComponentType<any>
}

export interface PropsInfo {
  character: IFavs
}

export interface PropsComics {
  comics: IComic[]
}

export interface PropsFinder {
  characters: IFavs[]
  filteredCharacters: IFavs[]
  setFilteredCharacters: (fchars: IFavs[]) => void
  filter: string
  setFilter: (str: string) => void
}
