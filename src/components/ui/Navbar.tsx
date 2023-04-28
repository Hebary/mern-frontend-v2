import { AppBar, Toolbar, Typography, Link, Box, Button, IconButton, Input, InputAdornment } from '@mui/material';
import { SearchOutlined, MenuOutlined, ClearOutlined, CategoryOutlined } from '@mui/icons-material';
import { useState } from 'react';

// import { UIContext } from '@/context';



export const Navbar: React.FC = () => {

    // const { toggleMenu } = useContext(UIContext);

    const [search, setSearch] = useState('');
    const [isSearchVisible, setIsSearchVisible] = useState(false);

    const onSearch = () => {
        if(search.trim().length === 0) return;
    }
    
    const toggleMenu = () => {
        console.log('toggle');
    }

    return (
        <AppBar>
            <Toolbar  color='black'>
                    <Link display='flex' flexDirection='column' underline='none' sx={{ cursor:'pointer' }} alignItems='center'>
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
                        <Link underline='none' className='red-hat-font'  sx={{ fontSize: 20 ,cursor: 'pointer'}}>
                          {/* <Button color={ 'primary' }> */}
                                Projects
                          {/* </Button> */}
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

                    {/* xs */}
                <IconButton
                    sx={{ display: { xs: 'flex', sm: 'none' } }}
                    onClick={toggleMenu}
                >
                    <SearchOutlined color='primary'/>
                </IconButton>

                    

                <IconButton onClick={toggleMenu}>
                    <MenuOutlined color='primary'/>
                </IconButton>
        
                </Box>
            </Toolbar>
        </AppBar>
    )
}
