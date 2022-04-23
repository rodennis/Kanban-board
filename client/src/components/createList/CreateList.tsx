import { FC } from "react";
import realtime from "../../firebase/realtime";

interface handleSubmit {
  setListName: (event: any) => void;
  listName: string;
  setToggle: (toggle: boolean) => void
  toggle: boolean
}

export const CreateList: FC<handleSubmit> = ({ setListName, listName, setToggle, toggle }) => {
  class List {
    name: string;
    constructor(name: string) {
      this.name = name;
    }
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const newList = new List(listName);
    await realtime.post("/lists.json", newList);
    setToggle(!toggle)
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(event) => setListName(event.target.value)}
        />
        <button>Submit</button>
      </form>
    </div>
  );
};
