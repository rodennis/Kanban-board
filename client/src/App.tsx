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

  const handleDragEnd = async (data:any)  => {
    if(data.destination === null) return
    if(data.destination.index === data.source.index && data.destination.droppableId === data.source.droppableId) return
    const dest = data.destination.droppableId
    const destIndex = data.destination.index
    const src = data.source.droppableId
    const srcIndex = data.source.index
    const task = data.draggableId
    console.log(data)
    for(let i = 0; lists.length > i; i++){
      if(lists[i].name === dest){
        if(!lists[i].tasks){
          lists[i]["tasks"] = []
          lists[i].tasks.splice(destIndex, 0, task)
        }else {
          lists[i].tasks.splice(destIndex, 0, task)
        }
      }
      if(lists[i].name === src){
        lists[i].tasks.splice(srcIndex, 1)
      }
    }
    // let movedTask:any = ''
    // for(let i = 0; lists.length > i; i++) {
    //   if(lists[i].tasks.length > 0){
    //   for(let k = 0; lists[i].tasks.length > k; k++){
    //       if(lists[i].tasks[k] === data.draggableId){
    //         movedTask = lists[i].tasks && lists[i].tasks.find((task:string) => {
    //           return task === data.draggableId
    //         })
    //       }
    //     }
    //   }
    // }
    
    // if(movedTask){
    //   const data = {
    //       tasks: [
    //         movedTask
    //       ]
    //   }
      // const doto = {lists}
      // const res = await realtime.puts(`/.json`, doto)
    //   console.log(res);

    // }
  }

  return (
    <div className="App">
      <CreateList setListName={setListName} listName={listName} setToggle={setToggle} toggle={toggle}/>
      <DragDropContext onDragEnd={handleDragEnd}>
      <Board lists={lists} setToggle={setToggle} toggle={toggle}/>
      </DragDropContext>
    </div>
  );
};

export default App;
