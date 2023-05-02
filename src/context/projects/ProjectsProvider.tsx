import { useReducer } from 'react';
import { ProjectsContext, projectsReducer } from './';


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

   return (
    <ProjectsContext.Provider
        value={{
                ...state
            }}>
        {children}
    </ProjectsContext.Provider>
    )
}
