import { useReducer, useEffect } from 'react';
import { ProjectsContext, projectsReducer } from './';
import { pmApi } from '../../config';
import { Project } from '../../interfaces';


interface Props {
   children: JSX.Element | JSX.Element[];
}

export interface ProjectsState {
    property: boolean;
    projects: Project[];
}

const Projects_INITIAL_STATE: ProjectsState = {
   property: false,
   projects:[]
}

export const ProjectsProvider: React.FC<Props> = ({ children }) => {

    const [state, dispatch] = useReducer(projectsReducer, Projects_INITIAL_STATE);

    // Get user projects and set them in the state
    useEffect(() => {
        const getUserProjects = async () => {
            const config = {
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }
            try {
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
            const config = {
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }

            const { data } = await pmApi.post<Project>('/projects', project , config);
            
            dispatch({type: '[PROJECTS]-ADD_PROJECT', payload: data});

        } catch (error) {
            console.log({error});
        }
    }

    return ( 
        <ProjectsContext.Provider
            value={{
                    ...state,
                    createProject,
                    projects: state.projects

                }}>
            {children}
        </ProjectsContext.Provider>
    )
}
