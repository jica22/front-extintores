import React from "react";

interface InputFieldProps {
    label: string;
    id: string;
    type?: string;
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
    label,
    id,
    type = "text",
    placeholder = "",
    value,
    onChange,
}) => {
    return (
        <div>
            <label htmlFor={id} className="text-sm font-medium text-gray-700">
                {label}
            </label>
            <input
                type={type}
                id={id}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="w-full border border-blue-300 rounded-md p-2 mt-1 focus:outline-none focus:ring focus:ring-blue-400"
            />
        </div>
    );
};

export default InputField;