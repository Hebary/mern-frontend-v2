import { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom"
import { Box, IconButton, Typography } from "@mui/material";
import { Layout } from "../../components/layout"
import { useProjects } from "../../hooks";
import { FullScreenLoading } from '../../components/ui';
import { EditOutlined } from '@mui/icons-material';



export const ProjectPage: React.FC = () => {
    const { getProjectById, project } = useProjects();
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        setLoading(true);
        getProjectById(id as string);
        setTimeout(() => {setLoading(false)}, 2000);
    }, [])
    

    return (
        <Layout>
            {
                loading 
                    ? <FullScreenLoading/> 
                    : <>
                        <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} sx={{borderBottom: '1px solid #ccc', py:2}} className='fadeInUp' >
                            <Typography color='info.main' variant='h5' component='h1' sx={{ textAlign:'justify', ml: 1, letterSpacing: 2, fontWeight: 300, textTransform:'capitalize' }}>{project?.name}</Typography>
                            <Link to={`/projects/edition/${project?._id}`} style={{ marginTop:5, display:'block' }}>
                                <IconButton >
                                    <EditOutlined sx={{color:'info.main',  fontSize:'25px'}}/>
                                </IconButton>
                            </Link>
                        </Box>

                     </>
            }

        </Layout>
    )
}
