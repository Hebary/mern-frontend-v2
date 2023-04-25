


interface Props {
    title?: string
    children: React.ReactElement | React.ReactElement[]
}


export const AuthLayout: React.FC<Props> = ({children}) => {
   return (
    <>   
       {children}
    </>
   )
}