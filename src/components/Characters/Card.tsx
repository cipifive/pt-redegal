import { FC, useContext } from 'react'
import { CiHeart } from 'react-icons/ci'
import { FaHeart } from 'react-icons/fa'
import { GlobalContext } from '../../context/GlobalContext'
import { useNavigate } from 'react-router-dom'
import { handleFavorites } from '../../utils/functions'
import { IFavs, PropsInfo } from '../../models/shared'

export const Card: FC<PropsInfo> = (props): JSX.Element => {
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
        alt={`Image of ${character.name}`}
        src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
      />
      <footer className="character-footer">
        <label title={character.name}>
          {character.name.length > 12
            ? character.name.slice(0, 12) + '...'
            : character.name}
        </label>
        {state.favorites.map((f: IFavs) => f.id).includes(character.id) ? (
          <FaHeart
            size={24}
            className="hearth-color"
            tabIndex={0}
            aria-label="Remove from favorites"
            role="button"
            onClick={(e) => {
              e.stopPropagation()
              handleFavorites(character, state, setFavorites)
            }}
          />
        ) : (
          <CiHeart
            size={28}
            tabIndex={0}
            aria-label="Add to favorites"
            role="button"
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
