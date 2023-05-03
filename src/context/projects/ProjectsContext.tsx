import { createContext } from 'react';
import { Project, Task } from '../../interfaces';


interface ContextProps {
    projects: Project[];
    project: Project | undefined;
    createProject: (project: Project) => void;
    getProjectById: (id: string) => void;
    updateProject: (project: Project) => void;
    deleteProject: (id: string) => void;
    createNewTask: (task: Task) => void;
}

export const ProjectsContext = createContext({} as ContextProps);