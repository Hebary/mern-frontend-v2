import { useReducer } from 'react';
import { ProjectsContext, projectsReducer } from './';
import { pmApi } from '../../config';
import { Project } from '../../interfaces';


interface Props {
   children: JSX.Element | JSX.Element[];
}

export interface ProjectsState {
    property: boolean;
}

const Projects_INITIAL_STATE: ProjectsState = {
   property: false
}

export const ProjectsProvider: React.FC<Props> = ({children}) => {

    const [state, dispatch] = useReducer(projectsReducer, Projects_INITIAL_STATE);

    const createProject  = async (project: Project) => {
    
        try {
            const config = {
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }

            const { data } = await pmApi.post('/projects', project , config);
            console.log(data);
            
        } catch (error) {
            console.log({error});
        }
    }

    return ( 
        <ProjectsContext.Provider
            value={{
                    ...state,
                    createProject
                }}>
            {children}
        </ProjectsContext.Provider>
    )
}
