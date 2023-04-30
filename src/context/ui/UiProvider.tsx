import { useReducer } from 'react';
import { UiContext, uiReducer } from './';


interface Props {
   children: JSX.Element | JSX.Element[];
}

export interface UiState {
    isMenuOpen: boolean;
}

const Ui_INITIAL_STATE: UiState = {
   isMenuOpen: false
}

export const UiProvider: React.FC<Props> = ({ children }) => {

    const [state, dispatch] = useReducer(uiReducer, Ui_INITIAL_STATE);

    const toggleMenu = () => {
        dispatch({type: '[Ui]-TOGGLE_MENU'})
    }

return (
    <UiContext.Provider
        value={{
                ...state,
                // methods:
                toggleMenu,
                
            }}>
        {children}
    </UiContext.Provider>
    )
}
