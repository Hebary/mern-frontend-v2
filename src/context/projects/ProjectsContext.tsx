import { createContext } from 'react';
import { Project } from '../../interfaces';


interface ContextProps {
    projects: Project[];
    project: Project | undefined;
    createProject: (project: Project) => void;
    getProjectById: (id: string) => void;
}

export const ProjectsContext = createContext({} as ContextProps);