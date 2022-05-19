import React, { FC, useState } from "react";
import { Link } from "react-router-dom";
import realtime from "../../firebase/realtime";
import "../../main.scss";

interface Props {
  boards: {
    name: string;
    id: string;
    lists: object[];
  }[];
  setToggle: (toggle: boolean) => void;
  toggle: boolean
}

const DashBoard: FC<Props> = ({ boards, setToggle, toggle }) => {
  const [board, setBoard] = useState<string>("");

  const createNewBoard = async (event: any) => {
    event.preventDefault();
    try {
      console.log('hello')
      const data = {
        name: board,
      };
      await realtime.post("/boards.json", data);
      setToggle(!toggle)
    } catch (error) {
      console.log("board not created " + error);
    }
  };

  const handleBoardName = (event: any) => {
    setBoard(event.target.value);
  };

  return (
    <div className="dashboard-container">
      <form onSubmit={e => createNewBoard(e)}>
        <input
          type="text"
          placeholder={"add a board"}
          value={board}
          onChange={(event) => handleBoardName(event)}
        />
        <button>Submit</button>
      </form>
      <div className="boards-container">
        {boards.map((board) => {
          return (
            <Link style={{textDecoration: 'none'}} to={`/board/${board.id}`} key={board.id}>
              <div className="board-card">
                <h2>{board.name}</h2>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default DashBoard;
