import { useContext, useState } from "react";
//Components
import { 
    Box, Divider, Drawer, IconButton, Input, InputAdornment, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography 
} from "@mui/material";
// Icons
import { 
    AddCircleOutlineRounded,
    CategoryOutlined, LoginOutlined, SearchOutlined,  
} from "@mui/icons-material";

import { UiContext } from "../../context/ui";



export const Sidebar: React.FC = () => {

    const { isMenuOpen, toggleMenu } = useContext(UiContext);

    const [search, setSearch] = useState('');

    const onSearch = () => {
        if(search.trim().length === 0) return;
            navigateTo(`/search/${ search }`);
            setSearch('');

    }

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
            anchor='right'
            sx={{ backdropFilter:'blur(2px)', transition: 'all .7s cubic-bezier(0.25, 0.8, 0.25, 1)' }}
        >
            <Box sx={{ width: 250, paddingTop: 1 }}>

            <Box sx={{ padding: 2 }}>
                <Typography variant='body2' className='red-hat-font'>Welcome user</Typography>
            </Box>
            <Divider/>
            <List>
        

                <ListItemButton
                    onClick={ logout }
                    >
                        <ListItemIcon>
                            <LoginOutlined/>
                        </ListItemIcon>
                    <ListItemText primary={'Log out'} />
                </ListItemButton>

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
                        onClick={ () => navigateTo('/admin/products')}
                    >
                        <ListItemIcon>
                            <AddCircleOutlineRounded/>
                        </ListItemIcon>
                        <ListItemText primary={'New project'} />
                </ListItemButton>
                
                <ListItem>
                    <Input
                        type='text'
                        autoFocus   
                        value={search}
                        onChange={ (e) => setSearch( e.target.value ) }
                        onKeyUp={ (e) => e.key === 'Enter' ? onSearch() : null}
                        placeholder="Search..."
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={ onSearch }
                                >
                                 <SearchOutlined />
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </ListItem>

            </List>
        </Box>      
        </Drawer>
    )
}
