import { useState } from "react";

const Form = ({addTask}) => {

    const [title,setTitle] = useState('');


    const handleChange = (e) =>  {
        setTitle(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        addTask(title)
        setTitle('');
    }


    return (
        <div className="form-container">
            <h2 className="heading">Task Manager</h2>
            <form onSubmit={handleSubmit}>
                <input placeholder="e.g. Attend the meeting"onChange={handleChange} value={title} type="text"/>
                <button>Add Task</button>
            </form>
        </div>
    )
}

export default Form;