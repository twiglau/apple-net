import { AnimatePresence, motion as Motion } from "framer-motion";

export default function NumberPlay({ value }: { value: number }) {
    return (
        <div className="text-8xl font-bold overflow-hidden relative h-[1.2em]">
            <AnimatePresence mode="popLayout">
                <Motion.span
                    key={value}
                    className="inline-block"
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: "-100%", opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                    {value}
                </Motion.span>
            </AnimatePresence>
        </div>
    );
}