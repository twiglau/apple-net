import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { CartProvider } from "@/contexts/shopping";
import AppInit from "./AppInit";

export default function App() {
    return (
        <CartProvider>
            <AppInit />
            <RouterProvider router={router} />
        </CartProvider>
    )
}