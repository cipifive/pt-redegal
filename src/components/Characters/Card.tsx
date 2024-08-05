import { FC, useContext } from 'react'
import { CiHeart } from 'react-icons/ci'
import { FaHeart } from 'react-icons/fa'
import { GlobalContext } from '../../context/GlobalContext'

export const Card: FC<any> = (props): JSX.Element => {
  const { character } = props
  const context = useContext(GlobalContext)

  if (!context) {
    throw new Error('UserComponent must be used within a GlobalProvider')
  }

  const { state, setFavorites } = context

  const handleFavorites = (character: any) => {
    let favs = [...state.favorites]
    if (favs.map((f) => f.id).includes(character.id)) {
      favs = favs.filter((f: any) => f.id != character.id)
      setFavorites(favs)
    } else {
      favs = [...favs, character]
      setFavorites(favs)
    }
  }

  return (
    <article className="character-card">
      <img
        className="card-image"
        alt="Character image"
        src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
      />
      <footer className="character-footer">
        {character.name}
        {state.favorites.map((f) => f.id).includes(character.id) ? (
          <FaHeart
            size={14}
            color="red"
            onClick={() => handleFavorites(character)}
          />
        ) : (
          <CiHeart size={18} onClick={() => handleFavorites(character)} />
        )}
      </footer>
    </article>
  )
}
