import { FC, useContext } from 'react'
import logo from '../../assets/Marvel-logo.png'
import { GlobalContext } from '../../context/GlobalContext'

export const Navbar: FC = (props): JSX.Element => {
  const context = useContext(GlobalContext)

  if (!context) {
    throw new Error('UserComponent must be used within a GlobalProvider')
  }

  const { state, setFilteredCharacters } = context

  return (
    <nav className="navbar">
      <img
        src={logo}
        alt="Marvel logo"
        height={40}
        onClick={() => setFilteredCharacters(state.characters)}
      />
      <div
        className="fav-counter"
        onClick={() => setFilteredCharacters(state.favorites)}
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
