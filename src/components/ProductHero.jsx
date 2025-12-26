export default function ProductHero({ product, imageUrl }) {
    return (
        <div
        className="flex flex-col lg:flex-row-reverse
        pt-8 mt-4
        md:pt-28 lg:pt-52
        space-y-4
        text-apple-text-light dark:text-apple-text-dark
        "
        >
            <div className="flex-1 flex justify-center items-center">
                <img 
                className="w-87.5 lg:-mt-32 lg:ml-19"
                src={imageUrl}
                />
            </div>
            <div className="flex-1 space-y-6 ml-6 md:ml-24">
                <span
                className="text-4xl font-black md:text-6xl"
                >
                    购买 {product.name}
                </span>
                <span
                className="font-medium md:text-xl"
                >
                    RMD {Number(product.startingPrice).toLocaleString("en-US")}
                </span>
                <div className="flex space-x-3">
                    <select name="" id=""></select>型号
                    <select name="" id=""></select>颜色
                    <select name="" id=""></select>存储
                    <button>加入购物车</button>
                </div>
            </div>
        </div>
    )
}