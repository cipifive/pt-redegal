import { FC, useContext, useEffect, useState } from 'react'
import { Finder } from '../../components/Characters/Finder'
import { Card } from '../../components/Characters/Card'
import { GlobalContext } from '../../context/GlobalContext'
import { getAllCharacters } from '../../services/characterService'
import { GET_N_CHARACTERS } from '../../constants/characters/endpoints'
import { checkDataStored } from '../../utils/functions'

export const Characters: FC = () => {
  const context = useContext(GlobalContext)

  if (!context) {
    throw new Error('UserComponent must be used within a GlobalProvider')
  }

  const { state, setCharacters, setFilteredCharacters } = context

  const [filter, setFilter] = useState<string>('')

  const [loading, setLoading] = useState<boolean>(false)

  const fetchNCharacters = async () => {
    try {
      if (!checkDataStored('characters')) {
        setLoading(true)
        const response = await getAllCharacters(GET_N_CHARACTERS(50))
        const { results } = response.data.data
        setCharacters(results)
        setFilteredCharacters(results)
        localStorage.setItem(
          'characters',
          JSON.stringify({ registered_at: new Date(), items: results }),
        )
        setLoading(false)
      } else {
        let stored_characters = JSON.parse(
          localStorage.getItem('characters') || '{}',
        )
        setCharacters(stored_characters.items)
        setFilteredCharacters(stored_characters.items)
      }
    } catch (error) {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!state.favView) fetchNCharacters()
  }, [state.favView])

  useEffect(() => {
    setFilter('')
  }, [state.favView])

  if (loading) {
    return <main className={'characters__wrapper--loading'}></main>
  }

  return (
    <main className={'characters__wrapper'}>
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
