import './styles/styles.css';
import Form from './components/form';
import axios from 'axios';
import { useState } from 'react';
import List from './components/list';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {

    const [task,setTask] = useState([]);

    const showToastMessage = (op) => {

        let content = '';

        if(op === 'create') content = 'Task created Successfully';

        if(op === 'delete') content = 'Task Deleted Successfully';

        if(op === 'update') content = 'Task Updated Successfully';

        toast.success(content, {
            position: toast.POSITION.TOP_CENTER,
            autoClose:3000,
            theme:'light',
            className:'toast-message'
        });
    }

    const addTask = async (title) => {

        await axios.post('http://localhost:5000/api/v1/tasks',{
        title
       })
       .then((response) =>
        {
             showToastMessage('create');
             setTask([...task,response.data])
             
        });
    }

    const updataTask = async (data) => {

        const {_id:id} = data;
        const url = `http://localhost:5000/api/v1/tasks/${id}`;
        await axios.patch(url,data)
                    .then(() => {
                        showToastMessage('update');
                      setTask([...task])
                    })
    }

    const deleteTask = async (id) => {

        const url = `http://localhost:5000/api/v1/tasks/${id}`;
        const updatedTask = task.filter((el) => el._id !== id);
        await axios.delete(url)
                   .then(() => {
                    showToastMessage('delete')
                    setTask(updatedTask)
                   });  
    }

    const onLoad = (data) => {
    
        console.log('onload')
        setTask([...task,...data]);
    }

    
    return (
        <div className='app-container'>
            <ToastContainer/>
            <Form addTask={addTask} />
            <List onLoad={onLoad} onDelete={deleteTask} onUpdate={updataTask} task={task}/>
        </div>
    )

}

export default App;