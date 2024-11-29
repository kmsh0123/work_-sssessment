import { createBrowserRouter } from "react-router-dom";
import { clientRoute } from "./clientRoute";

const routeRegister = [...clientRoute];

const routes = createBrowserRouter(routeRegister);

export default routes;