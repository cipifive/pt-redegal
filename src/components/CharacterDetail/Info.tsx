import { FC, useContext } from 'react'
import { FaHeart } from 'react-icons/fa'
import { GlobalContext } from '../../context/GlobalContext'
import { CiHeart } from 'react-icons/ci'
import { handleFavorites } from '../../utils/functions'

export const Info: FC<any> = (props) => {
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
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <h2>{character?.name}</h2>
            {state.favorites
              .map((f) => parseInt(f.id))
              .includes(parseInt(character?.id)) ? (
              <FaHeart
                size={24}
                color="red"
                onClick={() => handleFavorites(character, state, setFavorites)}
              />
            ) : (
              <CiHeart
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
