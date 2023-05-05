import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Divider, Drawer, IconButton, Input, InputAdornment, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { AddCircleOutlineRounded, CategoryOutlined, LoginOutlined, SearchOutlined } from "@mui/icons-material";
import { useProjects, useAuth, useUI } from "../../hooks";




export const Sidebar: React.FC = () => {

    const { isMenuOpen, toggleMenu } = useUI();
    const { signOut, user } = useAuth();
    const [search, setSearch] = useState('');
    const navigate = useNavigate();
    const { cleanState } = useProjects();
    
    const onSearch = () => {
        if(search.trim().length === 0) return;
            navigateTo(`/projects/search/${search}`);
            setSearch('');

    }

    const onSignOut = () => {
        signOut();
        cleanState();
        navigate('/login')
        toggleMenu();
    }

    const navigateTo = (path: string) => { 
      navigate(path);
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
                <Typography variant='body2' fontWeight={500} textTransform={'capitalize'} className='red-hat-font'>Welcome { user.name }</Typography>
            </Box>
            <Divider/>
            <List>
        

                <ListItemButton
                    onClick={ onSignOut }
                    >
                        <ListItemIcon>
                            <LoginOutlined/>
                        </ListItemIcon>
                    <ListItemText primary={'Sign Out'} />
                </ListItemButton>

                <ListItemButton 
                    sx={{ display: { xs: '', sm: 'none' } }} 
                    onClick={ () => navigateTo('/projects') }
                >
                    <ListItemIcon>
                        <CategoryOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Projects'} />
                </ListItemButton>
            
                <ListItemButton
                        onClick={ () => { navigateTo('/new-project'); toggleMenu(); }}
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
