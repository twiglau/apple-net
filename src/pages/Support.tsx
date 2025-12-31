import useApiData from "@/hooks/useApiData";
import type { SupportData } from "@/types/custom";
import { Skeleton } from "@components";

export default function Support() {

    const { data, loading, error } = useApiData<SupportData>("/information/support");

    if(loading) {
        return <Skeleton />;
    }

    if(error) {
        return <div className="min-h-screen flex items-center
         justify-center text-red-500
        ">
            <p>加载数据失败: {error}</p>
        </div>;
    }
    return (
        <div className="min-h-screen text-apple-text-light dark:text-apple-text-dark">
            <div className="p-4 text-xs text-gray-500"
            dangerouslySetInnerHTML={{ __html: data?.data || '' }}></div>
        </div>
    )
}