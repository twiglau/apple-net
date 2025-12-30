
interface SquareProps {
    name: string;
    spec?: string;
    price: string;
    isSelected: boolean;
    onClick?: () => void;
}


export default function SelectSquare(info: SquareProps) {
    return (
        <div className="w-full flex justify-center">
            <div className={` w-[370px] h-20 rounded-xl cursor-pointer
                ${info.isSelected 
                    ? 'border-3 border-apple-blue' 
                    : 'border border-apple-gray-300 hover:ring-2 hover:ring-apple-blue'
                }
            `}
            onClick={info.onClick}
            >
                <div className="flex items-center justify-between mt-2 px-2">
                    <div className="flex flex-col items-center">
                        <div className="ml-2 mt-2">
                            <p>{info.name}</p> {info.spec && <span className="text-xs">({info.spec}¹)</span>}
                        </div>
                        <p className="text-sm mt-1 mr-2">{info.price}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}