import { ProjectsState } from './';
import { Project, Task } from '../../interfaces';


type ProjectsActionType = 
| {type: '[PROJECTS]-SET_PROJECTS', payload: Project[]}
| {type: '[PROJECTS]-ADD_PROJECT', payload: Project}
| {type: '[PROJECTS]-SET_PROJECT', payload: Project | undefined}
| {type: '[PROJECTS]-UPDATE_PROJECT', payload: Project}
| {type: '[PROJECTS]-DELETE_PROJECT', payload: string}
| {type: '[PROJECTS]-ADD_TASK', payload: Task}
| {type: '[PROJECTS]-SET_TASK', payload: Task | undefined}
| {type: '[PROJECTS]-UPDATE_TASK', payload: Task}
| {type: '[PROJECTS]-DELETE_TASK', payload: string}


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
    case '[PROJECTS]-SET_TASK':
      return {
        ...state,
        task: action.payload
      }
    case '[PROJECTS]-UPDATE_TASK':
      return {
        ...state,
        project: state.project && { ...state.project, tasks: state.project?.tasks.map((task: Task) => task?._id === action.payload._id ? action.payload : task)}
      }
    case '[PROJECTS]-DELETE_TASK':
      return{
        ...state,
        project: state.project && { ...state.project, tasks: state.project?.tasks.filter((task: Task) => task?._id !== action.payload)}
      }
    default: 
      return state; 
    }
}