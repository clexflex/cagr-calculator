import React, { useState, useEffect } from 'react';
import { Calculator, RotateCcw, Moon, Sun } from 'lucide-react';
// import './styles.css'; // For additional styling, including dark mode

// Debounce Hook for optimized input handling
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const CAGRCalculator = () => {
  const [values, setValues] = useState({
    cagr: '',
    periods: '',
    initialValue: '',
    finalValue: '',
  });
  const [lastEdited, setLastEdited] = useState(null);
  const [errors, setErrors] = useState({});
  const [darkMode, setDarkMode] = useState(false);

  const debouncedValues = useDebounce(values, 300); // Debounce for performance

  const validateInput = (name, value) => {
    if (value < 0) return `${name} cannot be negative.`;
    if (name === 'periods' && value === '0') return 'Periods must be greater than zero.';
    return '';
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const error = validateInput(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));

    setLastEdited(name);
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    calculateMissingField();
  }, [debouncedValues]);

  const calculateMissingField = () => {
    const { cagr, periods, initialValue, finalValue } = debouncedValues;

    if ([cagr, periods, initialValue, finalValue].filter((val) => val).length < 3) return;

    try {
      if (lastEdited !== 'cagr' && periods && initialValue && finalValue) {
        const calculatedCAGR =
          (Math.pow(parseFloat(finalValue) / parseFloat(initialValue), 1 / parseFloat(periods)) - 1) * 100;
        setValues((prev) => ({ ...prev, cagr: calculatedCAGR.toFixed(2) }));
      } else if (lastEdited !== 'periods' && cagr && initialValue && finalValue) {
        const calculatedPeriods =
          Math.log(parseFloat(finalValue) / parseFloat(initialValue)) / Math.log(1 + parseFloat(cagr) / 100);
        setValues((prev) => ({ ...prev, periods: calculatedPeriods.toFixed(2) }));
      } else if (lastEdited !== 'initialValue' && cagr && periods && finalValue) {
        const calculatedInitialValue =
          parseFloat(finalValue) / Math.pow(1 + parseFloat(cagr) / 100, parseFloat(periods));
        setValues((prev) => ({ ...prev, initialValue: calculatedInitialValue.toFixed(2) }));
      } else if (lastEdited !== 'finalValue' && cagr && periods && initialValue) {
        const calculatedFinalValue =
          parseFloat(initialValue) * Math.pow(1 + parseFloat(cagr) / 100, parseFloat(periods));
        setValues((prev) => ({ ...prev, finalValue: calculatedFinalValue.toFixed(2) }));
      }
    } catch (error) {
      console.error('Calculation Error:', error);
    }
  };

  const clearCalculator = () => {
    setValues({ cagr: '', periods: '', initialValue: '', finalValue: '' });
    setErrors({});
    setLastEdited(null);
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <div className={`${darkMode ? 'dark bg-gray-900 text-white' : 'bg-white text-gray-900'} w-full max-w-md mx-auto rounded-xl shadow-lg overflow-hidden`}>
      <div className="p-6">
        <div className="flex items-center gap-2 mb-2">
          <Calculator className="h-6 w-6 text-blue-500" />
          <h2 className="text-xl font-bold">CAGR Calculator</h2>
        </div>
        <button
          onClick={toggleDarkMode}
          className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 focus:outline-none"
        >
          {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          Toggle {darkMode ? 'Light' : 'Dark'} Mode
        </button>
        <p className="text-sm mb-6">Enter any three fields to dynamically calculate the fourth.</p>

        <div className="space-y-4">
          {['cagr', 'periods', 'initialValue', 'finalValue'].map((field, idx) => (
            <div key={idx}>
              <label className="block text-sm font-medium mb-1 capitalize">
                {field === 'cagr' ? 'CAGR (%)' : field === 'periods' ? 'Number of Periods (Years)' : field === 'initialValue' ? 'Initial Value (₹)' : 'Final Value (₹)'}
              </label>
              <input
                type="number"
                name={field}
                value={values[field]}
                onChange={handleInputChange}
                placeholder={`Enter ${field === 'cagr' ? 'CAGR percentage' : field === 'periods' ? 'number of years' : field === 'initialValue' ? 'initial value' : 'final value'}`}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors[field] && <p className="text-sm text-red-500 mt-1">{errors[field]}</p>}
            </div>
          ))}
        </div>

        <div className="flex gap-2 mt-6">
          <button
            onClick={clearCalculator}
            className="px-4 py-2 border  border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <RotateCcw className="h-4 w-4 " /> Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default CAGRCalculator;
