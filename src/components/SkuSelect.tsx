
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
              w-24 py-2 px-3
              bg-none bg-no-repeat appearance-none
              pr-8
              dark:border-apple-gray-800
              text-apple-text-light
              dark:text-apple-text-dark
            "
            onChange={e => onChange(e.target.value)}
            value={value || ''}
            >
                <option value="">{placeholder}</option>
                {options.map((option) => (
                    <option key={option} value={option}>
                        {options}
                    </option>
                ))}
            </select>
            <div className="absolute top-1/2 right-2 transform -translate-y-1/2">
              <IoIosArrowDropdown className="size-4 text-apple-text-light dark:text-apple-text-dark" />
            </div>
        </div>
    )
}