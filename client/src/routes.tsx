import { Route, Routes, BrowserRouter    } from "react-router-dom";
import { HomePage, RoomPage, CreateRoomPage, AccessRoomPage, QueuePage } from "./pages";

const ApplicationRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route Component={HomePage} path="/" />
        <Route Component={CreateRoomPage} path="/create" />
        <Route Component={AccessRoomPage} path="/room" />
        <Route Component={RoomPage} path="/room/:roomId"  />
        <Route Component={QueuePage} path="/queue"  />

      </Routes>
    </BrowserRouter>
  );
};

export default ApplicationRoutes;
