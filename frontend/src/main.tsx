import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { AuthProvider } from './context/AuthContext.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        {/*AuthProvider gör det möjligt för webbsidan att anpassas beroende på om man är användare eller ej  */}
         <AuthProvider>
            <App />
        </AuthProvider>
    </StrictMode>
);
