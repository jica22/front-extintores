import React from "react";

interface InputFieldProps {
    label: string;
    id: string;
    name?: string;
    type?: string;
    placeholder?: string;
    value?: string;
    defaultValue?: string;
    accept?: string;
    className?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
    label,
    id,
    name,
    type = "text",
    placeholder = "",
    value,
    defaultValue = "",
    accept = "*",
    className = "",
    onChange,
}) => {
    return (
        <div>
            <label htmlFor={id} className="text-sm font-medium text-gray-700">
                {label}
            </label>
            <input
                name={name}
                type={type}
                id={id}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                defaultValue={defaultValue}
                accept={accept}
                className={`w-full border border-blue-300 p-2 mt-1 focus:outline-none focus:ring focus:ring-blue-400 transition-all duration-200 hover:border-blue-500 focus:border-blue-500 ${className}`}
            />
        </div>
    );
};

export default InputField;