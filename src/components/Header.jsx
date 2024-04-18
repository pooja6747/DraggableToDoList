import React, { useState, useEffect } from 'react'
import ToDoList from './ToDoList';
import Modal from './Modal';
import Board from './Board';

const Header = () => {
    // getting the values of local storage
    const getDatafromLS = () => {
        const data = localStorage.getItem("users");
        if (data) {
            return JSON.parse(data);
        } else {
            return [];
        }
    };
    // main array of objects state || books state || books array of objects
    const [users, setUsers] = useState(getDatafromLS());
    // input field states
    // const [id, setId] = useState("");
    const [tname, settname] = useState("");
    // const [lname, setLname] = useState("");
    const [dob, setDob] = useState("");

    // form submit event
    const handleAddBookSubmit = (e) => {

        // e.preventDefault();
        // creating an object
        let user = {
            // id,
            tname,
            dob,
        };
        setUsers([...users, user]);
        // localStorage.setItem("users", JSON.stringify([...users, newUser]));
        window.location.reload(); // Reload the page
        handleCloseModal(); // Close the modal after adding
    };
    // saving data to local storage
    useEffect(() => {
        localStorage.setItem("users", JSON.stringify(users));
    }, [users]);

    const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
    const [isCustomeModalOpen, setisCustomeModalOpen] = useState(false)

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleCustomOpenModal = () => {
        setisCustomeModalOpen(true)
    }

    const handleCustomcloseModal = () => {
        setisCustomeModalOpen(false)
    }

    const [title, settitle] = useState("");
    const [board, setBoard] = useState([])


    const handleNewBoard = () => {
      const newBoardData = { title: title }; 
        setBoard(prevBoard => {
            const updatedBoard = [...prevBoard, newBoardData];
            localStorage.setItem('customData', JSON.stringify(updatedBoard));
        });
    };

   
    const [newboard, setNewBoard] = useState([])
    
    const generateUniqueKey = () => {
        return '_' + Math.random().toString(36).substr(2, 9);
    };

    useEffect(() => {
        const storedBoardData = JSON.parse(localStorage.getItem("customData"));
       
        if (storedBoardData) {
          const storedBoardComponents = storedBoardData.map(data => (
            <Board key={generateUniqueKey()} title={data.title} />
          ));
          setNewBoard(storedBoardComponents);
        }
      }, [newboard]);

    // const storedBoardComponents = board.map(data => <Board key={generateUniqueKey()} title={data.title} />);
    // setNewBoard(storedBoardComponents);


    return (
        <>

            <nav className="navbar navbar-expand-lg navbar-light bg-dark text-white">
                <div className="container-fluid">
                    <a className="navbar-brand text-white" href="#">TODO List</a>
                    <button className="navbar-toggler text-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon text-white"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <form className="d-flex">

                            <button type="button" className="btn btn-outline-success text-white me-0" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                Add TODO
                            </button>
                            <button type="button" className="btn btn-outline-success text-white me-0" data-bs-toggle="modal" data-bs-target="#customModalLabel">
                                Create new BOard
                            </button>
                        </form>
                    </div>
                </div>
            </nav>

            <ToDoList isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />

            <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
            {
                newboard.map((data, index) => (
                    <div key={index}>
                        {data}
                    </div>
                ))
            }

            {/* custom modal */}

            <div className={`modal fade ${isCustomeModalOpen ? 'true' : ''}`} id="customModalLabel" tabindex="-1" aria-labelledby="customModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="customModalLabel">New Board</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form
                                autoComplete="off"
                                className="form-group"

                            >
                                <br></br>
                                <label>Enter board title</label>
                                <input
                                    type="text"
                                    placeholder='Enter board title'
                                    className="form-control"
                                    required
                                    onChange={(e) => settitle(e.target.value)}
                                    value={title}
                                ></input>
                                <br></br>

                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleNewBoard} data-bs-dismiss="modal">CREATE</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header