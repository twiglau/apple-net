import type { ReactNode } from "react"
import { Navigate, useLocation } from "react-router-dom";


interface RequireAuthProps {
    children: ReactNode;
}
const RequireAuth =  ({children}: RequireAuthProps ) => {
    const location = useLocation()
    const token = localStorage.getItem('token');
    if(!token){
        return <Navigate to="/auth/signin" state={{from: location.pathname}} replace />
    }

    // 如果有 token, 渲染子组件
    return <>{children}</>
}

export default RequireAuth;