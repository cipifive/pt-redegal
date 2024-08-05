import { ChangeEvent, FC, useState } from 'react'
import { CiSearch } from 'react-icons/ci'

export const Finder: FC<any> = (props): JSX.Element => {
  const { filteredCharacters, characters, setFilteredCharacters } = props

  const [filter, setFilter] = useState<string>('')

  const handleFilterCharacters = (e: ChangeEvent<HTMLInputElement>) => {
    let items = [...characters]
    items = items.filter((item: any) =>
      item.name.toLowerCase().includes(e.target.value.toLocaleLowerCase()),
    )
    setFilter(e.target.value)
    setFilteredCharacters(items)
  }

  return (
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
  )
}
