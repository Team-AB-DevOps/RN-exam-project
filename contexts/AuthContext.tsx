import React from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, User } from "@firebase/auth";

type AuthContextType = {
    user: User | null;
    isLoading: boolean;
    signOut: () => void;
    login: (email: string, password: string) => Promise<boolean>;
    signUp: (email: string, password: string) => Promise<boolean>;
};

const AuthContext = React.createContext<AuthContextType>(null!);

export function AuthProvider(props: { children: React.ReactNode }) {
    const [user, setUser] = React.useState(auth.currentUser);
    const [isLoading, setIsLoading] = React.useState(false);

    onAuthStateChanged(auth, (user) => {
        setUser(user);
    });

    const signOut = async () => {
        await auth.signOut();
    };

    const login = async (email: string, password: string) => {
        try {
            setIsLoading(true);
            await signInWithEmailAndPassword(auth, email, password);
            return true;
        } catch (error) {
            console.log("Could not login: " + error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const signUp = async (email: string, password: string) => {
        try {
            setIsLoading(true);
            await createUserWithEmailAndPassword(auth, email, password);
            return true;
        } catch (error) {
            console.log("Could not signup: " + error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    return <AuthContext.Provider value={{ user, isLoading, signOut, signUp, login }}>{props.children}</AuthContext.Provider>;
}

export function useAuth() {
    return React.useContext(AuthContext);
}
