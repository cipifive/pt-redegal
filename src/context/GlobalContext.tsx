import { createContext, useState, ReactNode, FC } from 'react'

interface State {
  filteredCharacters: any[]
  characters: any[]
  favorites: any[]
  favView: boolean
}

interface ContextProps {
  state: State
  setFilteredCharacters: (fchars: any[]) => void
  setCharacters: (chars: any[]) => void
  setFavorites: (favs: any[]) => void
  setFavView: (fview: boolean) => void
}

export const GlobalContext = createContext<ContextProps | undefined>(undefined)

export const GlobalProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<State>({
    filteredCharacters: [],
    characters: [],
    favorites: [],
    favView: false,
  })

  const setFavorites = (favorites: any[]) =>
    setState((prevState) => ({ ...prevState, favorites }))
  const setCharacters = (characters: any[]) =>
    setState((prevState) => ({ ...prevState, characters }))
  const setFilteredCharacters = (filteredCharacters: any[]) =>
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
