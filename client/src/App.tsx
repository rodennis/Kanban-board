import React, { FC, useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.scss";
import { Board } from "./components/board/Board";
import "./firebase/firebase";
import realtime from "./firebase/realtime";
import DashBoard from "./components/DashBoard/Dashboard";

type Boards = {
  name: string;
  lists: object[];
  id: string;
};

const App: FC = () => {

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

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<DashBoard boards={boards} />} />
        <Route path="/board/:id" element={<Board boards={boards} setToggle={setToggle} toggle={toggle} />}/>
      </Routes>
    </div>
  );
};

export default App;
