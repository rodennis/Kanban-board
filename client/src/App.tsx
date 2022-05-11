import React, { FC, useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.scss";
import { Board } from "./components/board/Board";
import "./firebase/firebase";
import realtime from "./firebase/realtime";
import { DragDropContext } from "react-beautiful-dnd";
import DashBoard from "./components/DashBoard/Dashboard";

const App: FC = () => {
  type Lists = {
    id: string;
    tasks: string[];
    name: string;
  };

  type Boards = {
    name: string;
    lists: object[];
    id: string;
  };

  const [lists, setLists] = useState<Lists[]>([]);
  const [boards, setBoards] = useState<Boards[]>([]);
  const [toggle, setToggle] = useState<boolean>(false);

  useEffect(() => {
    const getData = async () => {
      const res = await realtime.get("/boards.json");
      const data = res?.data;
      if (data !== null) {
        const returnedLists = Object.entries(data).map(
          ([key, obj]: [string, any]) => {
            obj["id"] = key;
            return obj;
          }
        );
        setBoards(returnedLists);
      }
    };
    getData();
  }, [toggle]);

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

    for (let i = 0; lists.length > i; i++) {
      if (lists[i].name === src) lists[i].tasks.splice(srcIndex, 1);
      if (lists[i].name === dest) {
        if (!lists[i].tasks) {
          lists[i]["tasks"] = [];
          lists[i].tasks.splice(destIndex, 0, task);
        } else lists[i].tasks.splice(destIndex, 0, task);
      }
    }
    const newData = {
      lists,
    };
    await realtime.put(`/.json`, newData);
    setToggle((prevToggle) => !prevToggle);
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<DashBoard boards={boards} />} />
        <Route
          path="/board/:id"
          element={
            <DragDropContext onDragEnd={handleDragEnd}>
              <Board boards={boards} setToggle={setToggle} toggle={toggle} />
            </DragDropContext>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
