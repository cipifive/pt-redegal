import React from 'react'
import { render, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Characters } from './Characters'
import { GlobalContext } from '../../context/GlobalContext'

const mockSetCharacters = vi.fn()
const mockSetFilteredCharacters = vi.fn()
const mockContextValue: any = {
  state: {
    characters: [],
    filteredCharacters: [],
    favView: false,
    favorites: [],
  },
  setCharacters: mockSetCharacters,
  setFilteredCharacters: mockSetFilteredCharacters,
}

const MockGlobalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <GlobalContext.Provider value={mockContextValue}>
    {children}
  </GlobalContext.Provider>
)

describe('Characters Component', () => {
  it('should update state.characters with 50 items after loading', async () => {
    const mockCharacters = Array.from({ length: 50 }, (_, index) => ({
      id: `${index}`,
      name: `Character ${index}`,
      thumbnail: {
        path: '',
        extension: '',
      },
    }))

    vi.mock('../services/characterService', () => ({
      getAllCharacters: vi.fn(() =>
        Promise.resolve({
          data: {
            data: {
              results: mockCharacters,
            },
          },
        }),
      ),
    }))

    render(
      <MockGlobalProvider>
        <Characters />
      </MockGlobalProvider>,
    )

    await waitFor(() => {
      expect(mockSetCharacters).toHaveBeenCalledWith(mockCharacters)
      expect(mockSetFilteredCharacters).toHaveBeenCalledWith(mockCharacters)
    })

    await waitFor(() => {
      expect(mockContextValue.state.characters.length).toBe(50)
    })
  })
})
