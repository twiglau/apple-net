export default function TextHeader({
    title,
    description
}: {
    title: string;
    description: string;
}) {
    return (
        <div className="flex justify-between items-center
         px-4 md:px-16 py-2 md:py-8
        ">
            <h1 className="text-3xl md:text-5xl font-extrabold">{title}</h1>
            <p className="text-xl md:text-2xl font-semibold">{description}</p>
        </div>
    );
}