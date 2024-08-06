import { FC, useContext } from 'react'
import { CiHeart } from 'react-icons/ci'
import { FaHeart } from 'react-icons/fa'
import { GlobalContext } from '../../context/GlobalContext'
import { useNavigate } from 'react-router-dom'
import { handleFavorites } from '../../utils/functions'

export const Card: FC<any> = (props): JSX.Element => {
  const { character } = props
  const context = useContext(GlobalContext)
  const navigate = useNavigate()

  if (!context) {
    throw new Error('UserComponent must be used within a GlobalProvider')
  }

  const { state, setFavorites } = context

  return (
    <article
      className="character-card"
      onClick={() => navigate(`/character/${character.id}`)}
    >
      <img
        className="card-image"
        alt="Character image"
        src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
      />
      <footer className="character-footer">
        <label title={character.name}>
          {character.name.length > 12
            ? character.name.slice(0, 12) + '...'
            : character.name}
        </label>
        {state.favorites
          .map((f) => parseInt(f.id))
          .includes(parseInt(character.id)) ? (
          <FaHeart
            size={24}
            color="red"
            onClick={(e) => {
              e.stopPropagation()
              handleFavorites(character, state, setFavorites)
            }}
          />
        ) : (
          <CiHeart
            size={28}
            onClick={(e) => {
              e.stopPropagation()
              handleFavorites(character, state, setFavorites)
            }}
          />
        )}
      </footer>
    </article>
  )
}
