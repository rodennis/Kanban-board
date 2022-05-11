import { FC, useState } from "react";
import realtime from "../../firebase/realtime";
import './CreateList.scss'
import {useParams} from 'react-router-dom'

interface handleSubmit {
  setToggle: (toggle: boolean) => void;
  toggle: boolean;
}

const CreateList: FC<handleSubmit> = ({
  setToggle,
  toggle,
}) => {

  const [listName, setListName] = useState<string>("");
  const params = useParams()

  class List {
    name: string;
    constructor(name: string) {
      this.name = name;
    }
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const newList = new List(listName);
    const data = {
      lists: [
        newList
      ]
    }
    await realtime.patch(`/boards/${params.id}.json`, data);
    setListName("");
    setToggle(!toggle)
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

export default CreateList