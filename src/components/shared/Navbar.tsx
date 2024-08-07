import { FC, useContext } from 'react'
import logo from '../../assets/Marvel-logo.png'
import { GlobalContext } from '../../context/GlobalContext'
import { useLocation, useNavigate } from 'react-router-dom'

export const Navbar: FC = (): JSX.Element => {
  const context = useContext(GlobalContext)

  const location = useLocation()
  const navigate = useNavigate()

  if (!context) {
    throw new Error('UserComponent must be used within a GlobalProvider')
  }

  const { state, setFilteredCharacters, setFavView } = context

  const handleGoHome = () => {
    if (location.pathname !== '/') {
      setFilteredCharacters(state.characters)
      setFavView(false)
      navigate('/')
    } else {
      setFilteredCharacters(state.characters)
      setFavView(false)
    }
  }

  const handleFilterFavorites = () => {
    if (location.pathname !== '/') {
      setFilteredCharacters(state.favorites)
      setFavView(true)
      navigate('/')
    } else {
      setFilteredCharacters(state.favorites)
      setFavView(true)
    }
  }

  return (
    <nav className="navbar">
      <img
        src={logo}
        alt="Marvel logo"
        height={40}
        onClick={handleGoHome}
        tabIndex={0}
        role="button"
        aria-label="Go to home"
      />
      <div
        title="heart-logo"
        tabIndex={0}
        role="button"
        aria-label="View favorites"
        className="fav-counter"
        onClick={handleFilterFavorites}
      >
        <svg
          width="24"
          height="22"
          viewBox="0 0 24 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-labelledby="logoTitle logoDesc"
        >
          <title id="logoTitle">Marvel Icon</title>
          <desc id="logoDesc">Red Marvel logo icon</desc>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 3.63869L6 -0.00292969L0 3.63869V11.4422L12 21.6734L24 11.4422V3.63869L18 -0.00292969L12 3.63869Z"
            fill="#EC1D24"
          />
        </svg>
        <span style={{ color: 'white' }}>{state.favorites.length}</span>
      </div>
    </nav>
  )
}
