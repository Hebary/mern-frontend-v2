import { useContext } from "react";

//Components
import { 
    Box, Divider, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Typography 
} from "@mui/material";
// Icons
import { 
    CategoryOutlined, LoginOutlined,  
} from "@mui/icons-material";

import { UiContext } from "../../context/ui";



export const Sidebar: React.FC = () => {

    const { isMenuOpen, toggleMenu } = useContext(UiContext);


    const navigateTo = (path: string) => { 
      console.log(path);
    }

    const logout = () => {
        console.log("logout");
    }

    return (
        <Drawer
            open={ isMenuOpen }
            onClose={ toggleMenu }
            anchor='left'
            sx={{ backdropFilter:'blur(2px)', transition: 'all .7s cubic-bezier(0.25, 0.8, 0.25, 1)' }}
        >
            <Box sx={{ width: 250, paddingTop: 1 }}>

            <Box sx={{ padding: 2 }}>
                <Typography sx={{}}>Welcome user</Typography>
            </Box>
            <Divider/>
            <List>

                <ListItemButton 
                    sx={{ display: { xs: '', sm: 'none' } }} 
                    onClick={ ()=> navigateTo('/') }
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
