import { FC, useContext, useEffect } from 'react'
import { Finder } from '../../components/Characters/Finder'
import { Card } from '../../components/Characters/Card'
import { GlobalContext } from '../../context/GlobalContext'

export const Characters: FC = () => {
  const context = useContext(GlobalContext)

  if (!context) {
    throw new Error('UserComponent must be used within a GlobalProvider')
  }

  const { state, setCharacters, setFilteredCharacters } = context

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
    fetchNCharacters()
  }, [])

  return (
    <main className="characters__wrapper">
      <Finder
        characters={state.characters}
        filteredCharacters={state.filteredCharacters}
        setFilteredCharacters={setFilteredCharacters}
      />

      <section className="characters__wrapper-grid">
        {state.filteredCharacters.map((character: any) => {
          return <Card key={character.id} character={character} />
        })}
      </section>
    </main>
  )
}
