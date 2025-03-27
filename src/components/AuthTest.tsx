"use client"
import { useSession } from 'next-auth/react';
import { useState } from 'react';

export default function AuthTest() {
  const { data: session } = useSession();
  const [apiResponse, setApiResponse] = useState<string>('');

  // Test protected API endpoint
  const testProtectedApi = async () => {
    try {
      const res = await fetch('/api/user/profile');
      const data = await res.json();
      setApiResponse(JSON.stringify(data, null, 2));
    } catch (error) {
      setApiResponse('Error accessing protected API');
    }
  };

  return (
    <div className="p-4 space-y-4">
      <div className="bg-gray-100 p-4 rounded">
        <h2 className="font-bold">Current Auth Status:</h2>
        <pre className="mt-2 bg-white p-2 rounded">
          {JSON.stringify({ 
            authenticated: !!session,
            user: session?.user 
          }, null, 2)}
        </pre>
      </div>

      <div className="space-y-2">
        <h2 className="font-bold">Test Protected Routes:</h2>
        <div className="space-x-2">
          <a 
            href="/dashboard"
            className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Access Dashboard
          </a>
          <a 
            href="/account"
            className="inline-block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Access Account
          </a>
          <button
            onClick={testProtectedApi}
            className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
          >
            Test Protected API
          </button>
        </div>
      </div>

      {apiResponse && (
        <div className="bg-gray-100 p-4 rounded">
          <h2 className="font-bold">API Response:</h2>
          <pre className="mt-2 bg-white p-2 rounded">{apiResponse}</pre>
        </div>
      )}

      <div className="space-y-2">
        <h2 className="font-bold">Auth Pages (when logged in, redirects to dashboard):</h2>
        <div className="space-x-2">
          <a 
            href="/auth/login"
            className="inline-block bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Try Access Login
          </a>
          <a 
            href="/auth/register"
            className="inline-block bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Try Access Register
          </a>
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-600">
        <p>What happens:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>If not authenticated, protected pages redirect to login</li>
          <li>If not authenticated, protected APIs return 401</li>
          <li>If authenticated, auth pages redirect to dashboard</li>
        </ul>
      </div>
    </div>
  );
} 