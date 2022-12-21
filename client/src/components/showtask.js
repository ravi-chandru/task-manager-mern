import { useRef, useState,useEffect } from "react";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
const ShowTask = ({data,onUpdate,onDelete}) => {

    const Ref = useRef(null);

    useEffect(() => {
      Ref.current.checked = checked;
    })

    const [checked,setChecked] = useState(data.completed);

    const [isEdit,setIsEdit] = useState(false);

    const [newTitle,setNewTitle] = useState(data.title);

    const handleCheck = (e) => {

        setChecked(!checked);
        e.target.checked = !checked;
        data.completed = !checked;
        onUpdate(data)
    }

    let style = {
      textDecoration:'none'
    };

    if(data.completed){
       style.textDecoration = 'line-through'
    }

    const handleChange = (e) => {
      setNewTitle(e.target.value);
    }

    const handleKey = (e) => {

      if(e.key === 'Enter'){ 
        data.title = newTitle;
        onUpdate(data);
        setIsEdit(!isEdit);
      }

    }

    return (
        <div className="show-task-container">
          <input ref={Ref} type="checkbox" onChange={handleCheck} />
          {isEdit ? 
           <input value={newTitle} onKeyPress={handleKey} onChange={handleChange} type="text" /> :
           <h2 style={style} className="title">{data.title}</h2>
           } 
          <div className="icon-container">
          <FiEdit className="edit" onClick={() => setIsEdit(!isEdit)}/>
          <RiDeleteBin6Line onClick = {() => onDelete(data._id)}className="delete"/>
          </div>
        </div>
    )
}

export default ShowTask;