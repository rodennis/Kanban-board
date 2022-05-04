import React, {FC} from 'react'
import { Draggable } from 'react-beautiful-dnd'
import './listItem.scss'

interface Props {
  tasks: string[]
}

const ListItem:FC<Props> = ({tasks}) => {


  return (
    <div>
      {tasks?.map((task:any, index:number) => (
            <div key={index}>
              <Draggable key={task} index={index} draggableId={task}>
                {(provided) => {
                  return (
                    <div
                    ref={provided.innerRef}
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                    className='task-div'
                    >
                    <h4>{task}</h4>
                    </div>
                  )
                }}
              </Draggable>
            </div>
          ))}
    </div>
  )
}
export default ListItem
