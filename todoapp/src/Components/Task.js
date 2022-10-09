import React,{useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import{faCircleCheck,faTrashCan} from '@fortawesome/free-solid-svg-icons';
import '../Styles/Task.css'

function Add() {
    //Tasks state
    const [toDo, setToDo] = useState([
        {"id":1,"title":"SRT Marathon","status":false},
        {"id":2,"title":"Manipal Marathon","status":false}
    ]);

    //temp state
    const[newTask, setNewTask] = useState('');
  
    //Add task
    const addTask = () => {
      if(newTask) {
        let num = toDo.length + 1;
        let newEntry = { id : num, title : newTask, status : false}
          setToDo([...toDo,newEntry])
          setNewTask('');
      }
    }
  
    //Delete task
    const deleteTask = id => {
      let newTasks = toDo.filter(task => task.id !== id)
        setToDo(newTasks);
    }
  
    //Mark task as done 
    const markDone = id => {
      let newTask = toDo.map( task => {
        if(task.id === id) {
          return ({...task, status : !task.status})
        }
        return task;
      })
      setToDo(newTask);
    } 
    return (
      <div>
        {/* ADD TASK */}
        <div className='row'>
	        <div className='col'>
            <input value={newTask} onChange={ event => setNewTask(event.target.value) } className='form-control form-control-lg'/>
	        </div>
	        <div className='col-auto'>
		        <button onClick={addTask} className='btn btn-lg btn-success'>Add Task</button>
	      </div>
      </div>
      <br />
      {toDo && toDo.length ? '' :'No Tasks...'}
      
      {toDo && toDo
        .sort((Task1,Task2) =>Task1.id > Task2.id ? 1: -1)
          .map( (task, index)=>{
              return(
                <React.Fragment key={task.id}>
                  <div className='col taskBg'>
                    <div className={task.status ? 'done' : ''}>
                      <span className='taskNumber' > {index + 1}</span>
                      <span className='taskText' > {task.title}</span>
                    </div>
                    <div className='iconsWrap'>
                        <span title='Completed' className='complete' onClick={() => markDone(task.id)}><FontAwesomeIcon icon={faCircleCheck}/></span>
                        {task.status ? null :(
                        <span title='Delete' className='delete' onClick={() => deleteTask(task.id)}><FontAwesomeIcon icon={faTrashCan}/></span>)}
                    </div>
                  </div>
                </React.Fragment>
              )
            })
        }
      </div>
    )
  }

export default Add