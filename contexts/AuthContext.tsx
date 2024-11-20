import React from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, User } from "@firebase/auth";

type AuthContextType = {
    user: User | null,
    signOut: () => void;
    login: (email: string, password: string) => void;
    signUp: (email: string, password: string) => void;
};

const AuthContext = React.createContext<AuthContextType>(null!);

export function AuthProvider(props: { children: React.ReactNode }) {
    const [user, setUser] = React.useState(auth.currentUser);

    console.log(user);
    

    onAuthStateChanged(auth, (user) => {
        setUser(user);
    });

    const signOut = async () => {
        await auth.signOut();
    };

    const login = async (email: string, password: string) => {
        try {
            const userCreds = await signInWithEmailAndPassword(auth, email, password);
             setUser(userCreds.user);
        } catch (error) {
            console.log("Could not login: " + error);
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

    return <AuthContext.Provider value={{user, signOut, signUp, login}}>{props.children}</AuthContext.Provider>;
}

export function useAuth() {
    return React.useContext(AuthContext);
}
