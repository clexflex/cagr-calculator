import React, { useState } from 'react';
import { Calculator, RotateCcw, RefreshCw } from 'lucide-react';

const CAGRCalculator = () => {
  const [values, setValues] = useState({
    cagr: '',
    periods: '',
    initialValue: '',
    finalValue: ''
  });
  const [error, setError] = useState('');

  const calculateValues = () => {
    const { cagr, periods, initialValue, finalValue } = values;
    
    if (!cagr || !periods || (!initialValue && !finalValue)) {
      setError('Please fill in CAGR, periods, and either initial or final value');
      return;
    }

    if (parseFloat(cagr) <= -100) {
      setError('CAGR must be greater than -100%');
      return;
    }

    if (parseFloat(periods) <= 0) {
      setError('Number of periods must be greater than zero');
      return;
    }

    try {
      if (initialValue && !finalValue) {
        const fv = parseFloat(initialValue) * Math.pow(1 + parseFloat(cagr) / 100, parseFloat(periods));
        setValues(prev => ({ ...prev, finalValue: fv.toFixed(2) }));
      } else if (!initialValue && finalValue) {
        const iv = parseFloat(finalValue) / Math.pow(1 + parseFloat(cagr) / 100, parseFloat(periods));
        setValues(prev => ({ ...prev, initialValue: iv.toFixed(2) }));
      }
      setError('');
    } catch (err) {
      setError('Calculation error. Please check your inputs.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'initialValue' ? { finalValue: '' } : {}),
      ...(name === 'finalValue' ? { initialValue: '' } : {})
    }));
  };

  const clearCalculator = () => {
    setValues({
      cagr: '',
      periods: '',
      initialValue: '',
      finalValue: ''
    });
    setError('');
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-2">
          <Calculator className="h-6 w-6 text-blue-500" />
          <h2 className="text-xl font-bold text-gray-900">CAGR Calculator</h2>
        </div>
        <p className="text-sm text-gray-500 mb-6">
          Calculate Initial or Final Value based on CAGR
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              CAGR (%)
            </label>
            <input
              type="number"
              name="cagr"
              value={values.cagr}
              onChange={handleInputChange}
              placeholder="Enter CAGR percentage"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Number of Periods (Years)
            </label>
            <input
              type="number"
              name="periods"
              value={values.periods}
              onChange={handleInputChange}
              placeholder="Enter number of years"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Initial Value (₹)
            </label>
            <input
              type="number"
              name="initialValue"
              value={values.initialValue}
              onChange={handleInputChange}
              placeholder="Enter initial value"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
              disabled={!!values.finalValue}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Final Value (₹)
            </label>
            <input
              type="number"
              name="finalValue"
              value={values.finalValue}
              onChange={handleInputChange}
              placeholder="Enter final value"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
              disabled={!!values.initialValue}
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <div className="flex gap-2 mt-6">
            <button
              onClick={calculateValues}
              className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Calculate
            </button>
            <button
              onClick={clearCalculator}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 inline-flex items-center gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Clear
            </button>
            <button
              onClick={() => {
                clearCalculator();
                calculateValues();
              }}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 inline-flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CAGRCalculator;