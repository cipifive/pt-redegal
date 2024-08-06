import { FC, useEffect, useState } from 'react'
import { getCharacterById } from '../../services/characterDetailService'
import {
  GET_CHARACTER_BY_ID,
  GET_N_COMICS_BY_CHARACTER_ID,
} from '../../constants/charactersDetail/endpoints'
import { useParams } from 'react-router-dom'
import { Info } from '../../components/CharacterDetail/Info'
import { Comics } from '../../components/CharacterDetail/Comics'

export const CharacterDetail: FC = () => {
  const { id }: any = useParams()

  const [character, setCharacter] = useState<any>()

  const [comics, setComics] = useState<any[]>([])

  const fetchData = async () => {
    try {
      const [characterResponse, comicsResponse] = await Promise.all([
        getCharacterById(GET_CHARACTER_BY_ID(id)),
        getCharacterById(GET_N_COMICS_BY_CHARACTER_ID(id, 20)),
      ])

      const { name, description, thumbnail } =
        characterResponse.data.data.results[0]
      setCharacter({ id, name, description, thumbnail })

      const comicsData = comicsResponse.data.data.results
      setComics(comicsData)
    } catch (error) {}
  }

  useEffect(() => {
    fetchData()
  }, [])
  return (
    <main className="characterDetail__wrapper">
      <Info character={character} />
      <Comics comics={comics} />
    </main>
  )
}
