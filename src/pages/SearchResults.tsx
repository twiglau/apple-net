import { useSearchParams } from "react-router-dom";


const SearchResults = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('query');
    const page = Number(searchParams.get('page')) || 1;
    const handlePageChange = (newPage: number) => {
        setSearchParams({
            query: query || '',
            page: newPage.toString(),
        });
    };
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold mb-4">Search Results</h1>
            <p className="text-gray-600">
                No results found
                {query ? `"${query}"` : "未指定"}
            </p>
            <button onClick={() => handlePageChange(page -1)}>上一页</button>
            <button onClick={() => handlePageChange(page +1)}>下一页</button>
        </div>
    );
};

export default SearchResults;