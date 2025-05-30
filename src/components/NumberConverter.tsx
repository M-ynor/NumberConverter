import React, { useState } from "react";

type BaseType = "decimal" | "binary" | "octal" | "hexadecimal";

const parseToDecimal = (value: string, base: BaseType): number | null => {
  try {
    switch (base) {
      case "binary":
        return parseInt(value.replace(/^0b/i, ""), 2);
      case "octal":
        return parseInt(value.replace(/^0o/i, ""), 8);
      case "hexadecimal":
        return parseInt(value.replace(/^0x/i, ""), 16);
      case "decimal":
        return parseInt(value, 10);
      default:
        return null;
    }
  } catch {
    return null;
  }
};

export const NumberConverter: React.FC = () => {
  const [input, setInput] = useState("");
  const [base, setBase] = useState<BaseType>("decimal");
  const [decimalValue, setDecimalValue] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.trim();
    setInput(val);
    const dec = parseToDecimal(val, base);
    setDecimalValue(isNaN(dec as number) ? null : dec);
  };

  const handleBaseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBase(e.target.value as BaseType);
    const dec = parseToDecimal(input, e.target.value as BaseType);
    setDecimalValue(isNaN(dec as number) ? null : dec);
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="bg-white/90 rounded-3xl shadow-2xl p-10 w-full max-w-2xl">
          <h1 className="text-3xl font-extrabold text-center text-indigo-700 mb-8 tracking-tight">Conversor de Números</h1>
          <div className="flex gap-4 mb-6">
            <input
              type="text"
              placeholder="Introduce el número"
              value={input}
              onChange={handleChange}
              className="w-full p-4 border-2 border-indigo-200 rounded-xl focus:outline-none focus:border-indigo-500 text-lg transition"
            />
            <select
              value={base}
              onChange={handleBaseChange}
              className="p-4 border-2 border-indigo-200 rounded-xl text-lg focus:outline-none focus:border-indigo-500 bg-white"
            >
              <option value="decimal">Decimal</option>
              <option value="binary">Binario</option>
              <option value="octal">Octal</option>
              <option value="hexadecimal">Hexadecimal</option>
            </select>
          </div>

          {decimalValue !== null ? (
            <div className="flex flex-col items-center">
              <span className="mb-4 px-4 py-1 rounded-full bg-indigo-100 text-indigo-700 font-semibold text-base shadow-sm">
                Base seleccionada: <strong className="capitalize">{base}</strong>
              </span>
              <table className="table-auto border-collapse shadow-lg rounded-xl overflow-hidden bg-white text-lg mx-auto min-w-[340px]">
                <thead>
                  <tr className="bg-indigo-50">
                    <th className="border-b-2 border-indigo-200 px-6 py-3 text-left font-semibold text-indigo-700">Sistema</th>
                    <th className="border-b-2 border-indigo-200 px-6 py-3 text-left font-semibold text-indigo-700">Valor</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-6 py-4 font-medium text-gray-700">Decimal</td>
                    <td className="px-6 py-4 max-w-[220px] truncate whitespace-nowrap text-gray-900">{decimalValue}</td>
                  </tr>
                  <tr className="bg-indigo-50/50">
                    <td className="px-6 py-4 font-medium text-gray-700">Binario</td>
                    <td className="px-6 py-4 max-w-[220px] truncate whitespace-nowrap text-gray-900">{decimalValue.toString(2)}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium text-gray-700">Octal</td>
                    <td className="px-6 py-4 max-w-[220px] truncate whitespace-nowrap text-gray-900">{decimalValue.toString(8)}</td>
                  </tr>
                  <tr className="bg-indigo-50/50">
                    <td className="px-6 py-4 font-medium text-gray-700">Hexadecimal</td>
                    <td className="px-6 py-4 max-w-[220px] truncate whitespace-nowrap text-gray-900">{decimalValue.toString(16).toUpperCase()}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : input && (
            <p className="text-red-500 mt-6 text-center text-lg font-semibold">El número es inválido para la base seleccionada.</p>
          )}
        </div>
      </div>
      <footer className="fixed bottom-0 left-0 w-full text-center text-black text-sm pb-2">
        <p>Hecho con ❤️ por Kevin Apataño.</p>
      </footer>
    </>
  );
};