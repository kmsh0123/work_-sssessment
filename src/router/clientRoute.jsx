import AuthGuard from "../Guard/AuthGuard";
import Edit from "../pages/Edit";
import Home from "../pages/Home";
import Index from "../pages/Index";
import Login from "../pages/Login";
import Register from "../pages/Register";

export const clientRoute = [
    {
        path : "/login",
        element : <Login/>
    },
    {
        path : "/register",
        element : <Register/>
    },
    
        {
        path : "/",
        element :  <AuthGuard><Home/></AuthGuard>,
        children : [
            {
                index : true,
                element : <Index/>
            }, 
            {
                path : "/edit/:id",
                element : <Edit/>
            },
        ] 
    }    
]