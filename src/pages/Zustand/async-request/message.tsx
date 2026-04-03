import { Tent } from "lucide-react";
import { use } from "react";
import { getMessage } from "../store/async-request";


export const Message = (props: { promise: ReturnType<typeof getMessage> | null }) => {
    const message = use(props.promise || Promise.resolve({ value: "No message yet. Click the button to fetch!" }));

    return (
        <div className="flex border border-gray-300 p-4 inset-ring items-start">
            <Tent className="w-6 h-6 text-gray-500 mr-2" />
            <div className="flex-1 ml-3">
                <div className="text-sm text-black">React introduction</div>
                <div className="text-xs leading-6 mt-2 text-gray-600">
                    {message.value}
                </div>
            </div>
        </div>
    )
}