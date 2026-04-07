import Message from "./message";
import { useQuery } from "./query";


export default function Page() {
    const { message, loading, setLoading } = useQuery();

    function __handler() {
        setLoading(true)
    }

    return (
        <div className="p-4">
            <div className="text-right mb-4">
                <button className="text-xs bg-indigo-600 hover:bg-indigo-500 py-2 px-3 text-white" onClick={__handler}>更新数据</button>
            </div>
            {loading ? <div>loading...</div> : <Message message={message!} />}
        </div>
    )
}