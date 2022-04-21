import { FC } from 'react'
import realtime from '../../firebase/realtime'

interface handleSubmit {
    setListName: (event: any) => void
    listName: string
  }

export const CreateList:FC<handleSubmit> = ({ setListName, listName}) => {

    class List {
        list: any;
        name: string;
        constructor(name: string) {
          this.list = []
          this.name = name
        }
    
        // addItem(val:string, ){
    
        // }
      }

      const handleSubmit = async (event: any) => {
        event.preventDefault()
        const newList = new List(listName)
        await realtime.post('/lists.json', newList)
      }

  return (
    <div>
        <form onSubmit={handleSubmit}>
      <input type="text" onChange={event => setListName(event.target.value)}/>
      <button>Submit</button>
      </form>
    </div>
  )
}
