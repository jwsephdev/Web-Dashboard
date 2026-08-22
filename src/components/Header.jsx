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

  return(
    <div className='container'>
      <div className='container'>
      <div className='input-group'>
        <span class="input-group-text" id="basic-addon1">Title</span>
        <input 
        className='form-control'
        type='text'
        placeholder='Title..'
        value={newTitle}
        onChange={(e) => handleInputChange(e, setNewTitle)}
        />
      </div>


      <div className='input-group'>
      <span class="input-group-text" id="basic-addon1">Role</span>
      <input 
      className='form-control'
      type='text'
      placeholder='Role..'
      value={newRole}
      onChange={(e) => handleInputChange(e, setNewRole)}
      />

      <span class="input-group-text" id="basic-addon1">Location</span>
      <input
      className='form-control'
      type='text'
       placeholder='Location..'
       value={newLocation}
       onChange={(e) => handleInputChange(e, setNewLocation)}
      />
      </div>

      <div className='input-group'>
      <span class="input-group-text" id="basic-addon1">Deadline</span>

      <input 
      className='form-control'
      type='date'
      value={newDate}
      onChange={(e) => handleInputChange(e, setNewDate)}
      className='[&::-webkit-calendar-picker-indicator]:hidden'
      />
      </div>
      <div className='text-center'>
        <button onClick={addEntry} className="btn btn-primary w-25">Add</button>
      </div>
      
    </div>

    <div className='row m-0 p-0 gap-0'>
      <div className='col'>
      <h6>Pending: {pendingCount}</h6>
      </div>
      <div className='col'>
      <h6>In Progress: {inProgressCount}</h6>
      </div>
      <div className='col'>
      <h6>Completed: {completedCount}</h6>
      </div>
    </div>
    <div className='container'>
      
    

      <div className='card'>
        <div className="card-body">
        <ol>
        {items.map((item, index) =>
           <li key={index}> 
           <h3 className='card-title'>{item.title}</h3> <br/>
           <h4 className='card-subtitle text-body-secondary'>{item.role}</h4> <br/>
           <p class="card-text">Location: {item.location}</p> <br/>
           <p class="card-text">Deadline: {item.date}</p> <br/>
           <ChangeStatus
              status={item.status}
              onChange={(newStatus) => updateStatus(index, newStatus)}
            />
           </li>)}
      </ol>
      </div>
      </div>
    </div>
    </div>
  )
}

export default Header
