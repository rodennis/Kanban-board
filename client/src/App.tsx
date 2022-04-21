import React, { FC, useState, useEffect } from 'react';
import './App.css';
import { CreateList } from './components/createList/CreateList';
import './firebase/firebase'
import realtime from './firebase/realtime';

interface listItems {
  key: string
  name:any
}

const App: FC = () => {


  const [listName, setListName] = useState<string>('')
  const [lists, setLists] = useState<listItems[]>([])

  useEffect(() => {
    const getData = async () => {
      const res = await realtime.get('/lists.json')
      const data = res?.data
      if (data !== null) {
        const returnedLists = Object.entries(data).map(
          ([key, name]) => ({
            key,
            name
          })
        );
        setLists(returnedLists);
      }
    }
    getData()
  });
  
  return (
    <div className="App">
      <CreateList setListName={setListName} listName={listName}/>
      {
        lists.map(item => (
          <div>
            <h1>{item.name.name}</h1>
          </div>
        ))
      }
    </div>
  );
}

export default App;