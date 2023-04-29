import { UiState } from './';


type UiActionType = 
| {type: '[Ui]-TOGGLE_MENU'}


export const uiReducer = (state: UiState, action: UiActionType): UiState => {


   switch (action.type) {
       case '[Ui]-TOGGLE_MENU':
            return{
              ...state,
              isMenuOpen: !state.isMenuOpen
           }

    default: 
            return state; 
    }
}