import React from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, User } from "@firebase/auth";
import { useRouter } from "expo-router";

type AuthContextType = {
    user: User | null;
    isLoading: boolean;
    signOut: () => void;
    login: (email: string, password: string) => void;
    signUp: (email: string, password: string) => void;
};

const AuthContext = React.createContext<AuthContextType>(null!);

export function AuthProvider(props: { children: React.ReactNode }) {
    const [user, setUser] = React.useState(auth.currentUser);
    const [isLoading, setIsLoading] = React.useState(false);
    const router = useRouter();

    console.log(user);

    onAuthStateChanged(auth, (user) => {
        setUser(user);
        router.replace("/");
    });

    const signOut = async () => {
        await auth.signOut();
    };

    const login = async (email: string, password: string) => {
        try {
            setIsLoading(true);
            const userCreds = await signInWithEmailAndPassword(auth, email, password);
            setUser(userCreds.user);
        } catch (error) {
            console.log("Could not login: " + error);
        } finally {
            setIsLoading(false);
        }
    };

    const signUp = async (email: string, password: string) => {
        try {
            const userCreds = await createUserWithEmailAndPassword(auth, email, password);
            setUser(userCreds.user);
        } catch (error) {
            console.log("Could not signup: " + error);
        }
    };

    return <AuthContext.Provider value={{ user, isLoading, signOut, signUp, login }}>{props.children}</AuthContext.Provider>;
}

export function useAuth() {
    return React.useContext(AuthContext);
}
