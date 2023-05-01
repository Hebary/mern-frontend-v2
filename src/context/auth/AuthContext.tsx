import { createContext } from 'react';
import { User } from '../../interfaces';

interface ContextProps {
    // user: User;
    setUserSession: (user: User) => void;
}

export const AuthContext = createContext({} as ContextProps);

