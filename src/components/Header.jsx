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
    const [statusMenuBar, setOpenMenuBar] = useState(false)
    const toggleVisibility = () => setOpenMenuBar((prev) => !prev) 
    return (
    <div>

      <button onClick={toggleVisibility}>{status}</button>

      {statusMenuBar && (
        <div> 
        <button onClick={() => {onChange("Pending"); setOpenMenuBar((prev) => !prev)}}  >Pending</button>
        <button onClick={() => {onChange("In Progress"); setOpenMenuBar((prev) => !prev)}}  >In Progress</button>
        <button onClick={() => {onChange("Completed"); setOpenMenuBar((prev) => !prev)}}>Completed</button>
      </div>
      )}
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
    <div>
      

      <input type='text'
       placeholder='Title..'
       value={newTitle}
       onChange={(e) => handleInputChange(e, setNewTitle)}
      />

      <input type='text'
       placeholder='Role..'
       value={newRole}
       onChange={(e) => handleInputChange(e, setNewRole)}
      />

      <input type='text'
       placeholder='Location..'
       value={newLocation}
       onChange={(e) => handleInputChange(e, setNewLocation)}
      />

      <p>Deadline:</p>

      <input type='date'
      value={newDate}
      onChange={(e) => handleInputChange(e, setNewDate)}
      className='[&::-webkit-calendar-picker-indicator]:hidden'
      />

      <button onClick={addEntry}>Add</button>


    <div>
      <h1>Pending: {pendingCount}</h1>
      <h1>In Progress: {inProgressCount}</h1>
      <h1>Completed: {completedCount}</h1>
    </div>
      <div>
        <ol>
        {items.map((item, index) =>
           <li key={index}> 
           <span>Title: {item.title}</span> <br/>
           <span>Role: {item.role}</span> <br/>
           <span>Location: {item.location}</span> <br/>
           <span>Deadline: {item.date}</span> <br/>
           <ChangeStatus
              status={item.status}
              onChange={(newStatus) => updateStatus(index, newStatus)}
            />


           </li>)}
          
      </ol>
      </div>

    </div>
  )
}

export default Header
