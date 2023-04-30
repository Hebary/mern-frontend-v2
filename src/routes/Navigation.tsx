
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login, CreateAccount } from "../pages/auth";
import { IndexPage } from "../pages/IndexPage";
import { NewProject } from "../pages/projects";

export const Navigation: React.FC = () => {
    return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element ={ <IndexPage/> }/>
              <Route path="/login" element ={ <Login/> }/>
              <Route path="/create-account" element ={ <CreateAccount/> }/>
              <Route path="/new-project" element ={ <NewProject/> }/>
          </Routes>
  
      </BrowserRouter>
    );
  };
