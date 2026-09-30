import { useContext } from 'react';
import { VersionContext } from '../context/VersionContext';
import { VersionContextType } from '../context/VersionContextType';

export const useVersion = (): VersionContextType => {
  const context = useContext(VersionContext);
  if (!context) {
    throw new Error('useVersion must be used within a VersionProvider');
  }
  return context;
};
