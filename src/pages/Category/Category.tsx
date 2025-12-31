import { Skeleton } from "@/components";
import useApiReducer from "@/hooks/useApiReducer"
import type { Category as CategoryType} from '@/types/custom';
import { useNavigate, useParams } from "react-router-dom";
import TextHeader from "./TextHeader";
import VideoHero from "./VideoHero";
import ImageSlider from "./ImageSlider";
import CompareTable from "./CompareTable";

type CategoryParams = {
    category: string;
}

const Category = () => {
    const navigate = useNavigate(); 
    const { category } = useParams<CategoryParams>();
    if(!category) {
        throw new Error("Category not found");
    }

    const { data: productCategory, loading, error } = useApiReducer<CategoryType>(`/categories/${category}`);
    if(loading || productCategory == null) {
        return <Skeleton />
    }
    if(error) {
        navigate("/not-found", { replace: true });
    }
    return (
        <div className="min-h-screen">
            {/* 标题 */}
            <TextHeader
                title={productCategory.title}
                description={productCategory.subTitle}
            />
            {/* 视频展示 */}
            <VideoHero
              videoSrc={productCategory?.videos?.regularSrc}
              videoSmallSrc={productCategory?.videos?.smallSrc}
            />
            {/* 走马灯 */}
            <ImageSlider features={productCategory?.features} />
            {/* 系列产品比较 */}
            <CompareTable products={productCategory?.products} />
        </div>
    );
};

export default Category;
