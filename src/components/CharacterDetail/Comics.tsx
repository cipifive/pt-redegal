import { FC } from 'react'
import { PropsComics } from '../../models/shared'
import { IComic, IDates } from '../../models/character'

export const Comics: FC<PropsComics> = (props): JSX.Element => {
  const { comics } = props
  return (
    <section className="characterDetail__wrapper-down">
      <h2>COMICS</h2>
      <div>
        {comics
          .sort((a: IComic, b: IComic) => {
            const dateA = a.dates.find(
              (d: IDates) => d.type === 'onsaleDate',
            )?.date
            const dateB = b.dates.find(
              (d: IDates) => d.type === 'onsaleDate',
            )?.date

            if (!dateA) return 1
            if (!dateB) return -1

            return new Date(dateA).getTime() - new Date(dateB).getTime()
          })
          .map((item: IComic) => {
            return (
              <article className="comic-card" key={item.id}>
                <img
                  src={`${item?.thumbnail.path}.${item?.thumbnail.extension}`}
                  alt={`Imagen del comic ${item.title}`}
                />
                <label title={item.title}>
                  {item.title.length > 35
                    ? item.title.slice(0, 35) + '...'
                    : item.title}
                </label>
              </article>
            )
          })}
      </div>
    </section>
  )
}
