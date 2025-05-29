import React from 'react';

export default function DecryptSection({
    ciphertext, setCiphertext, keyMatrix, updateMatrix,
    handleDecrypt, decryptResult, alphabetOption, setAlphabetOption,
    matrixSize, setMatrixSize
}) {
    
  // Calculate grid class based on matrix size
    const getGridCols = () => {
      return matrixSize === 2 ? 'grid-cols-2' : 'grid-cols-3';
    };

  return (
    <div className="w-120 space-y-2 text-left max-w-120">
      <h2 className="text-3xl font-bold">Hill Decoder</h2>

      <div>
        <label className="block text-xl font-semibold mb-2">Hill Ciphertext</label>
        <textarea
          className="w-full text-black outline-0 h-24 bg-stone-300 p-2"
          value={ciphertext}
          onChange={(e) => setCiphertext(e.target.value)}
        />
      </div>

      <div>
        <h3 className="text-2xl font-bold">Key Matrix</h3>
        <p className="text-sm mb-5">NxN Matrix Key</p>

        {/* Matrix Size Selection */}
        <div className="mb-4">
          <label className="block text-lg font-semibold mb-2">Matrix Size</label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="matrixSizeDecrypt"
                value={2}
                checked={matrixSize === 2}
                onChange={(e) => setMatrixSize(parseInt(e.target.value))}
                className="mr-2"
              />
              2x2
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="matrixSizeDecrypt"
                value={3}
                checked={matrixSize === 3}
                onChange={(e) => setMatrixSize(parseInt(e.target.value))}
                className="mr-2"
              />
              3x3
            </label>
          </div>


          <div className="grid grid-cols-2 gap-x-3 xl:gap-x-0 gap-y-2 mt-2 max-w-fit">
              <button 
                onClick={() => updateMatrix('clear')} 
                className="bg-[#0891b2] text-white w-25 px-3 py-1"
              >
                Clear
              </button>
              <button 
                onClick={() => updateMatrix('fill', '0')} 
                className="bg-[#0891b2] text-white w-25 px-3 py-1"
              >
                Fill 0
              </button>
            </div>
        </div>

        <div className="flex xl:flex-row gap-6 mb-5">
          <div className={`grid ${getGridCols()} gap-x-4 gap-y-3 max-w-fit`}>
            {keyMatrix.map((val, idx) => (
              <input
                key={idx}
                className="w-16 text-black outline-0 h-9 bg-stone-300 p-2 text-center"
                value={val}
                onChange={(e) => updateMatrix(idx, e.target.value)}
              />
            ))}
          </div>
        </div>

        <div className="space-y-1 mt-2 text-sm mb-5">
          <div><input type="radio" name="alphabet-dec" value="A0_26" checked={alphabetOption === 'A0_26'} onChange={(e) => setAlphabetOption(e.target.value)} /> Alphabet (26 let. A=0) ABCDEFGHIJKLMNOPQRSTUVWXYZ</div>
          <div><input type="radio" name="alphabet-dec" value="A1_26" checked={alphabetOption === 'A1_26'} onChange={(e) => setAlphabetOption(e.target.value)} /> Alphabet (26 let. A=1) ZABCDEFGHIJKLMNOPQRSTUVWXY</div>
          <div><input type="radio" name="alphabet-dec" value="A0_27" checked={alphabetOption === 'A0_27'} onChange={(e) => setAlphabetOption(e.target.value)} /> Alphabet (27 char. A=0) ABCDEFGHIJKLMNOPQRSTUVWXYZ_</div>
          <div><input type="radio" name="alphabet-dec" value="A1_27" checked={alphabetOption === 'A1_27'} onChange={(e) => setAlphabetOption(e.target.value)} /> Alphabet (27 char. A=1) _ABCDEFGHIJKLMNOPQRSTUVWXYZ</div>
        </div>

        <button onClick={handleDecrypt} className="bg-[#0891b2] text-white px-6 py-1 mt-2">▶ Decrypt</button>
      </div>

      <div>
        <h3 className="text-2xl font-bold mb-2">Output</h3>
        <textarea
          className="w-full text-black h-24 outline-0 bg-stone-300 p-2"
          value={decryptResult}
          readOnly
        />
      </div>
    </div>
  );
}
