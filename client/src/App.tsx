import React, { FC, useState, useEffect } from "react";
import "./App.css";
import { Board } from "./components/board/Board";
import { CreateList } from "./components/createList/CreateList";
import "./firebase/firebase";
import realtime from "./firebase/realtime";

interface listItems {
  key: string;
  name: any;
}

const App: FC = () => {
  const [listName, setListName] = useState<string>("");
  const [lists, setLists] = useState<listItems[]>([]);

  useEffect(() => {
    const getData = async () => {
      const res = await realtime.get("/lists.json");
      const data = res?.data;
      if (data !== null) {
        const returnedLists = Object.entries(data).map(([key, name]) => ({
          // why want it let me destructure name?
          // why does it want name to be a type of any instead of string?
          key,
          name,
        }));
        setLists(returnedLists);
      }
    };
    getData();
  });

  return (
    <div className="App">
      <CreateList setListName={setListName} listName={listName} />
      <Board lists={lists} />
    </div>
  );
};

export default App;
