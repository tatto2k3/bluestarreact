import { useState } from "react";

export default function Passenger() {
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  const handleChange = (type, operation) => {
    if (type === "adults") {
      setAdults((prev) => Math.max(1, operation === "increase" ? prev + 1 : prev - 1));
    } else if (type === "children") {
      setChildren((prev) => Math.max(0, operation === "increase" ? prev + 1 : prev - 1));
    }
  };

  return (
    <div className="p-4 w-80 border rounded-lg shadow-md bg-white">
      <label className="text-lg font-semibold text-gray-700">Hành Khách</label>
      <div className="mt-2 space-y-3">
        <div className="flex justify-between items-center">
          <span>Người lớn</span>
          <div className="flex items-center space-x-2">
            <button className="px-2 py-1 border rounded bg-gray-200" onClick={() => handleChange("adults", "decrease")}>
              -
            </button>
            <input type="text" className="w-10 text-center border rounded-md" value={adults} readOnly />
            <button className="px-2 py-1 border rounded bg-gray-200" onClick={() => handleChange("adults", "increase")}>
              +
            </button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span>Trẻ em</span>
          <div className="flex items-center space-x-2">
            <button className="px-2 py-1 border rounded bg-gray-200" onClick={() => handleChange("children", "decrease")}>
              -
            </button>
            <input type="text" className="w-10 text-center border rounded-md" value={children} readOnly />
            <button className="px-2 py-1 border rounded bg-gray-200" onClick={() => handleChange("children", "increase")}>
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}