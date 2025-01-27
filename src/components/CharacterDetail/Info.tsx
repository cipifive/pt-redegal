import { FC, useContext } from 'react'
import { FaHeart } from 'react-icons/fa'
import { GlobalContext } from '../../context/GlobalContext'
import { CiHeart } from 'react-icons/ci'
import { handleFavorites } from '../../utils/functions'
import { IFavs, PropsInfo } from '../../models/shared'

export const Info: FC<PropsInfo> = (props): JSX.Element => {
  const { character } = props
  const context = useContext(GlobalContext)

  if (!context) {
    throw new Error('UserComponent must be used within a GlobalProvider')
  }

  const { state, setFavorites } = context

  return (
    <section className="characterDetail__wrapper-up">
      <div>
        <img
          src={`${character?.thumbnail.path}.${character?.thumbnail.extension}`}
          alt={`Imagen de ${character?.name}`}
        />
        <div className="characterDetail--info">
          <div>
            <h2>{character?.name.toUpperCase()}</h2>
            {state.favorites.map((f: IFavs) => f.id).includes(character?.id) ? (
              <FaHeart
                tabIndex={0}
                aria-label="Remove from favorites"
                role="button"
                size={24}
                color="red"
                onClick={() => handleFavorites(character, state, setFavorites)}
              />
            ) : (
              <CiHeart
                tabIndex={0}
                aria-label="Add to favorites"
                role="button"
                size={28}
                onClick={() => handleFavorites(character, state, setFavorites)}
              />
            )}
          </div>

          <span>{character?.description}</span>
        </div>
      </div>
    </section>
  )
}
