import { createContext } from 'react';


interface ContextProps {
    property: boolean;
}

export const ProjectsContext = createContext({} as ContextProps);