import React, { useState } from 'react';
import axios from 'axios';
import EncryptSection from '../componets/EncryptSection';
import DecryptSection from '../componets/DecryptSection';
import Abouts from '../componets/abouts';

export default function App() {
  const [plaintext, setPlaintext] = useState('');
  const [ciphertext, setCiphertext] = useState('');
  const [keyMatrix, setKeyMatrix] = useState(['', '', '', '']);
  const [encryptResult, setEncryptResult] = useState('');
  const [decryptResult, setDecryptResult] = useState('');
  const [alphabetOption, setAlphabetOption] = useState('A0_26');

  const updateMatrix = (index, value) => {
    const updated = [...keyMatrix];
    updated[index] = value;
    setKeyMatrix(updated);
  };

  const handleEncrypt = async () => {
    try {
      const matrixParsed = keyMatrix.map(val => Number(val));
      const matrix2x2 = [
        [matrixParsed[0], matrixParsed[1]],
        [matrixParsed[2], matrixParsed[3]],
      ];
      const res = await axios.post('http://127.0.0.1:8000/api/cipher/', {
        text: plaintext,
        matrix: matrix2x2,
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
      const matrixParsed = keyMatrix.map(val => Number(val));
      const matrix2x2 = [
        [matrixParsed[0], matrixParsed[1]],
        [matrixParsed[2], matrixParsed[3]],
      ];
      const res = await axios.post('http://127.0.0.1:8000/api/cipher/', {
        text: ciphertext,
        matrix: matrix2x2,
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
    <div className="min-h-screen flex justify-center items-center flex-col mt-10 xl:mt-0 bg-[#fffef6] text-[#0891b2] font-mono p-4 md:p-10">
      <h1 className="text-4xl md:text-6xl font-bold text-center mb-10">Hill Cipher</h1>
      <div className="flex flex-col xl:flex-row gap-8 justify-center xl:gap-x-20">
        <EncryptSection
          plaintext={plaintext}
          setPlaintext={setPlaintext}
          keyMatrix={keyMatrix}
          updateMatrix={updateMatrix}
          handleEncrypt={handleEncrypt}
          encryptResult={encryptResult}
          alphabetOption={alphabetOption}
          setAlphabetOption={setAlphabetOption}
        />
        <DecryptSection
          ciphertext={ciphertext}
          setCiphertext={setCiphertext}
          keyMatrix={keyMatrix}
          updateMatrix={updateMatrix}
          handleDecrypt={handleDecrypt}
          decryptResult={decryptResult}
          alphabetOption={alphabetOption}
          setAlphabetOption={setAlphabetOption}
        />
        <Abouts />
      </div>
    </div>
  );
}
