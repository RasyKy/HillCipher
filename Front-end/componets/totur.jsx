import React from 'react'

const totur = () => {
  return (
    <div>
          <div className="p-6 bg-[#F1F0E8] shadow rounded-lg space-y-4" >
      <h1 className="text-3xl font-bold text-center">How the Hill Cipher Works</h1>

      <p>
        The Hill cipher is a polygraphic substitution cipher based on linear
        algebra. It uses matrix multiplication to encrypt blocks of letters.
        Here's how it works step-by-step using a 2×2 key matrix:
      </p>

      <ol className="list-decimal list-inside space-y-2">
        <li>
          <strong>Choose a key matrix:</strong> A 2×2 matrix with integer
          values, such as:
          <pre className="bg-stone-300 p-2 rounded mt-1">
{`[3  3]
[2  5]`}
          </pre>
          This matrix must be invertible modulo 26 (i.e., its determinant has an
          inverse modulo 26).
        </li>

        <li>
          <strong>Convert plaintext to numbers:</strong> Each letter is
          represented by a number (A=0, B=1, ..., Z=25). For example, "HI" becomes:
          <pre className="bg-stone-300 p-2 rounded mt-1">
{`H = 7
I = 8
Vector = [7, 8]`}
          </pre>
        </li>

        <li>
          <strong>Matrix multiplication:</strong> Multiply the key matrix by the
          plaintext vector:
          <pre className="bg-stone-300 p-2 rounded mt-1">
{`[3 3]   [7]   [(3×7 + 3×8) % 26]   [45 % 26]   [19]
[2 5] x [8] = [(2×7 + 5×8) % 26] = [54 % 26] = [2]`}
          </pre>
        </li>

        <li>
          <strong>Convert numbers back to letters:</strong> The resulting vector
          [19, 2] corresponds to the ciphertext "TC".
        </li>

        <li>
          <strong>Decryption:</strong> Multiply the inverse of the key matrix by
          the ciphertext vector, modulo 26, to recover the original plaintext.
        </li>
      </ol>

      <p className="text-sm text-stone-600">
        ⚠️ The key matrix must be invertible in mod 26. This means its determinant must be coprime with 26 (e.g., det = 1, 3, 5, 7, etc.).
      </p>
    </div>
    </div>
  )
}

export default totur
