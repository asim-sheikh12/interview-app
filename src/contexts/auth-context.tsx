import React from 'react';

import type { IRecruiter } from '@/backend/interfaces';

export const AuthContext = React.createContext<any | null>(null);

type IProps = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: IProps) => {
  const [userData, setUserData] = React.useState<IRecruiter>();

  return (
    <AuthContext.Provider value={{ userData, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
