import { FC } from 'react'

export const Comics: FC<any> = (props) => {
  const { comics } = props
  return (
    <section className="characterDetail__wrapper-down">
      <span>COMICS</span>
      <div>
        {comics
          .sort((a: any, b: any) => {
            const dateA = a.dates.find(
              (d: any) => d.type === 'onsaleDate',
            )?.date
            const dateB = b.dates.find(
              (d: any) => d.type === 'onsaleDate',
            )?.date

            if (!dateA) return 1
            if (!dateB) return -1

            return new Date(dateA).getTime() - new Date(dateB).getTime()
          })
          .map((item: any) => {
            return (
              <article className="comic-card" key={item.id}>
                <img
                  src={`${item?.thumbnail.path}.${item?.thumbnail.extension}`}
                  alt={item.title}
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
