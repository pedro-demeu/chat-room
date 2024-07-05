import { Route, Routes, BrowserRouter    } from "react-router-dom";
import { HomePage, RoomPage } from "./pages";

const ApplicationRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route Component={HomePage} path="/" />
        <Route Component={RoomPage} path="/room" />
      </Routes>
    </BrowserRouter>
  );
};

export default ApplicationRoutes;
