import React from 'react';

export default function App() {
  return (
    <div className="min-h-screen flex justify-center items-center flex-col mt-10 xl:mt-0 bg-[#fffef6] text-[#0891b2] font-mono p-4 md:p-10">
      <h1 className="text-4xl md:text-6xl font-bold text-center mb-10">Hill Cipher</h1>
      <div className="flex flex-col  items-center xl:flex-row gap-8 justify-center xl:gap-x-20">
        {/* Encoder Section */}
        <div className="flex-1 space-y-2 text-left max-w-120">
          <h2 className="text-3xl font-bold">Hill Encoder</h2>
          <div>
            <label className="block text-xl font-semibold mb-2">Hill Plaintext</label>
            <textarea className="w-full text-black h-24 outline-0 bg-stone-300  p-2" />
          </div>

          <div>
            <h3 className="text-2xl font-bold">Key Matrix</h3>
            <p className="text-sm mb-5">NxN Matrix Key</p>
            <div className='flex xl:flex-row gap-6 mb-5'>
            <div className="grid grid-cols-2 gap-x-8 gap-y-5 over max-w-fit">
              <input className="w-20 text-black outline-0 h-9 bg-stone-300  p-2" />
              <input className="w-20 text-black outline-0 h-9 bg-stone-300  p-2" />
              <input className="w-20 text-black outline-0 h-9 bg-stone-300  p-2" />
              <input className="w-20 text-black outline-0 h-9 bg-stone-300  p-2" />
            </div>
            <div className='lg:flex-col self-center'>
            <div className="flex items-center gap-2">
              <span>R</span>
              <input className="w-16 h-7 text-black outline-0 bg-stone-300  p-1" />
              <span>xC</span>
              <input className="w-16 h-7 text-black outline-0 bg-stone-300  p-1" />
            </div>
            <div className="grid grid-cols-2 gap-x-3 xl:gap-x-0 gap-y-2 mt-2 max-w-fit">
              <button className="bg-[#0891b2] cursor-pointer text-white w-25 px-3 py-1 ">Clear</button>
              <button className="bg-[#0891b2] cursor-pointer ml-1 text-white w-25 px-3 py-1 ">Resize</button>
              <button className="bg-[#0891b2] cursor-pointer text-white w-25 px-3 py-1 ">Fill 0</button>
            </div>
            </div>
            
            </div>
            
            <div className="space-y-1 mt-2 text-sm mb-5">
              <div><input type="radio" name="alphabet" defaultChecked /> Alphabet (26 let. A=0) ABCDEFGHIJKLMNOPQRSTUVWXYZ</div>
              <div><input type="radio" name="alphabet" /> Alphabet (26 let. A=1) ZABCDEFGHIJKLMNOPQRSTUVWXY</div>
              <div><input type="radio" name="alphabet" /> Alphabet (27 char. A=0) ABCDEFGHIJKLMNOPQRSTUVWXYZ_</div>
              <div><input type="radio" name="alphabet" /> Alphabet (27 char. A=1) _ABCDEFGHIJKLMNOPQRSTUVWXYZ</div>
            </div>
            <button className="bg-[#0891b2] cursor-pointer text-white px-6 py-1 mt-2 ">▶ Encrypt</button>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-2">Output</h3>
            <textarea className="w-full h-24 text-black outline-0 bg-stone-300  p-2" />
          </div>
        </div>

        {/* Decoder Section */}
        <div className="flex-1 space-y-2 text-left max-w-120">
          <h2 className="text-3xl font-bold">Hill Decoder</h2>
          <div>
            <label className="block text-xl font-semibold mb-2">Hill Ciphertext</label>
            <textarea className="w-full text-black outline-0 h-24 bg-stone-300  p-2" />
          </div>

          <div>
            <h3 className="text-2xl font-bold">Key Matrix</h3>
            <p className="text-sm mb-5">NxN Matrix Key</p>
            <div className='flex lg:flex-row gap-6 mb-5'>
            <div className="grid grid-cols-2 gap-x-8 gap-y-5 over max-w-fit">
              <input className="w-20 text-black h-9 outline-0 bg-stone-300  p-2" />
              <input className="w-20 text-black h-9 outline-0 bg-stone-300  p-2" />
              <input className="w-20 text-black h-9 outline-0 bg-stone-300  p-2" />
              <input className="w-20 text-black h-9 outline-0 bg-stone-300  p-2" />
            </div>
            <div className='lg:flex-col self-center'>
            <div className="flex items-center gap-2">
              <span>R</span>
              <input className="w-16 h-7 text-black bg-stone-300 outline-0  p-1" />
              <span>xC</span>
              <input className="w-16 h-7 text-black bg-stone-300 outline-0  p-1" />
            </div>
            <div className="grid grid-cols-2 gap-x-3 xl:gap-x-0 gap-y-2 mt-2 max-w-fit">
              <button className="bg-[#0891b2] cursor-pointer text-white w-25 px-3 py-1 ">Clear</button>
              <button className="bg-[#0891b2] cursor-pointer ml-1 text-white w-25 px-3 py-1 ">Resize</button>
              <button className="bg-[#0891b2] cursor-pointer text-white w-25 px-3 py-1 ">Fill 0</button>
            </div>
            </div>
            
            </div>
            
            <div className="space-y-1 mt-2 text-sm mb-5">
              <div><input type="radio" name="alphabet-dec" defaultChecked /> Alphabet (26 let. A=0) ABCDEFGHIJKLMNOPQRSTUVWXYZ</div>
              <div><input type="radio" name="alphabet-dec" /> Alphabet (26 let. A=1) ZABCDEFGHIJKLMNOPQRSTUVWXY</div>
              <div><input type="radio" name="alphabet-dec" /> Alphabet (27 char. A=0) ABCDEFGHIJKLMNOPQRSTUVWXYZ_</div>
              <div><input type="radio" name="alphabet-dec" /> Alphabet (27 char. A=1) _ABCDEFGHIJKLMNOPQRSTUVWXYZ</div>
            </div>
            <button className="bg-[#0891b2] cursor-pointer text-white px-6 py-1 mt-2 ">▶ Decrypt</button>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-2">Output</h3>
            <textarea className="w-full text-black h-24 outline-0 bg-stone-300  p-2" />
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
