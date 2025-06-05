import { useEffect, useState } from "react";
import InputField from "../components/InputField";

export default function DemoReact() {
  const [number1, setNumber1] = useState<number>(0);
  const [number2, setNumber2] = useState<number>(0);
  const [result, setResult] = useState<number>(0);

  useEffect(() => {
    setResult(number1 + number2);
  })

  return (
    <div className="flex flex-row items-center space-x-20 justify-center bg-white p-20 h-[100vh]">
      <div>
      <InputField
        placeholder="10"
        label="Número 1"
        type="number"
        id="number1"
        value={`${number1}`}
        onChange={(e) => setNumber1(Number(e.target.value))}
        ></InputField>
      <InputField
        placeholder=""
        label="Número 2"
        type="number"
        id="number2"
        value={`${number2}`}
        onChange={(e) => setNumber2(Number(e.target.value))}
      ></InputField>
      </div>
      <div className="mt-4">
        <span className="text-4xl font-semibold shadow-xl rounded-full shadow-blue-200 p-8 pl-10 pr-10">{result}</span>
      </div>
    </div>
  );
}
