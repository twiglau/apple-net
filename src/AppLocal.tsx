
import MainLayout from "@/layouts/MainLayout";
import Home from '@/pages/Home'
import Header from '@components/Header'
import Footer from '@components/Footer'
import { Route, Routes } from "react-router-dom";
import {
    About,
    Entertainment,
    Support,
    SmartHome,
    Phones,
    Register,
    SignIn
} from './pages'
import BlankLayout from "./layouts/BlankLayout";

function App() {
    return (
      <Routes>
        <Route
        path="/"
        element={
            <MainLayout 
            header={<Header />}
            footer={<Footer />}
            />
        }
        >
            {/* 这里的 Outlet 用于渲染嵌套路由的内容 */}
            <Route index element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/entertainment" element={<Entertainment />} />
            <Route path="/support" element={<Support />} />
            <Route path="/smarthome" element={<SmartHome />} />
            <Route path="/phones" element={<Phones />} />
        </Route>
        <Route path="/auth" element={<BlankLayout />}>
            <Route path="register" element={<Register />} />
            <Route path="signin" element={<SignIn />} />
        </Route>
      </Routes>
    )
}

export default App;