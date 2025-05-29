import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { AppUser } from "../types/user";

interface AuthContextType {
  authUser: AppUser | null;
  isAuthenticated: boolean; // Derive this from authUser
  loading: boolean; // Indicate whether the initial auth check is complete
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, fullName: string, email: string, password: string, location: string, interests: string, dreams: string, achievements: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  authUser: null,
  isAuthenticated: false,
  loading: true,
  register: async () => {},
  login: async () => {},
  logout: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authUser, setAuthUser] = useState<AppUser | null>(null);
  const isAuthenticated = !!authUser; // Derive isAuthenticated from authUser
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        // console.log('User is signed in:', user);
        setAuthUser({ uid: user.uid, email: user.email ?? '' });
      } else {
        // console.log('User is signed out');
        setAuthUser(null);
      }
      setLoading(false);

      console.log('AuthUser:', user);
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  // Attempt to automatically log in a mock user for hackathon demo purposes
  // useEffect(() => {
  //   if (!authUser && !loading) { // Only attempt if no user is authenticated and initial check is done
  //     signInWithEmailAndPassword(auth, "fiaorganization01@gmail.com", "considermeforCTO99")
  //       .catch((error) => {
  //         console.error("Automatic mock user login failed:", error);
  //         // Continue without logging in if auto-login fails
  //       });
  //   }
  // }, [authUser, loading]); // Dependency array includes authUser and loading
  
  // Firebase login
  const login = async (email: string, password: string): Promise<void> => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  // Firebase register
  const register = async (username: string, fullName: string, email: string, password: string, location: string, interests: string, dreams: string, achievements: string): Promise<void> => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // Update the user's profile with the display name
      // await updateProfile(auth.currentUser, { displayName: fullName }); // does not work
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  };

  // Firebase logout
  const logout = async (): Promise<void> => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout failed:", error);
      throw error;
    }
  };

  const value = {
    authUser,
    isAuthenticated,
    loading,
    register,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
