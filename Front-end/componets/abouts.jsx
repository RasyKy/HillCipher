import React from 'react'

const Abouts = () => {
  return (
    <div className="flex flex-col xl:flex-row gap-8 justify-center xl:gap-x-20">

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

  )
}

export default Abouts
