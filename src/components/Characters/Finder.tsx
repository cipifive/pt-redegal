import { ChangeEvent, FC, useContext, useState } from 'react'
import { CiSearch } from 'react-icons/ci'
import { GlobalContext } from '../../context/GlobalContext'

export const Finder: FC<any> = (props): JSX.Element => {
  const {
    filteredCharacters,
    characters,
    setFilteredCharacters,
    filter,
    setFilter,
  } = props

  const context = useContext(GlobalContext)

  if (!context) {
    throw new Error('UserComponent must be used within a GlobalProvider')
  }

  const { state } = context

  const handleFilterCharacters = (e: ChangeEvent<HTMLInputElement>) => {
    let items
    if (state.favView) {
      items = [...state.favorites]
    } else {
      items = [...characters]
    }
    items = items.filter((item: any) =>
      item.name.toLowerCase().includes(e.target.value.toLocaleLowerCase()),
    )
    setFilter(e.target.value)
    setFilteredCharacters(items)
  }

  return (
    <>
      {state.favView ? <h2>FAVORITES</h2> : ''}
      <header className="search-container">
        <CiSearch className="input-icon" size={20} />
        <input
          className="input-filter"
          type="text"
          value={filter}
          onChange={handleFilterCharacters}
          placeholder="SEARCH A CHARACTER"
        />
        <label className="label-filter">
          {filteredCharacters.length} RESULTS
        </label>
      </header>
    </>
  )
}
