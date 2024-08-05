import { ChangeEvent, FC, useEffect, useState } from "react"
import { getAllCharacters } from "../../services/characterService"
import { GET_N_CHARACTERS } from "../../constants/characters/endpoints"
import { CiSearch } from "react-icons/ci";

export const Characters:FC = () => {

    const [characters, setCharacters] = useState<any[]>([])

    const [filteredCharacters, setFilteredCharacters] = useState<any[]>([])

    const [filter, setFilter] = useState<string>("")

    const handleFilterCharacters = (e:ChangeEvent<HTMLInputElement>) => {
        let items = [...characters]
       items = items.filter((item:any) => item.name.includes(e.target.value))
       setFilter(e.target.value)
       setFilteredCharacters(items)
    }

    const fetchNCharacters = async () => {
        try {
            const response = await getAllCharacters(GET_N_CHARACTERS(50))
            const { results } = response.data.data
            setCharacters(results)
            setFilteredCharacters(results)
        } catch (error) {
            
        }
    }

    useEffect(() => {
        fetchNCharacters()
    },[])

    return (
        <main className="characters__wrapper">
            <header className="search-container">
                <CiSearch className="input-icon" size={20}/>
                <input className="input-filter"  type="text" value={filter} onChange={handleFilterCharacters} placeholder="SEARCH A CHARACTER"/>
                <label className="label-filter">{filteredCharacters.length} RESULTS</label>
            </header>
            
            <section className="characters__wrapper-grid">
                {
                    filteredCharacters.map((character:any) => {
                        return (
                            <article key={character.id}>
                                {character.name}
                            </article>
                        )
                    })
                }
            </section>
        </main>
    )
}