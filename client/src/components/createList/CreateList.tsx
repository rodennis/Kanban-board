import { FC, useState, useEffect } from "react";
import realtime from "../../firebase/realtime";
import { useParams } from "react-router-dom";
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
  name: string;
  lists: any;
  id: string;
}

const CreateList: FC<Props> = ({ setToggle, toggle, boards }) => {
  const [listName, setListName] = useState<string>("");
  const [foundBoard, setFoundBoard] = useState<FoundBoard>();
  const params = useParams();

  class List {
    name: string;
    constructor(name: string) {
      this.name = name;
    }
  }

  useEffect(() => {
    if (boards) {
      let res = boards.find((board) => {
        return board.id === params.id;
      });
      setFoundBoard(res);
    }
  }, [boards, params.id]);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const newList = new List(listName);
    if (foundBoard?.lists) {
      const data = {
        lists: [...foundBoard?.lists, newList],
      };
      await realtime.patch(`/boards/${params.id}.json`, data);
    } else {
      const data = {
        lists: [newList],
      };
      await realtime.patch(`/boards/${params.id}.json`, data);
    }
    setListName("");
    setToggle(!toggle);
  };

  return (
    <div>
      <h1 className="list-title">Create new List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(event) => setListName(event.target.value)}
          value={listName}
          placeholder="Add List..."
          className="add-list-input"
        />
        <button className="add-list-submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateList;
