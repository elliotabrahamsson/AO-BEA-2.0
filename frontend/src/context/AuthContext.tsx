/* import {
    createContext,
    useContext,
    useState,
    type ReactNode,
    type SetStateAction
} from 'react';

// Typen för vår användare
type User = {
    name: string;
    email: string;
} | null;

// Typ för kontextens innehåll
interface AuthContextType {
    user: User;
    login: (userData: SetStateAction<User>) => void;
    logout: () => void;
    isLoggedIn: boolean;
}

// Skapa kontexten med en default null
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider-komponenten
//children = komponenterna som AuthProvider omsluter
//ReactNode används för att tydligt ange att children kan vara vilken React-komponent eller JSX som helst.
export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User>(null);
    // login uppdaterar användaren, logout tar bort användaren.
    const login = (userData: SetStateAction<User>) => setUser(userData); // userData kan vara ett nytt användarobjekt eller en funktion som uppdaterar användaren
    const logout = () => setUser(null); //Tar bort användaren och sätter user till null
    const isLoggedIn = !!user;

    // Här samlar vi användarinfo och funktioner så som login, logout, isLoggedIn
    // och delar dem med alla komponenter inuti AuthProvider.
    return (
        <AuthContext.Provider value={{ user, login, logout, isLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
}

//Hook för att använda inloggningsdata och funktioner – fungerar bara om komponenten är inuti AuthProvider.
export function useAuth(): AuthContextType {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth måste användas inom en AuthProvider');
    }
    return context;
}
 */
