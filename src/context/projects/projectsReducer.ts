import { ProjectsState } from './';


type ProjectsActionType = 
| {type: '[PROJECTS]-TYPE_NAME', payload: boolean}


export const projectsReducer = (state: ProjectsState, action: ProjectsActionType): ProjectsState => {


   switch (action.type) {
       case '[PROJECTS]-TYPE_NAME':
            return{
              ...state,

           }

    default: 
            return state; 
    }
}