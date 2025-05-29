import React, { useState } from 'react';
import axios from 'axios';
import EncryptSection from '../componets/EncryptSection';
import DecryptSection from '../componets/DecryptSection';
import Abouts from '../componets/abouts';
import Totur from '../componets/totur'
import AboutUs from '../componets/aboutus'

export default function App() {
  const [plaintext, setPlaintext] = useState('');
  const [ciphertext, setCiphertext] = useState('');
  const [matrixSize, setMatrixSize] = useState(2);
  const [keyMatrix, setKeyMatrix] = useState(['', '', '', '']);
  const [encryptResult, setEncryptResult] = useState('');
  const [decryptResult, setDecryptResult] = useState('');
  const [alphabetOption, setAlphabetOption] = useState('A0_26');

  // const updateMatrix = (index, value) => {
  //   const updated = [...keyMatrix];
  //   updated[index] = value;
  //   setKeyMatrix(updated);
  // };

  const updateMatrix = (indexOrAction, valueOrFill) => {
    if (indexOrAction === 'clear') {
      // Clear all values
      setKeyMatrix(new Array(matrixSize * matrixSize).fill(''));
    } else if (indexOrAction === 'fill') {
      // Fill all with specific value
      setKeyMatrix(new Array(matrixSize * matrixSize).fill(valueOrFill));
    } else {
      // Update specific index
      const updated = [...keyMatrix];
      updated[indexOrAction] = valueOrFill;
      setKeyMatrix(updated);
    }
  };

    // Handle matrix size change
  const handleMatrixSizeChange = (newSize) => {
    if (newSize !== matrixSize) {
      setMatrixSize(newSize);
      // Initialize new matrix with empty values
      setKeyMatrix(new Array(newSize * newSize).fill(''));
    }
  };

  // Handle resize button (preserves existing values where possible)
  const handleMatrixResize = () => {
    const currentMatrix = [...keyMatrix];
    const newMatrix = new Array(matrixSize * matrixSize).fill('');
    
    // Copy existing values where they fit in the new matrix
    const oldSize = Math.sqrt(currentMatrix.length);
    for (let i = 0; i < currentMatrix.length; i++) {
      const row = Math.floor(i / oldSize);
      const col = i % oldSize;
      
      if (row < matrixSize && col < matrixSize) {
        newMatrix[row * matrixSize + col] = currentMatrix[i] || '';
      }
    }
    
    setKeyMatrix(newMatrix);
  };

  // Convert flat array to 2D matrix for API
  const convertToMatrix = (flatMatrix, size) => {
    const matrix = [];
    for (let i = 0; i < size; i++) {
      matrix[i] = [];
      for (let j = 0; j < size; j++) {
        matrix[i][j] = Number(flatMatrix[i * size + j]) || 0;
      }
    }
    return matrix;
  };

  const handleEncrypt = async () => {
    try {
      const matrix = convertToMatrix(keyMatrix, matrixSize);
      const res = await axios.post('https://hillcipher-18kq.onrender.com/api/cipher/', {
        text: plaintext,
        matrix: matrix,
        mode: 'encrypt',
        alphabet: alphabetOption,
      });
      setEncryptResult(res.data.result);
    } catch (err) {
      alert('Encryption error: ' + (err.response?.data?.error || err.message));
    }
  };

  const handleDecrypt = async () => {
    try {
      const matrix = convertToMatrix(keyMatrix, matrixSize);
      const res = await axios.post('https://hillcipher-18kq.onrender.com/api/cipher/', {
        text: ciphertext,
        matrix: matrix,
        mode: 'decrypt',
        alphabet: alphabetOption,
      });
      const cleanResult = res.data.result.replace(/X+$/, '');
      setDecryptResult(cleanResult);
    } catch (err) {
      alert('Decryption error: ' + (err.response?.data?.error || err.message));
    }
  };

  return (
    
    <div className="min-h-screen flex flex-col items-center mt-10 xl:mt-0 bg-[#F1F0E8] text-[#0891b2] font-mono p-4 md:p-10 font-Jersey">
    <h1 className="text-4xl md:text-6xl font-bold text-center mb-10">Hill Cipher</h1>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
  <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 justify-center">

    {/* Encrypt Section */}
    <div className="w-full lg:w-1/3 flex justify-center">
      <EncryptSection
        plaintext={plaintext}
        setPlaintext={setPlaintext}
        keyMatrix={keyMatrix}
        updateMatrix={updateMatrix}
        handleEncrypt={handleEncrypt}
        encryptResult={encryptResult}
        alphabetOption={alphabetOption}
        setAlphabetOption={setAlphabetOption}
        matrixSize={matrixSize}
        setMatrixSize={handleMatrixSizeChange}
      />
    </div>

    {/* Decrypt Section */}
    <div className="w-full lg:w-1/3 flex justify-center">
      <DecryptSection
        ciphertext={ciphertext}
        setCiphertext={setCiphertext}
        keyMatrix={keyMatrix}
        updateMatrix={updateMatrix}
        handleDecrypt={handleDecrypt}
        decryptResult={decryptResult}
        alphabetOption={alphabetOption}
        setAlphabetOption={setAlphabetOption}
        matrixSize={matrixSize}
        setMatrixSize={handleMatrixSizeChange}
      />
    </div>

    {/* About Section */}
    <div className="w-full lg:w-1/3 flex justify-center">
      <Abouts />
    </div>
  </div>
</div>
<Totur/>
<AboutUs/>
    </div>
  
  );
}
