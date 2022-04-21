import { FC } from "react";

interface Lists {
  lists: listItems[];
}
interface listItems {
  key: string;
  name: any;
}
// why do i have to define listItems interface in here as well as in app.tsx

export const Board: FC<Lists> = ({ lists }) => {
  return (
    <div>
      {lists.map((list) => (
        <div>
          <h1>{list.name.name}</h1>
        </div>
      ))}
    </div>
  );
};
