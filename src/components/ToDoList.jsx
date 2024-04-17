import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const ToDoList = () => {
  const getDatafromLS = () => {
    const data = localStorage.getItem("users");
    if (data) {
        const parsedData = JSON.parse(data);
        // Assuming each task object has a unique property called 'id'
        return parsedData.map((user, index) => ({
            ...user,
            id: `${user.id}_${index}` // Creating a unique id for each task
        }));
    } else {
        return [];
    }

       
    
};


    const [tasks, setTasks] = useState({
        toDo: getDatafromLS(),
        doing: [],
        done: []
    });


    

    const deleteUser = (id) => {
        const newTasks = { ...tasks };
        Object.keys(newTasks).forEach(key => {
            newTasks[key] = newTasks[key].filter(task => task.id !== id);
        });
        setTasks(newTasks);
        localStorage.setItem('users', JSON.stringify(newTasks.toDo)); // Assuming 'toDo' is your main list
    };

    const onDragEnd = (result) => {
        const { source, destination } = result;
        if (!destination) return;

        if (source.droppableId === destination.droppableId) {
            const items = reorder(tasks[source.droppableId], source.index, destination.index);
            setTasks(prev => ({ ...prev, [source.droppableId]: items }));
        } else {
            const result = move(tasks[source.droppableId], tasks[destination.droppableId], source, destination);
            setTasks(prev => ({
                ...prev,
                [source.droppableId]: result[source.droppableId],
                [destination.droppableId]: result[destination.droppableId]
            }));

        }
    };

    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
    };

    const move = (source, destination, droppableSource, droppableDestination) => {
        const sourceClone = Array.from(source);
        const destClone = Array.from(destination);
        const [removed] = sourceClone.splice(droppableSource.index, 1);
        destClone.splice(droppableDestination.index, 0, removed);
        return {
            [droppableSource.droppableId]: sourceClone,
            [droppableDestination.droppableId]: destClone
        };
    };

 
    console.log("Rendering tasks:", tasks);


    return (
        <DragDropContext onDragEnd={onDragEnd} >
            <div className="container-fluid mt-5 px-5">
                <div className="row">
                    {Object.keys(tasks).map((key) => (
                        <div className="col-md-4" key={key}>
                            <div className="card bg-dark text-white">
                                <div className="card-header"><h3>{key.replace(/^./, key[0].toUpperCase())}</h3></div>
                                <Droppable droppableId={key} key={key}>
                                    {(provided) => (
                                        <div {...provided.droppableProps} ref={provided.innerRef} className="card-body">
                                            {tasks[key].map((task, index) => (
                                                <Draggable key={task.id} draggableId={task.id} index={index}>
                                                    {(provided) => (
                                                        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="mb-3">
                                                            <div className="card-body">
                                                                <p>{task.tname}</p>
                                                                <span>{task.dob}</span><br />
                                                            </div>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </DragDropContext>
    );
}

export default ToDoList;
