import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Droppable, DragDropContext } from "react-beautiful-dnd";
import realtime from "../../firebase/realtime";
import ListItem from "../ListItem/ListItem";
import CreateList from "../createList/CreateList";
import "../../main.scss";

interface Props {
  setToggle: (toggle: boolean) => void;
  toggle: boolean;
  boards: {
    name: string;
    lists: object[];
    id: string;
  }[];
}
interface FoundBoard {
  name: String;
  lists: object[];
}
type List = {
  name?: string;
  tasks?: any;
};

export const Board: FC<Props> = ({ boards, setToggle, toggle }) => {
  const params = useParams();

  const [task, setTask] = useState<string>("");
  const [foundBoard, setFoundBoard] = useState<FoundBoard>();

  const handleNewTask = async (oldTask: string[], key: number) => {
    const data = {
      tasks: [...(oldTask || []), task],
    };
    try {
      if (task !== "") {
        await realtime.patch(`/boards/${params.id}/lists/${key}.json`, data);
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
    if (boards) {
      let res = boards.find((board) => {
        return board.id === params.id;
      });
      setFoundBoard(res);
    }
  }, [boards, params.id]);

  const handleDelete = async (event: any, id: number) => {
    event.preventDefault();
    foundBoard?.lists.splice(id, 1);
    const newData = {
      name: foundBoard?.name,
      lists: foundBoard?.lists,
    };
    await realtime.put(`/boards/${params.id}.json`, newData);
    setToggle(!toggle);
  };

  const handleDragEnd = async (data: any) => {
    if (data.destination === null) return;
    if (
      data.destination.index === data.source.index &&
      data.destination.droppableId === data.source.droppableId
    )
      return;
    const dest = data.destination.droppableId;
    const destIndex = data.destination.index;
    const src = data.source.droppableId;
    const srcIndex = data.source.index;
    const task = data.draggableId;

    if (foundBoard && foundBoard.lists) {
      for (let i = 0; foundBoard.lists.length > i; i++) {
        let board: any = foundBoard.lists[i];
        if (!board.tasks) board["tasks"] = [];
        board.name === src && board.tasks.splice(srcIndex, 1);
        board.name === dest && board.tasks.splice(destIndex, 0, task);
      }
    }

    const newData = {
      name: foundBoard?.name,
      lists: foundBoard?.lists,
    };
    await realtime.put(`/boards/${params.id}.json`, newData);
    setToggle(!toggle);
  };

  return (
    <div className="board-container">
      <DragDropContext onDragEnd={handleDragEnd}>
        <CreateList boards={boards} setToggle={setToggle} toggle={toggle} />
        <div className="list-container">
          {foundBoard &&
            foundBoard.lists &&
            foundBoard.lists.map((list: List, index: number) => (
              <div className="list-div" key={index}>
                <h2>{list.name}</h2>
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    handleNewTask(list.tasks, index);
                  }}
                >
                  <input
                    type="text"
                    onChange={(event) => setTask(event.target.value)}
                    placeholder="Add a Task"
                    className="add-task-input"
                  />
                  <button className="add-task">Add Task</button>
                  <button className='delete-task' onClick={(event: any) => handleDelete(event, index)}>
                    Delete
                  </button>
                </form>
                {list.name && (
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
                )}
              </div>
            ))}
        </div>
      </DragDropContext>
    </div>
  );
};
