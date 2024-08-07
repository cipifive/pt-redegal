import { createContext, useState, ReactNode, FC } from 'react'
import { ContextProps, IFavs, State } from '../models/shared'

export const GlobalContext = createContext<ContextProps | undefined>(undefined)

export const GlobalProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<State>({
    filteredCharacters: [],
    characters: [],
    favorites: [],
    favView: false,
  })

  const setFavorites = (favorites: IFavs[]) =>
    setState((prevState) => ({ ...prevState, favorites }))
  const setCharacters = (characters: IFavs[]) =>
    setState((prevState) => ({ ...prevState, characters }))
  const setFilteredCharacters = (filteredCharacters: IFavs[]) =>
    setState((prevState) => ({ ...prevState, filteredCharacters }))
  const setFavView = (favView: boolean) =>
    setState((prevState) => ({ ...prevState, favView }))

  return (
    <GlobalContext.Provider
      value={{
        state,
        setFavorites,
        setCharacters,
        setFilteredCharacters,
        setFavView,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}
