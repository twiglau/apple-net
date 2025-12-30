

export default function SelectTitle({ title, desc }: { title: string; desc: string }) {
    return (
        <div className="flex items-center gap-2">
            <h2 className="text-2xl font-semibold">{title}</h2>
            <p className="text-lg text-gray-600 font-semibold">{desc}</p>
        </div>
    )
}