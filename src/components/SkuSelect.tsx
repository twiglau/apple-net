
import { IoIosArrowDropdown } from "react-icons/io";

interface SkuSelectProps {
    placeholder: string;
    options: string[];
    onChange: (value: string) => void;
    value?:string | null;
}
export default function SkuSelect({ placeholder, options, value, onChange }: SkuSelectProps) {


    return (
        <div className="w-24 relative">
            <select
            className="
              border border-apply-gray-200
              rounded-md
              w-18 py-2 px-3
              bg-none bg-no-repeat appearance-none
              pr-6
              dark:border-apple-gray-800
              text-apple-text-light
              dark:text-apple-text-dark
            "
            onChange={e => onChange(e.target.value)}
            value={value || ''}
            >
                <option value="-1">{placeholder}</option>
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
                <IoIosArrowDropdown className="size-4 text-apple-text-light dark:text-apple-text-dark" />
            </div>
        </div>
    )
}