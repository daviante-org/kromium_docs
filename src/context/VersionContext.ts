import { createContext } from 'react';
import { VersionContextType } from './VersionContextType';

export const VersionContext = createContext<VersionContextType | undefined>(undefined);
