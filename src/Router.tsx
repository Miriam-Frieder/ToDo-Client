import AppLayout from "./components/AppLayout";
import Todos from "./components/Todos.js";

import {  createBrowserRouter } from "react-router"
import Login from "./components/UserLogin.js";

export const router = createBrowserRouter([
    {
        path: '/', element: <AppLayout />,
        errorElement: <h1>Error. Please try later...</h1>,
        children: [
            { path: '/todos', element: <Todos /> },
            { path: '/login', element: <Login isRegister={false}/> },
            { path: '/signup', element: <Login isRegister={true}/> },

        ]
    }
])