import React, { createContext, useState } from 'react';

interface IAuthorisationContext {
  isAuthorised: boolean,
  changeAuthorisationStatus: () => void,
}

export const AuthorisationContext = createContext<IAuthorisationContext>({
  isAuthorised: false,
  changeAuthorisationStatus: () => { },
});

export const AuthorisationState = ({ children }: { children: React.ReactNode }) => {
  const [isAuthorised, setChangeAuthorisationStatus] = useState(false);

  const changeAuthorisationStatus = () => {
    setChangeAuthorisationStatus(!isAuthorised);
  };

  return (
    <AuthorisationContext.Provider value={{ isAuthorised, changeAuthorisationStatus }}>
      {children}
    </AuthorisationContext.Provider>
  )
};
