import React, { useState, useEffect } from "react";

function MatrixInput({ keyMatrix, updateMatrix, onClear, onFillZero, updateSize }) {
  const [size, setSize] = useState(Math.sqrt(keyMatrix.length));

  // Handle size change and update parent component's matrix
  const handleSizeChange = (e) => {
    let newSize = parseInt(e.target.value, 10);
    if (isNaN(newSize) || newSize < 1) return; // ignore invalid size

    if (newSize > 5) newSize = 5; // optional max size limit
    if (newSize < 2) newSize = 2; // optional min size limit

    setSize(newSize);
    updateSize(newSize); // tell parent to resize the matrix accordingly
  };

  // Calculate rows and columns (square matrix)
  const totalCells = size * size;

  // Make sure keyMatrix has right length (fallback)
  const matrixValues = keyMatrix.length === totalCells ? keyMatrix : Array(totalCells).fill(0);

  return (
    <div className="flex xl:flex-row gap-6 mb-5">
      <div className="grid" style={{ gridTemplateColumns: `repeat(${size}, 5rem)`, gap: '1rem' }}>
        {matrixValues.map((val, idx) => (
          <input
            key={idx}
            className="w-20 text-black outline-0 h-9 bg-stone-300 p-2"
            value={val}
            onChange={(e) => updateMatrix(idx, e.target.value)}
            type="number"
          />
        ))}
      </div>
      <div className="lg:flex-col self-center">
        <div className="flex items-center gap-2 mb-3">
          <label>
            Size:&nbsp;
            <input
              type="number"
              min="2"
              max="5"
              value={size}
              onChange={handleSizeChange}
              className="w-16 h-7 text-black outline-0 bg-stone-300 p-1"
            />
          </label>
        </div>
        <div className="grid grid-cols-2 gap-x-3 xl:gap-x-0 gap-y-2 max-w-fit">
          <button onClick={onClear} className="bg-[#0891b2] text-white w-25 px-3 py-1">
            Clear
          </button>
          <button disabled className="bg-gray-400 text-white w-25 px-3 py-1">
            Resize
          </button>
          <button onClick={onFillZero} className="bg-[#0891b2] text-white w-25 px-3 py-1">
            Fill 0
          </button>
        </div>
      </div>
    </div>
  );
}

export default MatrixInput;
