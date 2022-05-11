import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Droppable } from "react-beautiful-dnd";
import realtime from "../../firebase/realtime";
import ListItem from "../ListItem/ListItem";
import CreateList  from "../createList/CreateList";
import "./Board.scss";

interface Props {
  setToggle: (toggle: boolean) => void;
  toggle: boolean;
  boards: {
    name: string
    lists: object[]
    id: string
  }[]
}
interface FoundBoard {
  name: String
  lists: object[]
}
type List = {
  name?: string
}


export const Board: FC<Props> = ({ boards, setToggle, toggle }) => {
  const params = useParams();

  const [task, setTask] = useState<string>("");
  const [foundBoard, setFoundBoard] = useState<FoundBoard>();

  const handleNewTask = async (oldTask: string[], key: string) => {
    const data = {
      tasks: [...(oldTask || []), task],
    };
    try {
      if (task !== "") {
        await realtime.patch(`/lists/${key}.json`, data);
        setToggle(!toggle);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // const getBoard = async () => {
    //   const res = await realtime.get(`/boards/${params.id}.json`)
    //   const data = res.data
    //   return data
    // }
    // getBoard().then(result => {
    //   setFoundBoard(result)
    // })
    if(boards){
      let res = boards.find(board => {
        return board.id === params.id
      })
      setFoundBoard(res);
    }
  }, [boards, params.id])

  // const handleDelete = async (event: any, id: string) => {
  //   event.preventDefault();
  //   await realtime.delete(`./lists/${id}.json`);
  //   setToggle(!toggle);
  // };

  return (
    <div className="board-container">
      <CreateList
        boards={boards}
        setToggle={setToggle}
        toggle={toggle}
      />
      <div className="list-container">
      {foundBoard && foundBoard.lists && foundBoard.lists.map((board: List, index:number) => (
        <div className="list-div" key={index}>
          <h2>{board.name}</h2>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              // handleNewTask(board.tasks?, list.id);
            }}
          >
            <input
              type="text"
              onChange={(event) => setTask(event.target.value)}
              placeholder="Add a Task"
              className="add-task-input"
            />
            <button className="add-task">Add Task</button>
            {/* <button onClick={(event: any) => handleDelete(event, board.id)}>
            Delete
            </button> */}
          </form>
          {board.name && <Droppable droppableId={board.name}>
            {(provided) => {
              return (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="droppable-col"
                >
                  {/* <ListItem tasks={board.tasks} /> */}
                  {provided.placeholder}
                </div>
              );
            }}
          </Droppable>}
        </div>
      ))}
       </div>
    </div>
  );
};
