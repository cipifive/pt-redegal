import { FC, useEffect, useState } from 'react'
import { getCharacterById } from '../../services/characterDetailService'
import {
  GET_CHARACTER_BY_ID,
  GET_N_COMICS_BY_CHARACTER_ID,
} from '../../constants/charactersDetail/endpoints'
import { useParams } from 'react-router-dom'
import { Info } from '../../components/CharacterDetail/Info'
import { Comics } from '../../components/CharacterDetail/Comics'
import { checkDataStored } from '../../utils/functions'

export const CharacterDetail: FC = () => {
  const { id }: any = useParams()

  const [character, setCharacter] = useState<any>()

  const [comics, setComics] = useState<any[]>([])

  const [loading, setLoading] = useState<boolean>(false)

  const fetchData = async () => {
    try {
      if (!checkDataStored(`${id}-character`)) {
        setLoading(true)
        const [characterResponse, comicsResponse] = await Promise.all([
          getCharacterById(GET_CHARACTER_BY_ID(id)),
          getCharacterById(GET_N_COMICS_BY_CHARACTER_ID(id, 20)),
        ])

        const { name, description, thumbnail } =
          characterResponse.data.data.results[0]
        setCharacter({ id, name, description, thumbnail })
        const comicsData = comicsResponse.data.data.results
        setComics(comicsData)
        setLoading(false)
        localStorage.setItem(
          `${id}-character`,
          JSON.stringify({
            registered_at: new Date(),
            items: {
              info: { id, name, description, thumbnail },
              comics: comicsData,
            },
          }),
        )
      } else {
        let stored_character = JSON.parse(
          localStorage.getItem(`${id}-character`) || '{}',
        )

        setCharacter(stored_character.items.info)
        setComics(stored_character.items.comics)
      }
    } catch (error) {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (loading) {
    return <main className="characterDetail__wrapper--loading"></main>
  }
  return (
    <main className="characterDetail__wrapper">
      <Info character={character} />
      <Comics comics={comics} />
    </main>
  )
}
