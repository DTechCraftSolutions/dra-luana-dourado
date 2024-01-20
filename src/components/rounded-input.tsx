export function RoundedInput({
    type,
    id,
    name,
    placeholder,
    value,
    onChange,
    className
}: {
    type?: string;
    id?: string;
    name?: string;
    placeholder?: string;
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
}) {
    return (
        <div className="relative">
            <input
                type={type}
                id={id}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={`w-full rounded-full h-10 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${className}`}
            />
        </div>
    );
}