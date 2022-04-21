import axios from 'axios'
export default axios.create(
    {
        baseURL: 'https://kanban-board-6766f-default-rtdb.firebaseio.com/'
    }
)