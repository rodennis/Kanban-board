import { FC, useState } from "react";
import realtime from "../../firebase/realtime";

interface Props {
  lists: {
    id: string;
    name: any;
    tasks: string[];
  }[];
  setToggle: (toggle: boolean) => void;
  toggle: boolean;
}

export const Board: FC<Props> = ({ lists, setToggle, toggle }) => {
  const [task, setTask] = useState<string>("");

  const handleTask = async (oldTask: string[], key: string) => {
    const data = {
      tasks: [...(oldTask || []), task],
    };
    try {
      await realtime.patch(`/lists/${key}.json`, data);
      setToggle(!toggle);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="list-container">
      {lists.map((list) => (
        <div className="list-div" key={list.id}>
          <h1>{list.name}</h1>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              handleTask(list.tasks, list.id);
            }}
          >
            <input
              type="text"
              onChange={(event) => setTask(event.target.value)}
            />
            <button>Add Task</button>
          </form>
          {list.tasks?.map((task) => (
            <div>
              <h2>{task}</h2>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
