import { EventsContext } from "../context/EventsContext";
import { useContext } from "react";

export const useEventContext = ()=>{
    const context = useContext(EventsContext)

    if(!context)
        throw Error('useEventsContext must be within the scope of the context provider')

    return context
}