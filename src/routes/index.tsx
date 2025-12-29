import { Footer, Header } from "@/components"
import MainLayout from "@/layouts/MainLayout"
import { createBrowserRouter } from "react-router-dom"
import {
  About,
  Computers,
  Ipad,
  Entertainment,
  Support,
  Phones,
  SmartHome,
  SignIn,
  Register,
  Home,
  NotFound,
  ErrorPage,
} from "../pages";
import BlankLayout from "@/layouts/BlankLayout";

const router =  createBrowserRouter([
    {
        path: "/",
        element: <MainLayout header={<Header />} footer={<Footer />} />,
        children: [
            {
                index: true,
                element: <Home />,
                errorElement: <ErrorPage />
            },
            { path: "about", element: <About />, errorElement: <ErrorPage /> },
            {
                path: "computers",
                element: <Computers />,
                errorElement: <ErrorPage />,
            },
            { path: "ipad", element: <Ipad />, errorElement: <ErrorPage /> },
            {
                path: "entertainment",
                element: <Entertainment />,
                errorElement: <ErrorPage />,
            },
            { path: "support", element: <Support />, errorElement: <ErrorPage /> }, // 错误页面
            {
                path: "smarthome",
                element: <SmartHome />,
                errorElement: <ErrorPage />,
            },
            { path: "phones", element: <Phones />, errorElement: <ErrorPage /> },
            { path: "*", element: <NotFound /> },
        ]
    },
    // 用户权限目录“/auth”
    {
        path: "/auth",
        element: <BlankLayout  />,
        children: [
        { path: "signin", element: <SignIn /> },
        { path: "register", element: <Register /> },
        ],
    },
])

export default  router;