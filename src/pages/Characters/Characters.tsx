import { FC, useContext, useEffect, useState } from 'react'
import { Finder } from '../../components/Characters/Finder'
import { Card } from '../../components/Characters/Card'
import { GlobalContext } from '../../context/GlobalContext'

export const Characters: FC = () => {
  const context = useContext(GlobalContext)

  if (!context) {
    throw new Error('UserComponent must be used within a GlobalProvider')
  }

  const { state, setCharacters, setFilteredCharacters } = context

  const [filter, setFilter] = useState<string>('')

  const fetchNCharacters = async () => {
    try {
      //const response = await getAllCharacters(GET_N_CHARACTERS(25))
      //const { results } = response.data.data
      let results = JSON.parse(localStorage.getItem('characters') || '[]')
      console.log(results)
      setCharacters(results)
      setFilteredCharacters(results)
      localStorage.setItem('characters', JSON.stringify(results))
    } catch (error) {}
  }

  useEffect(() => {
    if (!state.favView) fetchNCharacters()
  }, [])

  useEffect(() => {
    setFilter('')
  }, [state.favView])

  return (
    <main className="characters__wrapper">
      <Finder
        characters={state.characters}
        filteredCharacters={state.filteredCharacters}
        setFilteredCharacters={setFilteredCharacters}
        filter={filter}
        setFilter={setFilter}
      />

      <section className="characters__wrapper-grid">
        {state.filteredCharacters
          .filter((character: any) => {
            if (state.favView) {
              return state.favorites.some((fav: any) => fav.id === character.id)
            }
            return true
          })
          .map((character: any) => (
            <Card key={character.id} character={character} />
          ))}
      </section>
    </main>
  )
}
