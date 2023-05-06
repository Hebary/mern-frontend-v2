import { useReducer, useEffect } from 'react';
import { ProjectsContext, projectsReducer } from './';
import { pmApi } from '../../config';
import { Project, Task, User } from '../../interfaces';

import { io } from 'socket.io-client'
let socket : any;
interface Props {
   children: JSX.Element | JSX.Element[];
}

export interface ProjectsState {
    projects: Project[];
    project : Project | undefined;
    task: Task | undefined;
    contributor: User | undefined;
}

const Projects_INITIAL_STATE: ProjectsState = {
   projects:[],
   project: undefined,
   task: undefined,
   contributor: undefined
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
    
    //open socket-io connection
    useEffect(() => {
      socket = io(import.meta.env.VITE_SOCKET_URL);
    }, [])
    
    

    const updateProjectsInState = async () => {
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

    const cleanState = () => {
        dispatch({ type: '[PROJECTS]-SET_PROJECTS', payload:[]});
        dispatch({ type: '[PROJECTS]-SET_PROJECT', payload: undefined});
        dispatch({ type: '[PROJECTS]-SET_TASK', payload: undefined});
        dispatch({ type: '[PROJECTS]-SET_CONTRIBUTOR', payload: undefined});
    }

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
            // dispatch({ type: '[PROJECTS]-ADD_TASK', payload: data });
            
            //SOCKET-IO
            socket.emit('add task', data);
            

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

    const deleteTask = async (task: Task) => {
        try {
            const token = localStorage.getItem('token');
                if(!token) return;
                const config = {
                    headers: {
                        'Content-Type' : 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
                const { data } = await pmApi.delete<Task>(`/task/${task._id}`, config);
                console.log(data);
                
                socket.emit('delete task', task);
                // dispatch({ type: '[PROJECTS]-DELETE_TASK', payload: id });
                // dispatch({ type: '[PROJECTS]-SET_TASK', payload: Projects_INITIAL_STATE.task });
            } catch (error) {
            console.log({error});
        }
    }

    const findContributor = async(email: string) => {
        try {
            const token = localStorage.getItem('token');
            if(!token) return;
            const config = {
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
            const { data } = await pmApi.post('/projects/contributors', {email}, config);
            dispatch({ type: '[PROJECTS]-SET_CONTRIBUTOR', payload: data });
        } catch (error: any) {
            console.log(error);
        }
    }

    const addContributor = async(email: string) => {
        try {
            const token = localStorage.getItem('token');
            if(!token) return;
            const config = {
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
            const { data } = await pmApi.post(`/projects/contributors/${state.project?._id}`, {email, id: state.project?._id}, config);
            console.log(data);
            dispatch({ type: '[PROJECTS]-ADD_CONTRIBUTOR', payload: state.contributor as User });
        } catch (error) {
            console.log(error);
        }
    }

    const deleteContributor = async(id: string, email: string) => {
        try {
            const token = localStorage.getItem('token');
            if(!token) return;
            const config = {
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
            const { data } = await pmApi.post(`/projects/delete-contributor/${state.project?._id}`,{ email}, config);
            console.log(data);
            dispatch({ type: '[PROJECTS]-DELETE_CONTRIBUTOR', payload: id });
            dispatch({ type: '[PROJECTS]-SET_CONTRIBUTOR', payload: Projects_INITIAL_STATE.contributor });
        } catch (error) {
            console.log(error);
        }
    }

    const changeTaskState = async (id: string) => {
        try {
            const token = localStorage.getItem('token');
            if(!token) return;
            const config = {
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
            const { data } = await pmApi.post<Task>(`/task/state/${id}`,{}, config)
            dispatch({ type: '[PROJECTS]-CHANGE_TASK_STATE', payload: data });
        } catch (error) {
            console.log(error);
        }
    }

    const searchProject = (query: string) => {
        const projectsAux = state.projects;
        if(query === '') {
            return;
        }
        const filteredProjects = state.projects.filter(project => project.name.toLowerCase().includes(query.toLowerCase()));
        dispatch({ type: '[PROJECTS]-SET_PROJECTS', payload: filteredProjects });
        setTimeout(() => {
            dispatch({ type: '[PROJECTS]-SET_PROJECTS', payload: projectsAux });
        },15000)
        
    }


    //Socket-IO

    const addTaskSocket = (task: Task) => {
        dispatch({ type: '[PROJECTS]-ADD_TASK', payload: task });
    }

    const deleteTaskSocket = (task: Task) => {
            dispatch({ type: '[PROJECTS]-DELETE_TASK', payload: task?._id as string});
            dispatch({ type: '[PROJECTS]-SET_TASK', payload: Projects_INITIAL_STATE.task });
    }

    return ( 
        <ProjectsContext.Provider
            value={{
                    ...state,
                    projects: state.projects,
                    project: state.project,
                    task: state.task,
                    contributor: state.contributor,
                    createProject,
                    getProjectById,
                    updateProject,
                    deleteProject,
                    createNewTask,
                    updateTask,
                    deleteTask,
                    getTaskById,
                    findContributor,
                    addContributor,
                    deleteContributor,
                    cleanState,
                    updateProjectsInState,
                    changeTaskState,
                    searchProject,
                    addTaskSocket,
                    deleteTaskSocket
                }}>
            {children}
        </ProjectsContext.Provider>
    )
}
