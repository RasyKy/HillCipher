function AlphabetOptions({ alphabetOption, setAlphabetOption, namePrefix }) {
    const options = [
      { value: 'A0_26', label: 'Alphabet (26 let. A=0)' },
      { value: 'A1_26', label: 'Alphabet (26 let. A=1)' },
      { value: 'A0_27', label: 'Alphabet (27 char. A=0)' },
      { value: 'A1_27', label: 'Alphabet (27 char. A=1)' },
    ];
  
    return (
      <div className="space-y-1 mt-2 text-sm mb-5">
        {options.map(opt => (
          <div key={opt.value}>
            <input
              type="radio"
              name={namePrefix}
              value={opt.value}
              checked={alphabetOption === opt.value}
              onChange={(e) => setAlphabetOption(e.target.value)}
            />
            {' '}{opt.label}
          </div>
        ))}
      </div>
    );
  }
  export default AlphabetOptions;  