import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom"
import { Typography } from "@mui/material";
import { Layout } from "../../components/layout"
import { useProjects } from "../../hooks";
import { FullScreenLoading } from '../../components/ui';




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
                    : <Typography color='info.main' variant='h3' component='h1' sx={{ textAlign:'justify', ml:1, mt:1, letterSpacing:2, fontWeight:300, textTransform:'capitalize' }}>{project?.name}</Typography>
            }

        </Layout>
    )
}
