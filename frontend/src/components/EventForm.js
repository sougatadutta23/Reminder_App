import { useState } from "react"
import { useEventContext } from "../hooks/useEventsContext"
import { useAuthContext } from "../hooks/useAuthContext"


const EventForm = ()=>{
    const [title, setTitle] = useState('')
    const [date, setDate] = useState('2023-10-13')
    const [content, setContent] = useState('')
    const [error, setError] = useState(null)
    const { dispatch } = useEventContext()
    const { user } = useAuthContext()

    const handleSubmit = async(event)=>{
        event.preventDefault()

        if(!user){
            setError('You must be logged in.')
            return
        }

        const createdEvent = {title, date, content}

        const response = await fetch('http://localhost:4000/api/events', {
            method:'POST',
            body: JSON.stringify(createdEvent),
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${user.token}`
            }
        })

        const json = await response.json()

        if(!response.ok){
            setError(json.error)
            console.log(json.error);
        }
        if(response.ok){
            setTitle('')
            setDate('2023-10-13')
            setContent('')
            setError(null)
            console.log('Event added ',json)
            dispatch({type:'CREATE_EVENT', payload: json})
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Event</h3>
            <label>Event Title:</label>
            <input 
                type="text"
                onChange={(event)=>setTitle(event.target.value)}
                value={title}
            />

            <label>Date:</label>
            <input 
                type="date"
                onChange={(event)=>setDate(event.target.value)}
                value={date}
            />

            <label>Content:</label>
            <textarea
            cols={40}
            onChange={(event) => setContent(event.target.value)}
            value={content}
            />

        <button>Add Event</button>
        {error && <div className="error">{error}</div>}
        </form>
    )
}

export default EventForm