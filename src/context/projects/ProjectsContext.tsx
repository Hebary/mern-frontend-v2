import { createContext } from 'react';
import { Project } from '../../interfaces';


interface ContextProps {
    property: boolean;
    createProject:(project: Project) => void
}

export const ProjectsContext = createContext({} as ContextProps);