import { FC } from 'react'

interface Lists {
    lists: listItems[]
}
interface listItems {
    key: string
    name:any
  }

export const Board:FC<Lists> = ({lists}) => {
  return (
    <div>
        {lists.map(list => (
            <div>
                <h1>{list.name.name}</h1>
            </div>
        ))}
        </div>
  )
}
