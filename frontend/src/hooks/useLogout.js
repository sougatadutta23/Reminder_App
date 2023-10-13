import { useAuthContext } from './useAuthContext'
import { useEventContext } from './useEventsContext';

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch:workoutsDispatch } = useEventContext();

  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user');

    // dispatch logout action
    dispatch({ type: 'LOGOUT' });
    workoutsDispatch({ type: 'SET_WORKOUTS', payload:null });
  }

  return { logout };
}