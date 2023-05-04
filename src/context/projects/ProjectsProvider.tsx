import { useReducer, useEffect } from 'react';
import { ProjectsContext, projectsReducer } from './';
import { pmApi } from '../../config';
import { Project, Task } from '../../interfaces';


interface Props {
   children: JSX.Element | JSX.Element[];
}

export interface ProjectsState {
    projects: Project[];
    project : Project | undefined;
    task: Task | undefined;
}

const Projects_INITIAL_STATE: ProjectsState = {
   projects:[],
   project: undefined,
   task: undefined
}

export const ProjectsProvider: React.FC<Props> = ({ children }) => {

    const [state, dispatch] = useReducer(projectsReducer, Projects_INITIAL_STATE);

    // Get user projects and set them in the state
    useEffect(() => {
        const getUserProjects = async () => {
            try {
                const token = localStorage.getItem('token');
                if(!token) return;
                const config = {
                    headers: {
                        'Content-Type' : 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
                const { data } = await pmApi.get<Project[]>('/projects', config);
                
                dispatch({type: '[PROJECTS]-SET_PROJECTS', payload: data});
            
            } catch( error) {
                console.log({error});
            }
        }
        getUserProjects()
    }, []);


    const createProject  = async (project: Project) => {
    
        try {
            const token = localStorage.getItem('token');
            if(!token) return;
            const config = {
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }

            const { data } = await pmApi.post<Project>('/projects', project , config);
            dispatch({type: '[PROJECTS]-ADD_PROJECT', payload: data});

        } catch (error) {
            console.log({error});
        }
    }

    const getProjectById = async (id: string) => {
        try {
            const token = localStorage.getItem('token');
            if(!token) return;
            const config = {
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
            const { data } = await pmApi<Project>(`/projects/${id}`, config);
            
            dispatch({ type: '[PROJECTS]-SET_PROJECT', payload: data });

        } catch (error) {
            console.log({error});
        }
    }

    const updateProject = async (project: Project) => {
        try {
            const token = localStorage.getItem('token');
            if(!token) return;
            const config = {
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
            const { data } = await pmApi.put<Project>(`/projects/${state.project?._id}`, project , config);
            console.log(data);
            dispatch({ type: '[PROJECTS]-UPDATE_PROJECT', payload: data });
            //clean the state of previous project
            dispatch({ type: '[PROJECTS]-SET_PROJECT', payload: Projects_INITIAL_STATE.project });
        } catch (error) {
            console.log(error);
        }
    }

    const deleteProject = async (id: string) => {
        try {
            const token = localStorage.getItem('token');
            if(!token) return;
            const config = {
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
            const { data } = await pmApi.delete<Project>(`/projects/${id}`, config);
            console.log(data);
            dispatch({ type: '[PROJECTS]-DELETE_PROJECT', payload: id });
            dispatch({ type: '[PROJECTS]-SET_PROJECT', payload: Projects_INITIAL_STATE.project });
        } catch (error) {
            console.log({error});
        }
    }

    const createNewTask = async (task: Task) => {
        try {
            const token = localStorage.getItem('token');
            if(!token) return;
            const config = {
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
            const { data } = await pmApi.post<Task>(`/task`, task, config);
            //next line will update the project in the state
            dispatch({ type: '[PROJECTS]-ADD_TASK', payload: data });
        } catch (error) {
            console.log({error});
        }
    }

    const getTaskById = async (id: string) => {
        try {
            const token = localStorage.getItem('token');
            if(!token) return;
            const config = {
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }

            const { data } = await pmApi<Task>(`/task/${id}`, config);
            dispatch({ type: '[PROJECTS]-SET_TASK', payload: data });
        }catch (error) {
            console.log({error});
        }
    }

    const updateTask = async (task: Task) => {
        try {
            const token = localStorage.getItem('token');
            if(!token) return;
            const config = {
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }

            const { data } = await pmApi.put<Task>(`/task/${state.task?._id}`, task, config);
            dispatch({ type: '[PROJECTS]-UPDATE_TASK', payload: data });
            dispatch({ type: '[PROJECTS]-SET_TASK', payload: Projects_INITIAL_STATE.task });

        }catch (error) {
            console.log({error});
        }

    }

    const deleteTask = async (id: string) => {
        try {
            const token = localStorage.getItem('token');
                if(!token) return;
                const config = {
                    headers: {
                        'Content-Type' : 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
                const { data } = await pmApi.delete<Task>(`/task/${id}`, config);
                console.log(data);
                dispatch({ type: '[PROJECTS]-DELETE_TASK', payload: id });
                dispatch({ type: '[PROJECTS]-SET_TASK', payload: Projects_INITIAL_STATE.task });
            } catch (error) {
            console.log({error});
        }
    }

    return ( 
        <ProjectsContext.Provider
            value={{
                    ...state,
                    projects: state.projects,
                    project: state.project,
                    task: state.task,
                    createProject,
                    getProjectById,
                    updateProject,
                    deleteProject,
                    createNewTask,
                    updateTask,
                    deleteTask,
                    getTaskById
                }}>
            {children}
        </ProjectsContext.Provider>
    )
}
