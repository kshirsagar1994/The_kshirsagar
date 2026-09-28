import React, { createContext, useContext, useState } from 'react';

export type CursorVariant = 'default' | 'view' | 'explore' | 'cta' | 'link' | 'text';

interface CursorContextType {
  cursorVariant: CursorVariant;
  cursorText: string;
  setCursor: (variant: CursorVariant, text?: string) => void;
  resetCursor: () => void;
}

const CursorContext = createContext<CursorContextType | undefined>(undefined);

export const CursorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cursorVariant, setCursorVariant] = useState<CursorVariant>('default');
  const [cursorText, setCursorText] = useState<string>('');

  const setCursor = (variant: CursorVariant, text: string = '') => {
    setCursorVariant(variant);
    setCursorText(text);
  };

  const resetCursor = () => {
    setCursorVariant('default');
    setCursorText('');
  };

  return (
    <CursorContext.Provider value={{ cursorVariant, cursorText, setCursor, resetCursor }}>
      {children}
    </CursorContext.Provider>
  );
};

export const useCursor = () => {
  const context = useContext(CursorContext);
  if (!context) {
    throw new Error('useCursor must be used within a CursorProvider');
  }
  return context;
};
