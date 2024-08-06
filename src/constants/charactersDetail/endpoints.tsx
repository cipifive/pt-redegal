export const GET_CHARACTER_BY_ID = (id: string) => `public/characters/${id}`

export const GET_N_COMICS_BY_CHARACTER_ID = (id: string, limit: number) =>
  `public/characters/${id}/comics?limit=${limit}`
