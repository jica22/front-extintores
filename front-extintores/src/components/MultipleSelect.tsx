import Select from "react-select";
import makeAnimated from "react-select/animated";

interface Props {
    options: { value: string; label: string }[];
    value: string[];
    onChange: (valores: string[]) => void;
    label: string;
    placeholder?: string;
}

export default function MultipleSelect({ value, onChange, options, label, placeholder }: Props) {
    const selected = options.filter(opt => value.includes(opt.value));

    const handleChange = (selectedOptions: any) => {
        const values = selectedOptions.map((opt: any) => opt.value);
        onChange(values);
    };

    return (
        <div className="w-full max-w-md mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>
            <Select
                components={makeAnimated()}
                isMulti
                options={options}
                value={selected}
                onChange={handleChange}
                className="text-sm"
                classNamePrefix="select"
                placeholder={placeholder || "Selecione..."}
            />
        </div>
    );
}