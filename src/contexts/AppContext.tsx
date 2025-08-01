import React, { createContext, useContext, useReducer, ReactNode } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface ParsedData {
  name: string;
  email: string;
  phone: string;
  summary: string;
  experience: Array<{
    id: string;
    title: string;
    company: string;
    startDate: string;
    endDate: string;
    description: string;
  }>;
  education: Array<{
    id: string;
    degree: string;
    school: string;
    year: string;
  }>;
  skills: string[];
  projects: Array<{
    id: string;
    title: string;
    description: string;
    technologies: string[];
    githubUrl?: string;
    liveUrl?: string;
  }>;
}

export interface ThemeSettings {
  color: string;
  font: string;
  image?: string;
  template?: string;
}

interface AppState {
  user: User | null;
  uploadedFile: File | null;
  parsedData: ParsedData | null;
  resumeFormData: Partial<ParsedData>;
  themeSettings: ThemeSettings;
  generatedUrl: string | null;
  isLoading: boolean;
}

type AppAction =
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_UPLOADED_FILE'; payload: File | null }
  | { type: 'SET_PARSED_DATA'; payload: ParsedData }
  | { type: 'UPDATE_RESUME_DATA'; payload: Partial<ParsedData> }
  | { type: 'SET_THEME_SETTINGS'; payload: ThemeSettings }
  | { type: 'SET_GENERATED_URL'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'RESET_STATE' };

const initialState: AppState = {
  user: null,
  uploadedFile: null,
  parsedData: null,
  resumeFormData: {},
  themeSettings: {
    color: 'purple',
    font: 'Inter',
    template: 'modern-dev'
  },
  generatedUrl: null,
  isLoading: false
};

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_UPLOADED_FILE':
      return { ...state, uploadedFile: action.payload };
    case 'SET_PARSED_DATA':
      return { 
        ...state, 
        parsedData: action.payload, 
        resumeFormData: { ...action.payload } 
      };
    case 'UPDATE_RESUME_DATA':
      return { 
        ...state, 
        resumeFormData: { ...state.resumeFormData, ...action.payload } 
      };
    case 'SET_THEME_SETTINGS':
      return { ...state, themeSettings: action.payload };
    case 'SET_GENERATED_URL':
      return { ...state, generatedUrl: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'RESET_STATE':
      return initialState;
    default:
      return state;
  }
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
