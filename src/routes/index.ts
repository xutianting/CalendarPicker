import { createHashRouter}  from "react-router-dom";
import About from "../pages/About";
import App from "../App";

const router=createHashRouter([
    {
        path:'/',
        Component:App
    },
    {
        path:'/about',
        Component:About
    }
])

export default router