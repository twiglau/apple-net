

const FilterButton = ({
    filter,
    isSelected,
    onClick
}: {filter: string, isSelected: boolean, onClick: () => void}) => (
    <button
    onClick={onClick}
    className={`px-4 py-2
         ${isSelected 
            ? 'bg-apple-blue text-apple-white' 
            : 'bg-apple-gray-300 text-apple-text-dark'
        }
    `}
    >
        {filter}
    </button>
)

export default FilterButton;
