import { useState } from 'react';
import { AppBar, Toolbar, Typography, Link, Box, IconButton, Input, InputAdornment } from '@mui/material';
import { SearchOutlined, MenuOutlined, ClearOutlined, CategoryOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useUI } from '../../hooks';





export const Navbar: React.FC = () => {

    const { toggleMenu } = useUI();
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [isSearchVisible, setIsSearchVisible] = useState(false);

    const onSearch = () => {
        if(search.trim().length === 0) return;
    }
    

    return (
        <AppBar>
            <Toolbar>
                    <Link display='flex' underline='none' sx={{ cursor:'pointer' }} onClick={() => navigate('/projects')} >
                        <Box display='flex'>
                          <CategoryOutlined sx={{ fontSize: '30px' }}/>
                          <Box>
                            <Typography sx={{ fontSize: '12px', ml:.3}} className='red-hat-font'>Project</Typography>
                            <Typography sx={{ ml: 0.5, fontSize:'12px' }} fontWeight='light' className='red-hat-font'>Handler</Typography>
                          </Box>
                        </Box>
                    </Link>

                <Box flex={1}/>

                <Box gap={3} className='red-hat-font' sx={{borderRadius:10, display: isSearchVisible ? 'none' : { xs: 'none', sm: 'flex' } }}>
                        <Link underline='none' className='red-hat-font li' onClick={() => navigate('/projects')}  sx={{ fontSize: 16 ,cursor: 'pointer'}}>
                            Projects
                        </Link>
                </Box>

                <Box flex={1}/>
                
                <Box display='flex' alignItems='center' gap={1}>

                {/* sm */}

                {
                isSearchVisible ?
                    (
                        <Input
                            sx={{ display: { xs: 'none', sm: 'flex'} }}
                            className='fadeIn'
                            type='text'
                            autoFocus   
                            value={search}
                            onChange={ (e) => setSearch( e.target.value ) }
                            onKeyUp={ (e) => e.key === 'Enter' && onSearch()}
                            placeholder="Search..."
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={ ()=> setIsSearchVisible(!isSearchVisible) }
                                    >
                                     <ClearOutlined />
                                    </IconButton>
                                </InputAdornment>
                            }
                        /> 
                    ) 
                :   
                    (
                        <IconButton
                            onClick={ ()=> setIsSearchVisible(!isSearchVisible) }
                            sx={{ display: { xs: 'none', sm: 'flex' } }}
                            className='fadeIn'

                        >
                            <SearchOutlined color='primary' />
                        </IconButton>
                    )
                }

                    

                <IconButton onClick={ toggleMenu }>
                    <MenuOutlined color='primary'/>
                </IconButton>
        
                </Box>
            </Toolbar>
        </AppBar>
    )
}
