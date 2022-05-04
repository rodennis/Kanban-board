import { FC, useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import realtime from "../../firebase/realtime";
import ListItem from "../ListItem/ListItem";
import "./Board.scss";

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

  const handleNewTask = async (oldTask: string[], key: string) => {
    const data = {
      tasks: [...(oldTask || []), task],
    };
    try {
      if(task !== '') {
        await realtime.patch(`/lists/${key}.json`, data);
        setToggle(!toggle);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // const handleDelete = async (event: any, id: string) => {
  //   event.preventDefault();
  //   await realtime.delete(`./lists/${id}.json`);
  //   setToggle(!toggle);
  // };

  return (
    <div className="list-container">
      {lists.map((list,index) => (
        <div className="list-div" key={list.id}>
          <h2>{list.name.toUpperCase()}</h2>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              handleNewTask(list.tasks, list.id);
            }}
          >
            <input
              type="text"
              onChange={(event) => setTask(event.target.value)}
              placeholder="Add a Task"
              className="add-task-input"
            />
            <button className="add-task">Add Task</button>
            {/*<button onClick={(event: any) => handleDelete(event, list.id)}>*/}
            {/*  Delete*/}
            {/*</button>*/}
          </form>
          <Droppable droppableId={list.name}>
            {(provided) => {
              return (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="droppable-col"
                >
                  <ListItem tasks={list.tasks} />
                  {provided.placeholder}
                </div>
              );
            }}
          </Droppable>
        </div>
      ))}
    </div>
  );
};
