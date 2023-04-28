import { useState } from "react"
// import { UIContext } from "@/context"
//Components
import { 
    Box, Drawer, List, ListItemButton, ListItemIcon, ListItemText 
} from "@mui/material"
// Icons
import { 
     CategoryOutlined, LoginOutlined,  
} from "@mui/icons-material"



export const Sidemenu: React.FC = () => {

    // const { isMenuOpen, toggleMenu } = useContext(UIContext);
    
    const isMenuOpen = false;

    const toggleMenu = () => {
        console.log("toggleMenu");
    }

    const navigateTo = (path: string) => { 
        toggleMenu();
    }

    const logout = () => console.log("logout");
    

    return (
        <Drawer
            open={ isMenuOpen }
            onClose={ toggleMenu }
            anchor='right'
            sx={{ backdropFilter:'blur(4px)', transition: 'all .7s cubic-bezier(0.25, 0.8, 0.25, 1)' }}
        >
            <Box sx={{ width: 250, paddingTop: 5 }}>
            
            <List>

                <ListItemButton 
                    sx={{ display: { xs: '', sm: 'none' } }} 
                    onClick={ ()=> navigateTo('/category/men') }
                >
                    <ListItemIcon>
                        <CategoryOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Projects'} />
                </ListItemButton>


                
                   
                <ListItemButton
                    onClick={ logout }
                        >
                        <ListItemIcon>
                            <LoginOutlined/>
                        </ListItemIcon>
                    <ListItemText primary={'Log out'} />
                </ListItemButton>
                


                    <ListItemButton
                        onClick={ () => navigateTo('/admin/products')}
                    >
                        <ListItemIcon>
                            <CategoryOutlined/>
                        </ListItemIcon>
                        <ListItemText primary={'Projects'} />
                    </ListItemButton>

            </List>
        </Box>      
        </Drawer>
    )
}
