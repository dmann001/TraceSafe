import { useState, useEffect } from 'react';
import { testConnection } from '../api/testApi';

const TestConnection = () => {
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const checkConnection = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await testConnection();
      setMessage(response.message);
    } catch (err) {
      setError('Failed to connect to backend. Please make sure the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkConnection();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Backend Connection Test</h2>
      {loading && <p>Testing connection...</p>}
      {message && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          {message}
        </div>
      )}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
      <button
        onClick={checkConnection}
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Test Connection Again
      </button>
    </div>
  );
};

export default TestConnection; 