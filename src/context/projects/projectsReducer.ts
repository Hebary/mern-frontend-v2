import { ProjectsState } from './';
import { Project, Task } from '../../interfaces';


type ProjectsActionType = 
| {type: '[PROJECTS]-SET_PROJECTS', payload: Project[]}
| {type: '[PROJECTS]-ADD_PROJECT', payload: Project}
| {type: '[PROJECTS]-SET_PROJECT', payload: Project | undefined}
| {type: '[PROJECTS]-UPDATE_PROJECT', payload: Project}
| {type: '[PROJECTS]-DELETE_PROJECT', payload: string}
| {type: '[PROJECTS]-ADD_TASK', payload: Task}


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
    case '[PROJECTS]-DELETE_PROJECT':
      return{
        ...state,
        projects: state.projects.filter(project => project._id !== action.payload)
        }
    case '[PROJECTS]-ADD_TASK':
      return {
        ...state,
        project: state.project && { ...state.project, tasks: [...state.project.tasks, action.payload] } 
        } 
    default: 
      return state; 
    }
}