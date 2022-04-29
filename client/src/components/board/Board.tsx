import { FC, useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import realtime from "../../firebase/realtime";
import ListItem from "../ListItem/ListItem";

interface Props {
  lists: {
    id: string;
    name: any;
    tasks: string[];
  }[];
  setToggle: (toggle: boolean) => void;
  toggle: boolean;
}

export const Board: FC<Props> = ({ lists, setToggle, toggle }) => {
  const [task, setTask] = useState<string>("");

  const handleTask = async (oldTask: string[], key: string) => {
    const data = {
      tasks: [...(oldTask || []), task],
    };
    try {
      await realtime.patch(`/lists/${key}.json`, data);
      setToggle(!toggle);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="list-container">
      {lists.map((list) => (
        <div className="list-div" key={list.id}>
          <h1>{list.name}</h1>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                handleTask(list.tasks, list.id);
              }}
            >
              <input
                type="text"
                onChange={(event) => setTask(event.target.value)}
              />
              <button>Add Task</button>
            </form>
          <Droppable droppableId={list.id}>
            {(provided) => {
              return (
                <div 
                ref={provided.innerRef}
                {...provided.droppableProps}
                className='droppable-col'
                >
                  <ListItem tasks={list.tasks} />
                </div>
              )
            }}
          </Droppable>
        </div>
      ))}
    </div>
  );
};
