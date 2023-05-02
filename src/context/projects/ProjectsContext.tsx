import { createContext } from 'react';
import { Project } from '../../interfaces';


interface ContextProps {
    projects: Project[];
    createProject: (project: Project) => void;
}

export const ProjectsContext = createContext({} as ContextProps);