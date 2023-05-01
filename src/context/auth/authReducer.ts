import { User } from '../../interfaces';
import { AuthState } from './';


type AuthActionType = 
| {type: '[AUTH]-SET_USER', payload: User}


export const authReducer = (state: AuthState, action: AuthActionType): AuthState => {


   switch (action.type) {
       case '[AUTH]-SET_USER':
            return{
              ...state,
              user: action.payload  
           }

    default: 
            return state; 
    }
}