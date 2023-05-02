
import { Routes, Route } from "react-router-dom";
import { Login, CreateAccount } from "../pages/auth";
import { ProjectPage, Projects } from "../pages/projects";
import { NewProject } from "../pages/projects";

export const Navigation: React.FC = () => {
  return (
    <Routes>
      <Route path="/projects" element ={ <Projects/> }/>
      <Route path="/login" element ={ <Login/> }/>
      <Route path="/create-account" element ={ <CreateAccount/> }/>
      <Route path="/new-project" element ={ <NewProject/> }/>
      <Route path="/projects/:id" element ={ <ProjectPage/> }/>
    </Routes>
  );
};
