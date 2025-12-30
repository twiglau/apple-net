

export default function ProductHero({ imageUrl }: { imageUrl: string }) {
    return (
        <div className="w-full lg:w-2/3 h-[80vh] flex items-center justify-center">
            <img 
            className="size-full object-cover rounded-3xl"
            src={imageUrl} 
            alt="" 
            />
        </div>
    )
}