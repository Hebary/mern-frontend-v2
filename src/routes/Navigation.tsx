
import { Routes, Route } from "react-router-dom";
import { Login, CreateAccount } from "../pages/auth";
import { NewProject, EditProject, ProjectPage, Projects } from "../pages/projects";

export const Navigation: React.FC = () => {
  return (
    <Routes>
      <Route path="/projects" element ={ <Projects/> }/>
      <Route path="/login" element ={ <Login/> }/>
      <Route path="/create-account" element ={ <CreateAccount/> }/>
      <Route path="/new-project" element ={ <NewProject/> }/>
      <Route path="/projects/:id" element ={ <ProjectPage/> }/>
      <Route path="/projects/edition/:id" element ={ <EditProject/> }/>
    </Routes>
  );
};
