import type React from "react";


interface TextLineProps {
    title: string;
    amount: number;
    large?:boolean;
}
interface PriceTagProps {
    modelAmount: number;
    colorAmount?: number | undefined;
    sizeAmount?: number | undefined;
    totalAmount: number;
}

const TextLine: React.FC<TextLineProps> = ({ title, amount, large=false }) => {
    return (
        <>
            <span className={`text-center ${large ? 'text-2xl' : 'text-base'}`}>{title}</span>
            <span className={`text-right ${large ? 'text-2xl' : 'text-base'}`}>RMB {amount.toLocaleString("en-US")}</span>
        </>
    );
}
const PriceTag: React.FC<PriceTagProps> = ({
    modelAmount,
    colorAmount,
    sizeAmount,
    totalAmount,
}) => {
    return (
        <div className="mt-8 mr-4 text-base">
            <hr className="pb-4 border-apple-gray-200 dark:border-apple-gray-800" />
            <div className="grid grid-cols-2 gap-y-4 pl-12 pt-2">
                <TextLine title={"+ 型号"} amount={modelAmount ?? 0} />
                <TextLine title={"+ 颜色"} amount={colorAmount ?? 0} />
                <TextLine title={"+ 存储容量"} amount={sizeAmount ?? 0} />
            </div>
            <hr className="mt-6 ml-24 border-t border-apple-gray-200 dark:border-apple-gray-800" />
            <div className="grid grid-cols-2 pl-12 pt-2">
                <TextLine title={"总计"} amount={totalAmount} />
            </div>
        </div>
    );
}

export default PriceTag;