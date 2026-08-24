import { useState } from 'react'

function Header() {

  const [items, setItems] = useState([]);

  
  const [newTitle, setNewTitle] = useState("")
  const [newRole, setNewRole] = useState("")
  const [newLocation, setNewLocation] = useState("")
  const [newDate, setNewDate] = useState("")

  const pendingCount = items.filter((item) => item.status === "Pending").length
  const inProgressCount = items.filter((item) => item.status === "In Progress").length
  const completedCount = items.filter((item) => item.status === "Completed").length


  function ChangeStatus({status , onChange}) {
    return (
    <div>
        <div className="dropdown">
        <a className="btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          {status}
        </a>

        <ul className="dropdown-menu">
          <li><button className="dropdown-item" onClick={() => {onChange("Pending"); setOpenMenuBar((prev) => !prev)}}>Pending</button></li>
          <li><button className="dropdown-item" onClick={() => {onChange("In Progress"); setOpenMenuBar((prev) => !prev)}}>In Progress</button></li>
          <li><button className="dropdown-item" onClick={() => {onChange("Completed"); setOpenMenuBar((prev) => !prev)}}>Completed</button></li>
        </ul>
      </div>
    </div>
    )
  } 

  function handleInputChange(event, setter) {
    setter(event.target.value)
  }

  const addItem = (value, setItems, setValue) => {
  if (
    newTitle.trim() === "" ||
    newRole.trim() === "" ||
    newLocation.trim() === "" ||
    newDate.trim() === ""
  ) { return;
  }

  setItems((prev) => [...prev, value.trim()]);
  setValue("");
};

  const addEntry = () => {
    if (
      newTitle.trim() === "" ||
      newRole.trim() === "" ||
      newDate.trim() === ""
    ) {
      return
    }

    setItems((prev) => [...prev,
      {
        title: newTitle.trim(),
        role: newRole.trim(),
        location: newLocation.trim() == "" ? "N/A" : newLocation.trim(),
        date: newDate.trim(),
        status: "Pending",
      },
    ])
    setNewTitle("")
    setNewRole("")
    setNewLocation("")
    setNewDate("")
  }

  const updateStatus = (index, newStatus) => {
  setItems((prev) =>
    prev.map((item, i) =>
      i === index ? { ...item, status: newStatus } : item
    )
  )
}

const deleteItem = (index) => {
  setItems((prev) => prev.filter((_, i) => i !== index))
}

  return(
    <div>
      <nav className='navbar navbar-expand-lg bg-body-tertiary'>
        <div className='container-fluid d-flex justify-content-center'>
            <h1 className='navbar-brand '>JUST A DASHBOARD</h1>
        </div>
        
      </nav>
      
      <div className='d-flex justify-content-center m-3'>
        <h2>Create a task...</h2>
      </div>
      
      <div className='container'>
      <div className='input-group mb-3 mt-3'>
        <span class="input-group-text" id="basic-addon1">Title <span className='text-secondary'>(Required)</span></span>
        <input 
        className='form-control'
        type='text'
        placeholder='Title..'
        value={newTitle}
        onChange={(e) => handleInputChange(e, setNewTitle)}
        />
      </div>


      <div className='input-group mb-3'>
      <span class="input-group-text" id="basic-addon1">Role<span className='text-secondary'>(Required)</span></span>
      <input 
      className='form-control'
      type='text'
      placeholder='Role..'
      value={newRole}
      onChange={(e) => handleInputChange(e, setNewRole)}
      />

      
      </div>

      <div className='d-flex flex-sm-row flex-column'>

        <div className='d-flex flex-row flex-sm-column col-sm-6 mb-3'>

        <div className='input-group date'>
        <span class="input-group-text" id="basic-addon1">Deadline<span className='text-secondary'>(Required)</span></span>
        <input 
        className='form-control form-control-sm'
        id='dateIcon'
        type='date'
        value={newDate}
        onChange={(e) => handleInputChange(e, setNewDate)}
        />
      
      </div>
      </div>

      <div className='d-flex flex-row flex-sm-column col-sm-6'>
        <div className='input-group mb-3'>
      <span class="input-group-text" id="basic-addon1">Location</span>
      <input
      className='form-control'
      type='text'
       placeholder='Location..'
       value={newLocation}
       onChange={(e) => handleInputChange(e, setNewLocation)}
      />
      </div>
      </div>
      


     
      
      </div>
      <div className='d-flex justify-content-center mb-5'>
        <button onClick={addEntry} className="btn btn-primary w-50">Add Task</button>
      </div>
    </div>


      <div className='container'>
      <div className='d-flex flex-column align-items-center align-items-sm-stretch flex-sm-row justify-content-center justify-content-sm-evenly '>

      <p>Pending:{pendingCount}</p>
      <p>In Progress:{inProgressCount}</p>
      <p>Completed:{completedCount}</p>

    </div>
    </div>
    
    <div className='container'>
        <hr />
    </div>
    
    <div className='container'>
      
      <div>
        <div>
        <ol className='list-unstyled'>
        {items.map((item, index) =>

          <li key={index}> 
          
          <div className='card w-auto mb-3 mt-3 border-1 bg-body-tertiary'>
          <div className="card-body">
            <div className='row'>

              <h2 className='card-title mb-2'>{item.title}</h2> <br/>
              <h5 className='card-subtitle mb-1'>{item.role}</h5> <br/>
              <h5 className="card-text mb-1">Deadline: {item.date}</h5> <br/>
              <h5 className="card-text">Location: {item.location}</h5> <br/>

            <div className='d-flex'>
              <div className='col'>
                <ChangeStatus status={item.status} onChange={(newStatus) => updateStatus(index, newStatus)}/>
              </div>
              <div className='col'>
                  <button onClick={() => deleteItem(index)} className="btn btn-danger">Delete</button>
              </div>
            </div>
            


          </div>
          </div>
          </div>
          </li>)}
      </ol>
      </div>
      </div>
    </div>
    </div>
  )
}

export default Header
