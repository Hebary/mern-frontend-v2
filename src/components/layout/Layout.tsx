import { Box } from "@mui/material"
import { Navbar } from "../ui"
import { Sidebar } from "../ui"
import { useAuth } from "../../hooks"
import { Navigate } from "react-router-dom"


interface Props {
    title?: string
    children: React.ReactElement | React.ReactElement[]
}

export const Layout: React.FC<Props> = ({ children }) => {

  const { user } = useAuth();

  return (
    <>
      { user._id ?
      <>  
        <Navbar/>
        <Sidebar/>
        <Box py={10} px={4}>
          {children}
        </Box>
      </> 
      : <Navigate to={'/login'}/>
      }    
    </>
   )
}