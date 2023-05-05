import { createContext } from 'react';
import { Project, Task, User } from '../../interfaces';


interface ContextProps {
    projects: Project[];
    project: Project | undefined;
    task: Task | undefined;
    contributor: User | undefined;
    createProject: (project: Project) => void;
    getProjectById: (id: string) => void;
    updateProject: (project: Project) => void;
    deleteProject: (id: string) => void;
    createNewTask: (task: Task) => void;
    updateTask: (task: Task) => void;
    deleteTask: (id: string) => void;
    getTaskById: (id: string) => void;
    findContributor: (contributorEmail: string) => void;
    addContributor: (contributorEmail: string) => void;
    cleanState: () => void;
    deleteContributor: (id: string, email: string) => void;
    updateProjectsInState: () => void;
    changeTaskState: (id: string) => void;
}

export const ProjectsContext = createContext({} as ContextProps);