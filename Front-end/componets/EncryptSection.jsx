import MatrixInput from "./MatrixInput";
import AlphabetOptions from "./AlphabetOptions";
function EncryptSection({
    plaintext, setPlaintext, keyMatrix, updateMatrix,
    handleEncrypt, encryptResult, alphabetOption, setAlphabetOption,
    matrixSize, setMatrixSize, handleMatrixResize
}) {
  // Calculate grid class based on matrix size
  const getGridCols = () => {
    return matrixSize === 2 ? "grid-cols-2" : "grid-cols-3";
  };

  return (
    <div className="w-full max-w-md sm:max-w-lg md:max-w-xl space-y-2 text-left">
      <h2 className="text-3xl font-bold">Hill Encoder</h2>
      <div>
        <label className="block text-xl font-semibold mb-2">
          Hill Plaintext
        </label>
        <textarea
          value={plaintext}
          onChange={(e) => setPlaintext(e.target.value)}
          className="w-full text-black h-24 outline-0 bg-stone-300 p-2"
        />
      </div>
      <div>
        <h3 className="text-2xl font-bold">Key Matrix</h3>
        <p className="text-sm mb-5">NxN Matrix Key</p>

        {/* Matrix Size Selection */}
        <div className="mb-4">
          <label className="block text-lg font-semibold mb-2">
            Matrix Size
          </label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="matrixSize"
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
                name="matrixSize"
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
              onClick={() => updateMatrix("clear")}
              className="bg-[#0891b2] text-white w-25 px-3 py-1"
            >
              Clear
            </button>
            <button
              onClick={() => updateMatrix("fill", "0")}
              className="bg-[#0891b2] text-white w-25 px-3 py-1"
            >
              Fill 0
            </button>
          </div>
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
        <div className="lg:flex-col self-center"></div>
      </div>

      <AlphabetOptions
        alphabetOption={alphabetOption}
        setAlphabetOption={setAlphabetOption}
        namePrefix="alphabet"
      />

      <button
        onClick={handleEncrypt}
        className="bg-[#0891b2] text-white px-6 py-1 mt-2"
      >
        ▶ Encrypt
      </button>

      <div>
        <h3 className="text-2xl font-bold mb-2">Output</h3>
        <textarea
          className="w-full h-24 text-black outline-0 bg-stone-300 p-2"
          value={encryptResult}
          readOnly
        />
      </div>
    </div>
  );
}
export default EncryptSection;
