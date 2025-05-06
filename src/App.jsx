import React, { useState } from 'react';
import axios from 'axios';

export default function App() {
  const [plaintext, setPlaintext] = useState('');
  const [ciphertext, setCiphertext] = useState('');
  const [keyMatrix, setKeyMatrix] = useState(["","","",""]);
  const [encryptResult, setEncryptResult] = useState('');
  const [decryptResult, setDecryptResult] = useState('');
  const [alphabetOption, setAlphabetOption] = useState('A0_26');

  const handleEncrypt = async () => {
    console.log(plaintext)
    console.log(keyMatrix)
    try {
      const res = await axios.post('http://127.0.0.1:5000/encrypt', {
        "plaintext": plaintext,
        "matrix": keyMatrix,
      });

      setEncryptResult(res.data.result);
    } catch (err) {
      alert('Encryption error: ' + (err.response?.data?.error || err.message));
    }
  };

  const handleDecrypt = async () => {
    try {
      const res = await axios.post('http://127.0.0.1:5000/decrypt', {
        ciphertext,
        matrix: keyMatrix.map(Number),
        alphabet: alphabetOption,
      });
      setDecryptResult(res.data.result);
    } catch (err) {
      alert('Decryption error: ' + (err.response?.data?.error || err.message));
    }
  };

  const updateMatrix = (index, value) => {
    const numberArray = value.split(',').map(num => Number(num.trim()));
    const updated = [...keyMatrix];
    updated[index] = numberArray;
    setKeyMatrix(updated);
  };  

  return (
    <div className="min-h-screen flex justify-center items-center flex-col mt-10 xl:mt-0 bg-[#fffef6] text-[#0891b2] font-mono p-4 md:p-10">
      <h1 className="text-4xl md:text-6xl font-bold text-center mb-10">Hill Cipher</h1>
      <div className="flex flex-col xl:flex-row gap-8 justify-center xl:gap-x-20">
        {/* Encoder Section */}
        <div className="flex-1 space-y-2 text-left max-w-120">
          <h2 className="text-3xl font-bold">Hill Encoder</h2>
          <div>
            <label className="block text-xl font-semibold mb-2">Hill Plaintext</label>
            <textarea
              value={plaintext}
              onChange={(e) => setPlaintext(e.target.value)}
              className="w-full text-black h-24 outline-0 bg-stone-300 p-2"
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
              {/* Matrix Options (can be wired later) */}
              <div className="lg:flex-col self-center">
                <div className="flex items-center gap-2">
                  <span>R</span>
                  <input className="w-16 h-7 text-black outline-0 bg-stone-300 p-1" readOnly value="2" />
                  <span>xC</span>
                  <input className="w-16 h-7 text-black outline-0 bg-stone-300 p-1" readOnly value="2" />
                </div>
                <div className="grid grid-cols-2 gap-x-3 xl:gap-x-0 gap-y-2 mt-2 max-w-fit">
                  <button onClick={() => setKeyMatrix([0,0,0,0])} className="bg-[#0891b2] text-white w-25 px-3 py-1">Clear</button>
                  <button disabled className="bg-gray-400 text-white w-25 px-3 py-1">Resize</button>
                  <button onClick={() => setKeyMatrix([0,0,0,0])} className="bg-[#0891b2] text-white w-25 px-3 py-1">Fill 0</button>
                </div>
              </div>
            </div>

            {/* Alphabet options */}
            <div className="space-y-1 mt-2 text-sm mb-5">
              <div><input type="radio" name="alphabet" value="A0_26" checked={alphabetOption === 'A0_26'} onChange={(e) => setAlphabetOption(e.target.value)} /> Alphabet (26 let. A=0)</div>
              <div><input type="radio" name="alphabet" value="A1_26" checked={alphabetOption === 'A1_26'} onChange={(e) => setAlphabetOption(e.target.value)} /> Alphabet (26 let. A=1)</div>
              <div><input type="radio" name="alphabet" value="A0_27" checked={alphabetOption === 'A0_27'} onChange={(e) => setAlphabetOption(e.target.value)} /> Alphabet (27 char. A=0)</div>
              <div><input type="radio" name="alphabet" value="A1_27" checked={alphabetOption === 'A1_27'} onChange={(e) => setAlphabetOption(e.target.value)} /> Alphabet (27 char. A=1)</div>
            </div>

            <button onClick={handleEncrypt} className="bg-[#0891b2] text-white px-6 py-1 mt-2">▶ Encrypt</button>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-2">Output</h3>
            <textarea
              className="w-full h-24 text-black outline-0 bg-stone-300 p-2"
              value={encryptResult}
              readOnly
            />
          </div>
        </div>

        {/* Decoder Section */}
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

        {/* About Section */}
        <div className="bg-stone-300 px-8 py-8 max-w-sm text-sm text-left">
          <h2 className="text-2xl font-bold mb-2">About Hill Cipher</h2>
          <p>
            The Hill Cipher is a classical polygraphic substitution cipher based on linear algebra. Invented by Lester S. Hill in 1929, it encrypts blocks of plaintext letters using matrix multiplication over a finite field.
          </p>
          <p className="mt-2">
            In this method, the plaintext is divided into vectors, which are multiplied by a key matrix to produce ciphertext vectors. Decryption involves multiplying the ciphertext vectors by the inverse of the key matrix.
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Encrypts multiple letters at once (polygraphic)</li>
            <li>Stronger than simple monoalphabetic ciphers</li>
            <li>Relies on invertible matrices modulo alphabet size</li>
          </ul>
          <p className="mt-2">
            To ensure correct decryption, the key matrix must be invertible in the chosen modulo (typically 26 for the English alphabet).
          </p>
        </div>
      </div>
    </div>
  );
}
