import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "../../firebase/FirebaseConfig.ts";
import {IUser} from "../../interfaces/User.ts";

export type AuthContextType = {
    user: IUser | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    accessToken: string | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

const AuthProvider = ({children}: { children: ReactNode }) => {
    const [user, setUser] = useState<IUser | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [accessToken, setAccessToken] = useState<string | null>(null);

    useEffect(() => {
        setIsLoading(true);
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setIsAuthenticated(!!user);
            setIsLoading(false);
            if (user) {
                user.getIdToken().then((token) => {
                    setAccessToken(token);
                });
            }
        });
        return () => unsubscribe();
    }, []);

    const value = {user, isAuthenticated, isLoading, accessToken};

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export {AuthContext, AuthProvider};