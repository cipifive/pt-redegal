import { ICharacter } from '../models/character'
import { IFavs, State } from '../models/shared'

export const handleFavorites = (
  character: ICharacter,
  state: State,
  callBack: (param: IFavs[]) => void,
) => {
  let favs: IFavs[] = [...state.favorites]
  if (favs.map((f: IFavs) => f.id).includes(character.id)) {
    favs = favs.filter((f: IFavs) => f.id != character.id)
    callBack(favs)
  } else {
    favs = [...favs, character]
    callBack(favs)
  }
}

export const checkDataStored = (key: string) => {
  if (localStorage.getItem(key)) {
    let dataStored = JSON.parse(localStorage.getItem(key) || '{}')
    if ('registered_at' in dataStored) {
      let registeredAt: Date = new Date(dataStored['registered_at'])

      let currentDate: Date = new Date()

      let differencems = currentDate.getTime() - registeredAt.getTime()

      let onedayms = 24 * 60 * 60 * 1000

      if (Math.floor(differencems / onedayms) >= 1) {
        return false
      }

      return true
    }
    return false
  }
  return false
}
