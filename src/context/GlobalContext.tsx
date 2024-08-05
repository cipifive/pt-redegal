import { createContext, useState, ReactNode, FC } from 'react'

interface State {
  filteredCharacters: any[]
  characters: any[]
  favorites: any[]
}

interface ContextProps {
  state: State
  setFilteredCharacters: (fchars: any[]) => void
  setCharacters: (chars: any[]) => void
  setFavorites: (favs: any[]) => void
}

// Crear el contexto
export const GlobalContext = createContext<ContextProps | undefined>(undefined)

// Crear un proveedor de contexto
export const GlobalProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<State>({
    filteredCharacters: [],
    characters: [],
    favorites: [],
  })

  // Funciones para actualizar el estado
  const setFavorites = (favorites: any[]) =>
    setState((prevState) => ({ ...prevState, favorites }))
  const setCharacters = (characters: any[]) =>
    setState((prevState) => ({ ...prevState, characters }))
  const setFilteredCharacters = (filteredCharacters: any[]) =>
    setState((prevState) => ({ ...prevState, filteredCharacters }))

  return (
    <GlobalContext.Provider
      value={{ state, setFavorites, setCharacters, setFilteredCharacters }}
    >
      {children}
    </GlobalContext.Provider>
  )
}
