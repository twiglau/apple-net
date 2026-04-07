import { Tent } from "lucide-react";


const Message = (props: {message: {value: string}}) => {
    const { message } = props;

    return (
        <div className="flex border border-gray-400 p-4 items-start">
            <Tent />
            <div className="flex-1 ml-3">
                <div>React introduction</div>
                <div className="text-sm leading-6 mt-2 text-gray-600">
                    {message.value}
                </div>
            </div>
        </div>
    )
}

export default Message;