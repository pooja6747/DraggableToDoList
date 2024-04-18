import React,{useState,useEffect} from 'react'

const Modal = ({isModalOpen,setIsModalOpen}) => {

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

        e.preventDefault();
        // creating an object
        let user = {
            // id,
            tname,
            dob,
        };
        setUsers([...users, user]);
        // localStorage.setItem("users", JSON.stringify([...users, newUser]));
        console.log("add to do work", users)
        window.location.reload(); // Reload the page
        handleCloseModal(); // Close the modal after adding
    };
    // saving data to local storage
    useEffect(() => {
        localStorage.setItem("users", JSON.stringify(users));
    }, [users]);

    // const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

  return (
    <div  className={`modal fade ${isModalOpen ? 'true' : ''}`} id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog">
        <div className="modal-content">
            <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Create To Do</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <form
                    autoComplete="off"
                    className="form-group"

                >
                    <br></br>
                    <label>Task For TODO</label>
                    <input
                        type="text"
                        className="form-control"
                        required
                        onChange={(e) => settname(e.target.value)}
                        value={tname}
                    ></input>
                    <br></br>

                    <br></br>
                    <label>Deadline</label>
                    <input
                        type="date"
                        className="form-control"
                        required
                        onChange={(e) => setDob(e.target.value)}
                        value={dob}
                    ></input>
                    <br></br>
                </form>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary" onClick={handleAddBookSubmit} data-bs-dismiss="modal">ADD</button>
            </div>
        </div>
    </div>
</div>
  )
}

export default Modal