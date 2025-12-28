"use client"; 

import { createContext, useEffect, useState } from 'react';
import {
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
} from 'firebase/auth';
import { auth } from '@/firebase/firebase.init';



export const AuthContext = createContext({})


const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setloading] = useState(true)
 
    
    const createUser = (email, password) => {
        setloading(true)
        return createUserWithEmailAndPassword(auth, email, password);
    };

  
    const signIn = (email, password) => {
        setloading(true)
        return signInWithEmailAndPassword(auth, email, password);
    };


    const signInWithGoogle = () => {
        setloading(true)
        return signInWithPopup(auth, googleProvider);
    };


    const logOut = () => {
        return signOut(auth);
    };

  
    const updateUserProfile = (name, photo) => {
        setloading(true)
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo,
        });
    };

  
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
           
            setloading(false)
        });

        return () => unsubscribe();
    }, []);

    const authInfo = {
        loading,
        user,
        setUser,
        createUser,
        signIn,
        signInWithGoogle,
        logOut,
        updateUserProfile,
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;