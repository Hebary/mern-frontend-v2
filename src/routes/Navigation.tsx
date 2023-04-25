
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login, CreateAccount } from "../pages/auth";
import { IndexPage } from "../pages/IndexPage";

export const Navigation: React.FC = () => {
    return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element ={ <IndexPage/> }/>
              <Route path="/auth/login" element ={ <Login/> }/>
              <Route path="/auth/create-account" element ={ <CreateAccount/> }/>
              
          </Routes>
  
      </BrowserRouter>
    );
  };
