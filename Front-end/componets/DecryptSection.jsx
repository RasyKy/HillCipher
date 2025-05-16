import React from 'react';
import MatrixInput from './MatrixInput';
import AlphabetOptions from './AlphabetOptions';

export default function DecryptSection({
  ciphertext,
  setCiphertext,
  keyMatrix,
  updateMatrix,
  handleDecrypt,
  decryptResult,
  setKeyMatrix,
  alphabetOption,
  setAlphabetOption
}) {
    
  return (
    <div className="flex-1 space-y-2 text-left max-w-120">
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

        <div className="flex xl:flex-row gap-6 mb-5">
          <div className="grid grid-cols-2 gap-x-8 gap-y-5 max-w-fit">
            {keyMatrix.map((val, idx) => (
              <input
                key={idx}
                className="w-20 text-black outline-0 h-9 bg-stone-300 p-2"
                value={val}
                onChange={(e) => updateMatrix(idx, e.target.value)}
              />
            ))}
          </div>

          <div className="lg:flex-col self-center">
            <div className="flex items-center gap-2">
              <span>R</span>
              <input className="w-16 h-7 text-black bg-stone-300 outline-0 p-1" readOnly value="2" />
              <span>xC</span>
              <input className="w-16 h-7 text-black bg-stone-300 outline-0 p-1" readOnly value="2" />
            </div>

            <div className="grid grid-cols-2 gap-x-3 xl:gap-x-0 gap-y-2 mt-2 max-w-fit">
              <button onClick={() => setKeyMatrix(['', '', '', ''])} className="bg-[#0891b2] text-white w-25 px-3 py-1">Clear</button>
              <button disabled className="bg-gray-400 text-white w-25 px-3 py-1">Resize</button>
              <button onClick={() => setKeyMatrix(['0', '0', '0', '0'])} className="bg-[#0891b2] text-white w-25 px-3 py-1">Fill 0</button>
            </div>
          </div>
        </div>

        <div className="space-y-1 mt-2 text-sm mb-5">
          <div><input type="radio" name="alphabet-dec" value="A0_26" checked={alphabetOption === 'A0_26'} onChange={(e) => setAlphabetOption(e.target.value)} /> Alphabet (26 let. A=0)</div>
          <div><input type="radio" name="alphabet-dec" value="A1_26" checked={alphabetOption === 'A1_26'} onChange={(e) => setAlphabetOption(e.target.value)} /> Alphabet (26 let. A=1)</div>
          <div><input type="radio" name="alphabet-dec" value="A0_27" checked={alphabetOption === 'A0_27'} onChange={(e) => setAlphabetOption(e.target.value)} /> Alphabet (27 char. A=0)</div>
          <div><input type="radio" name="alphabet-dec" value="A1_27" checked={alphabetOption === 'A1_27'} onChange={(e) => setAlphabetOption(e.target.value)} /> Alphabet (27 char. A=1)</div>
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
