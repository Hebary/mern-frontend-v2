import { ProjectsState } from './';
import { Project } from '../../interfaces';


type ProjectsActionType = 
| {type: '[PROJECTS]-SET_PROJECTS', payload: Project[]}
| {type: '[PROJECTS]-ADD_PROJECT', payload: Project}
| {type: '[PROJECTS]-SET_PROJECT', payload: Project | undefined}
| {type: '[PROJECTS]-UPDATE_PROJECT', payload: Project}


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
        case '[PROJECTS]-UPDATE_PROJECT': 
          return{
            ...state,
            projects: state.projects.map(project => project._id === action.payload._id ? action.payload : project)
          } 

    default: 
            return state; 
    }
}