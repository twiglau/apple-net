export default function Skeleton() {
    return (
        <div className="min-h-screen bg-apple-gray-100 dark:bg-apple-dark
        flex items-center justify-center p-8
        ">
            <div className="w-full max-w-2xl space-y-6">
                {/* 大标题骨架 */}
                <div className="h-10 bg-apple-gray-300 rounded-xl animate-pulse" />
                {/* 图片骨架 */}
                <div className="w-full h-64 bg-apple-gray-300 rounded-xl animate-pulse"/>
                {/* 三段文字骨架 */}
                <div className="space-y-4">
                    <div className="h-6 bg-apple-gray-300 rounded-xl animate-pulse" />
                    <div className="h-6 bg-apple-gray-300 rounded-xl animate-pulse w-3/4" />
                    <div className="h-6 bg-apple-gray-300 rounded-xl animate-pulse w-1/2" />
                </div>
                {/* 按钮骨架 */}
                <div className="h-12 bg-apple-gray-300 rounded-xl animate-pulse w-1/3" />
            </div>
        </div>
    )
}