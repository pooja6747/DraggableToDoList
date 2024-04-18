import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const Board = ({ title }) => {
    const getDatafromLS = () => {
        const data = localStorage.getItem('users');
        return data ? JSON.parse(data).map((user, index) => ({
            ...user,
            id: `${user.id}_${index}`, // Ensure each task has a unique ID
        })) : [];
    };

    const [tasks, setTasks] = useState({
        customeBoard: getDatafromLS(), // Use a specific key if your data is structured that way
    });

    useEffect(() => {
        localStorage.setItem('users', JSON.stringify(tasks.customeBoard)); // Sync state to local storage
    }, [tasks]);

    const deleteUser = (id) => {
        const updatedTasks = {
            ...tasks,
            customeBoard: tasks.customeBoard.filter(task => task.id !== id),
        };
        setTasks(updatedTasks);
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
            [droppableDestination.droppableId]: destClone,
        };
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="container-fluid mt-5 px-5">
                <div className="row">
                    {Object.keys(tasks).map(key => (
                        <div className="col-md-3" key={key}>
                            <div className="card bg-dark text-white">
                                <div className="card-header"><h3>{title}</h3></div>
                                <Droppable droppableId={key}>
                                    {(provided) => (
                                        <div {...provided.droppableProps} ref={provided.innerRef} className="card-body">
                                            {tasks[key].map((task, index) => (
                                                <Draggable key={task.id} draggableId={task.id} index={index}>
                                                    {(provided) => (
                                                        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="mb-3">
                                                            <div className="card-body">
                                                                <p>{task.tname}</p>
                                                                <span>{task.dob}</span><br />
                                                                <button onClick={() => deleteUser(task.id)}>DELETE</button>
                                                                
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

export default Board;
