import { useEventContext } from "../hooks/useEventsContext";
import { useAuthContext } from "../hooks/useAuthContext";

//date-fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { format } from 'date-fns';

const EventDetails =(({event})=>{
    const { dispatch } = useEventContext()
    const { user } = useAuthContext()

    const handleClick = async () => {

        if(!user)
            return
        
        const response = await fetch('http://localhost:4000/api/events/'+event._id,{
            method: 'DELETE',
            headers:{
                'Authorization':`Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if(response.ok)
            dispatch({type:'DELETE_EVENT', payload:json})
    }    

    return (
        <div className="workout-details">
            <h4>{event.title}</h4>
            <p><strong>Date: </strong>{format(new Date(event.date), 'yyyy-MM-dd')}</p>
            <p><strong>Content:</strong> {event.content}</p>
            <p>{formatDistanceToNow(new Date(event.createdAt), {addSuffix: true})}</p>
            <span className="material-symbols-outlined" onClick={handleClick}><i class="fa-solid fa-trash"></i></span>
        </div>
    );
})

export default EventDetails;