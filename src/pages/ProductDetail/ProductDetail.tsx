import { useNavigate, useParams } from "react-router-dom";
import { product_list } from "@/assets/data/products";

type ParamsType = {
    id: string;
}

const ProductDetail = () => {
    const navigate = useNavigate(); 
    const { id } = useParams<ParamsType>();

    const product = id ? product_list.find((item:any) => item.id === parseInt(id)) : null;

    if(!product) {
        navigate('/404', { replace: true });
        return;
    }
    return (
        <div>
            {product.name}
        </div>
    )
}

export default ProductDetail;