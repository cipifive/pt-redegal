import { render, screen } from '@testing-library/react'
import { Navbar } from './Navbar'
import { BrowserRouter as Router } from 'react-router-dom'
import { GlobalContext } from '../../context/GlobalContext'
import { vi } from 'vitest'

const mockSetFavorites = vi.fn()

const mockContextValue: any = {
  state: {
    characters: [],
    filteredCharacters: [],
    favView: false,
    favorites: [],
  },

  setFavorites: mockSetFavorites,
}
const MockGlobalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <Router>
    <GlobalContext.Provider value={mockContextValue}>
      {children}
    </GlobalContext.Provider>
  </Router>
)

describe('Navbar Component', () => {
  it('renders the Navbar component', () => {
    render(
      <MockGlobalProvider>
        <Navbar />
      </MockGlobalProvider>,
    )
  })

  it('show the marvel logo properly', () => {
    const alt_text = 'Marvel logo'
    render(
      <MockGlobalProvider>
        <Navbar />
      </MockGlobalProvider>,
    )

    let logo = screen.getByAltText(alt_text)

    expect(logo).toBeInTheDocument()
  })

  it('show the hearth logo properly', () => {
    const title_text = 'heart-logo'
    render(
      <MockGlobalProvider>
        <Navbar />
      </MockGlobalProvider>,
    )

    let hearth_logo = screen.getByTitle(title_text)

    expect(hearth_logo).toBeInTheDocument()
  })
})
