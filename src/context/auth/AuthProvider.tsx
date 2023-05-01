import { useReducer, useEffect } from 'react';
import { AuthContext, authReducer } from './';
import { User } from '../../interfaces';
import { pmApi } from '../../config';
import { useNavigate } from 'react-router-dom';


interface Props {
   children: JSX.Element | JSX.Element[];
}

export interface AuthState {
    user: User
}

const AUTH_INITIAL_STATE: AuthState = {
   user: {
        _id: '',
        name: '',
        email: '',
        token: '',
    }
}

export const AuthProvider: React.FC<Props> = ({ children }) => {

    const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);
    const navigate = useNavigate();

    const setUserSession = (user: User) => {
        dispatch({ type: '[AUTH]-SET_USER', payload: user });

        setTimeout(() => {
            navigate('/');
        }, 1000);    

    }


    // Check if user was logged in
    useEffect(() => {
        const authByToken = async () => {
            const token  = localStorage.getItem('token');
            if(!token) return;

            try {
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
                const { data } = await pmApi<User>(`/users/profile`, config);
                setUserSession(data);
            } catch (error) {
                console.log(error);  
            }
        }
        authByToken();
    }, [])

    const signOut = () => {
        localStorage.removeItem('token');
        dispatch({ type: '[AUTH]-SET_USER', payload: AUTH_INITIAL_STATE.user });
    }

    return (
    
    <AuthContext.Provider
        value={{
                ...state,

                setUserSession,
                user: state.user,
                signOut
            }}>
        {children}
    </AuthContext.Provider>
    )
}
