import React, { FC, useState, useEffect } from "react";
import "./App.css";
import { Board } from "./components/board/Board";
import { CreateList } from "./components/createList/CreateList";
import "./firebase/firebase";
import realtime from "./firebase/realtime";
import {DragDropContext} from 'react-beautiful-dnd'


const App: FC = () => {
  type Lists = {
    id: string
    tasks: string[]
    name: string;
  }
  const [listName, setListName] = useState<string>("");
  const [lists, setLists] = useState<Lists[]>([]);
  const [toggle, setToggle] = useState<boolean>(false)

  useEffect(() => {
    const getData = async () => {
      const res = await realtime.get("/lists.json");
      const data = res?.data;
      if (data !== null) {
        const returnedLists = Object.entries(data).map(([key ,obj]: [string, any]) => {
          obj.id = key 
          return obj
        });
        setLists(returnedLists)
      }
    };
    getData();
  }, [toggle]);

  return (
    <div className="App">
      <CreateList setListName={setListName} listName={listName} setToggle={setToggle} toggle={toggle}/>
      <DragDropContext onDragEnd={e => {console.log(e)}}>
      <Board lists={lists} setToggle={setToggle} toggle={toggle}/>
      </DragDropContext>
    </div>
  );
};

export default App;
