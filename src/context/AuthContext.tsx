
'use client';

import type { ReactNode } from 'react';
import React, { createContext, useContext, useState, useMemo } from 'react';

export type UserRole = 'client' | 'lawyer';

interface AuthContextType {
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  // Add other auth-related states and functions here if needed
  // e.g., isAuthenticated, userDetails, login, logout
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  // Default to 'client' for simulation, replace with actual auth logic
  const [userRole, setUserRole] = useState<UserRole>('client');

  const value = useMemo(() => ({
    userRole,
    setUserRole,
  }), [userRole]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
