import axios from "axios"
import { useEffect } from "react"
import ShowTask from "./showtask"

const List = ({task,onLoad,onUpdate,onDelete}) => {

    const fetch = async () => {

        await axios.get('http://localhost:5000/api/v1/tasks/')
        .then((response) => {
            onLoad(response.data)
        })
    }

    useEffect(() => {

        fetch()
        
    },[])

    const taskList = task.map((ele) => {

        return <ShowTask key={ele._id} data={ele} onUpdate={onUpdate} onDelete={onDelete} />
    })

    return (
        <div className="task-list-container">
          {taskList}
        </div>
    )
}

export default List;