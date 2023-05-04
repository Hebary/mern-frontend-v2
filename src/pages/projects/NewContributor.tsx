import { Box, Button, FormControl, Grid, TextField, Typography } from "@mui/material"
import { useForm } from "react-hook-form";
import { Layout } from "../../components/layout"
import { emailValidator } from '../../utils/isValidEmail';
import { useProjects } from "../../hooks";

type FormData = {
    email:string;
}

export const NewContributor: React.FC = () => {
    
    const { findContributor } = useProjects();
    const { handleSubmit, register, formState:{errors} } = useForm<FormData>()
   
    const onSubmitContributor = async ({ email }: FormData) => {
        findContributor(email);
    }
   
    return (
        <Layout>
            <Box maxWidth={'300px'} display={'flex'} className='fadeInUp' m='40px auto 0'>
                <Typography color='info.main' variant='h4' component='h2' fontWeight={ 500 } sx={{ mr:1, letterSpacing:2, fontWeight:300, textTransform:'capitalize' }}>New</Typography>
                <Typography color='primary.main' variant='h4' component='h2' fontWeight={ 500 } sx={{ ml:1, letterSpacing:2, fontWeight:900, textTransform:'capitalize' }}>Contributor</Typography>
            </Box>
            <Grid sx={{ maxWidth:'420px', mx:'auto', p:4, borderRadius:5, boxShadow:'0 4px 6px -1px rgb(0 0 0 / 0.2), 0 2px 4px -2px rgb(0 0 0 / 0.2)', mt:1 }}>
                <form onSubmit={handleSubmit(onSubmitContributor)}>
                    <FormControl fullWidth>
                        <TextField
                            label='Email'
                            {...register('email',{
                                required: 'Email is required',
                                validate:emailValidator.isEmail
                            })}
                            error={ !!errors.email }
                            helperText={errors?.email?.message as string}
                        />
                        <Button type='submit' color='info' sx={{ mt:2 }} variant='contained' fullWidth size='large' >Search</Button>
                    </FormControl>
                </form>
            </Grid>
        </Layout>
    )
}
