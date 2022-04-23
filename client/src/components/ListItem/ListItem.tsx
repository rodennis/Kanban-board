import React, {FC} from 'react'

interface Props {
  tasks: string[]
}

const ListItem:FC<Props> = ({tasks}) => {
  return (
    <div>
      {tasks?.map((task) => (
            <div>
              <h2>{task}</h2>
            </div>
          ))}
    </div>
  )
}
export default ListItem
