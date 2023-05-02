import { ProjectsState } from './';
import { Project } from '../../interfaces';


type ProjectsActionType = 
| {type: '[PROJECTS]-SET_PROJECTS', payload: Project[]}
| {type: '[PROJECTS]-ADD_PROJECT', payload: Project}
| {type: '[PROJECTS]-SET_PROJECT', payload: Project}


export const projectsReducer = (state: ProjectsState, action: ProjectsActionType): ProjectsState => {


   switch (action.type) {
        case '[PROJECTS]-SET_PROJECTS':
            return{
              ...state,
              projects: action.payload
          }
        case '[PROJECTS]-ADD_PROJECT':
          return{
            ...state,
            projects: [...state.projects, action.payload]
          }
        case '[PROJECTS]-SET_PROJECT':
          return{ 
            ...state,
            project: action.payload
          }  

    default: 
            return state; 
    }
}