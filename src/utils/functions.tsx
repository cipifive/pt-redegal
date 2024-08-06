export const handleFavorites = (
  character: any,
  state: any,
  callBack: (param: any) => void,
) => {
  let favs = [...state.favorites]
  if (favs.map((f) => parseInt(f.id)).includes(parseInt(character.id))) {
    favs = favs.filter((f: any) => parseInt(f.id) != parseInt(character.id))
    callBack(favs)
  } else {
    favs = [...favs, character]
    callBack(favs)
  }
}
