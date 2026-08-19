import { useState } from 'react'

function Header() {

  function ChangeStatus() {
    const [taskStatus, setTaskStatus] = useState("Pending")
    const [statusMenuBar, setOpenMenuBar] = useState(false)
    const toggleVisibility = () => setOpenMenuBar((prev) => !prev) 

    return (
    <div className='flex flex-col'>

      <button className=' bg-green-500 w-40 h-10 rounded hover:bg-green-600 transition-all ease' onClick={toggleVisibility}>{taskStatus}</button>

      {statusMenuBar && (
        <div className='flex flex-col w-fit bg-gray-200 rounded-b-2xl'> 
        <button onClick={() => {setTaskStatus("Pending"); setOpenMenuBar((prev) => !prev)}} className=' w-40 h-10 hover:bg-gray-400 transition-all ease' >Pending</button>
        <button onClick={() => {setTaskStatus("In Progress"); setOpenMenuBar((prev) => !prev)}} className=' w-40 h-10 hover:bg-gray-400 transition-all ease' >In Progress</button>
        <button onClick={() => {setTaskStatus("Completed"); setOpenMenuBar((prev) => !prev)}} className=' w-40 h-10 hover:bg-gray-400 transition-all ease'>Completed</button>
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

  const [items, setItems] = useState([]);
  const [newTitle, setNewTitle] = useState("")
  const [newRole, setNewRole] = useState("")
  const [newLocation, setNewLocation] = useState("")
  const [newDate, setNewDate] = useState("")


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
        <ol>
        {items.map((item, index) =>
           <li key={index}> 
           <span>Title: {item.title}</span> <br/>
           <span>Role: {item.role}</span> <br/>
           <span>Location: {item.location}</span> <br/>
           <span>Deadline: {item.date}</span> <br/>
           <ChangeStatus />

           </li>)}
          
      </ol>
        
      </div>

    </div>
  )
}

export default Header
