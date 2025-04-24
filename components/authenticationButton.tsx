'use client';

import { usePrivy } from '@privy-io/react-auth';
import * as React from 'react';

export function AuthButtons() {
  const { login, logout, user } = usePrivy();

  // Helper to shorten a DID or UUID
  const truncate = (str: string, length = 8) =>
    str.length > length ? `${str.slice(0, length)}…` : str;

  return (
    <div
      style={{
        display: 'flex',
        backgroundColor: '#000012', // bg-white
        alignItems: 'flex-center',
        justifyContent: 'space-between',
        gap: '1rem',          // space-x-4 → 1rem
        padding: '0.5rem',    // p-2 → 0.5rem
      }}
    >
      {!user && (
        <button
        onClick={login}
        aria-label="Log in"
        style={{
            marginLeft: "auto",
            backgroundColor: '#EF4444',   // bg-red-500
            color: '#FFFFFF',             // text-white
            fontWeight: 500,              // font-medium
            padding: '0.5rem 1rem',       // py-2 px-4
            border: 'none',
            borderRadius: '0.25rem',      // rounded
            cursor: 'pointer',
            transition: 'background-color 0.2s, box-shadow 0.2s',
          }}
        >
          Login
        </button>
      )}

      {user && (
        <>
          <button
            onClick={logout}
            aria-label="Log out"
            style={{
              marginLeft: 'auto',
              backgroundColor: '#3B82F6',   // bg-blue-500
              color: '#FFFFFF',
              fontWeight: 500,
              padding: '0.5rem 1rem',
              border: 'none',
              borderRadius: '0.25rem',
              cursor: 'pointer',
              transition: 'background-color 0.2s, box-shadow 0.2s',
            }}
          >
            Logout
          </button>
          <span
            aria-label="User ID"
            title={user.id}
            style={{
              backgroundColor: '#F3F4F6',   // bg-gray-100
              color: '#1F2937',             // text-gray-800
              padding: '0.25rem 0.75rem',   // py-1 px-3
              borderRadius: '9999px',       // rounded-full
              fontSize: '0.875rem',         // text-sm
              fontFamily: 'monospace',      // font-mono
              display: 'inline-block',
            }}
          >
            {truncate(user.id, 12)}
          </span>
        </>
      )}
    </div>
  );
}
