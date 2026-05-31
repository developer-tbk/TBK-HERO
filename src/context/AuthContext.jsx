import React, { createContext, useState, useEffect, useContext } from 'react';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth, db, isFirebaseConfigured } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isFirebaseConfigured && auth) {
      const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        if (firebaseUser) {
          const cleanedEmail = (firebaseUser.email || '').toLowerCase().trim();
          let role = null;
          let name = '';

          if (cleanedEmail.includes('admin') || cleanedEmail === 'admin@gmail.com' || cleanedEmail === 'admin@bagarakitchen.com') {
            role = 'admin';
            name = 'Executive Administrator';
          }

          if (db) {
            try {
              const managerRef = doc(db, 'managers', cleanedEmail);
              const managerSnap = await getDoc(managerRef);
              if (managerSnap.exists()) {
                const managerData = managerSnap.data();
                role = managerData.role || 'manager';
                name = managerData.name || (role === 'admin' ? 'Co-Administrator' : 'Operations Manager');
              }
            } catch (err) {
              console.error('Error fetching manager role:', err);
            }
          }

          if (role) {
            const sessionUser = { email: cleanedEmail, role, name, uid: firebaseUser.uid };
            setUser(sessionUser);
          } else {
            console.warn('Access denied: Account is not registered or has been deleted.');
            setUser(null);
            signOut(auth);
          }
        } else {
          setUser(null);
        }
        setLoading(false);
      });
      return () => unsubscribe();
    } else {
      // Check if user session exists in localStorage
      const savedSession = localStorage.getItem('tbk_session');
      if (savedSession) {
        try {
          setUser(JSON.parse(savedSession));
        } catch (e) {
          localStorage.removeItem('tbk_session');
        }
      }
      setLoading(false);
    }
  }, []);

  const login = (email, password) => {
    if (isFirebaseConfigured && auth) {
      return signInWithEmailAndPassword(auth, email.toLowerCase().trim(), password)
        .then(async (userCredential) => {
          const firebaseUser = userCredential.user;
          const cleanedEmail = (firebaseUser.email || '').toLowerCase().trim();
          let role = null;
          let name = '';

          if (cleanedEmail.includes('admin') || cleanedEmail === 'admin@gmail.com' || cleanedEmail === 'admin@bagarakitchen.com') {
            role = 'admin';
            name = 'Executive Administrator';
          }

          if (db) {
            try {
              const managerRef = doc(db, 'managers', cleanedEmail);
              const managerSnap = await getDoc(managerRef);
              if (managerSnap.exists()) {
                const managerData = managerSnap.data();
                role = managerData.role || 'manager';
                name = managerData.name || (role === 'admin' ? 'Co-Administrator' : 'Operations Manager');
              }
            } catch (err) {
              console.error('Error fetching manager role during login:', err);
            }
          }

          if (!role) {
            await signOut(auth);
            throw new Error('Access Denied: This account is not authorized or has been deleted by the Administrator.');
          }

          const sessionUser = { email: cleanedEmail, role, name, uid: firebaseUser.uid };
          setUser(sessionUser);
          return sessionUser;
        });
    } else {
      return new Promise((resolve, reject) => {
        // Simulate network request
        setTimeout(() => {
          const cleanedEmail = email.toLowerCase().trim();
          
          if (cleanedEmail === 'admin@bagarakitchen.com' && password === 'admin123') {
            const sessionUser = { email: cleanedEmail, role: 'admin', name: 'Executive Administrator' };
            localStorage.setItem('tbk_session', JSON.stringify(sessionUser));
            setUser(sessionUser);
            resolve(sessionUser);
          } else if (cleanedEmail === 'manager@bagarakitchen.com' && password === 'manager123') {
            const sessionUser = { email: cleanedEmail, role: 'manager', name: 'Operations Manager' };
            localStorage.setItem('tbk_session', JSON.stringify(sessionUser));
            setUser(sessionUser);
            resolve(sessionUser);
          } else {
            // Check if there is a custom manager saved in localStorage
            const savedManagers = localStorage.getItem('tbk_managers');
            let managersList = [];
            if (savedManagers) {
              try {
                managersList = JSON.parse(savedManagers);
              } catch (e) {}
            }
            
            const foundManager = managersList.find(
              m => m.email.toLowerCase().trim() === cleanedEmail && m.password === password
            );

            if (foundManager) {
              const sessionUser = { email: cleanedEmail, role: foundManager.role || 'manager', name: foundManager.name };
              localStorage.setItem('tbk_session', JSON.stringify(sessionUser));
              setUser(sessionUser);
              resolve(sessionUser);
            } else {
              reject(new Error('Invalid email or password. Please try again.'));
            }
          }
        }, 800);
      });
    }
  };

  const logout = () => {
    if (isFirebaseConfigured && auth) {
      return signOut(auth).then(() => {
        setUser(null);
      });
    } else {
      localStorage.removeItem('tbk_session');
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, isFirebaseConfigured }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
