import React, { createContext, useState, useEffect, useContext } from 'react';
import { User } from '../types';

interface AuthContextType {
  currentUser: User | null;
  login: (username: string, pass: string) => { success: boolean; error?: string };
  register: (username: string, fullName: string, pass: string) => { success: boolean; error?: string };
  logout: () => void;
  showAuthModal: boolean;
  setShowAuthModal: (show: boolean) => void;
  authModalTab: 'login' | 'register';
  setAuthModalTab: (tab: 'login' | 'register') => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'register'>('login');

  // Load user session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('fptu_current_user');
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch (e) {
        console.error('Failed to parse current user:', e);
      }
    }
  }, []);

  const login = (username: string, pass: string) => {
    const cleanUsername = username.trim().toLowerCase();
    if (!cleanUsername || !pass) {
      return { success: false, error: 'Vui lòng điền đầy đủ thông tin!' };
    }

    const usersRaw = localStorage.getItem('fptu_registered_users');
    const users = usersRaw ? JSON.parse(usersRaw) : [];

    const userMatch = users.find((u: any) => u.username.toLowerCase() === cleanUsername);

    if (!userMatch) {
      return { success: false, error: 'Tên đăng nhập không tồn tại!' };
    }

    if (userMatch.password !== pass) {
      return { success: false, error: 'Mật khẩu không chính xác!' };
    }

    const sessionUser: User = {
      id: userMatch.id,
      username: userMatch.username,
      fullName: userMatch.fullName,
      avatarSeed: userMatch.avatarSeed,
      createdAt: userMatch.createdAt,
    };

    setCurrentUser(sessionUser);
    localStorage.setItem('fptu_current_user', JSON.stringify(sessionUser));
    return { success: true };
  };

  const register = (username: string, fullName: string, pass: string) => {
    const cleanUsername = username.trim().toLowerCase();
    const cleanFullName = fullName.trim();

    if (!cleanUsername || !cleanFullName || !pass) {
      return { success: false, error: 'Vui lòng điền đầy đủ các trường!' };
    }

    if (cleanUsername.length < 3) {
      return { success: false, error: 'Tên đăng nhập phải có ít nhất 3 ký tự!' };
    }

    if (pass.length < 4) {
      return { success: false, error: 'Mật khẩu phải có ít nhất 4 ký tự!' };
    }

    const usersRaw = localStorage.getItem('fptu_registered_users');
    const users = usersRaw ? JSON.parse(usersRaw) : [];

    const exists = users.some((u: any) => u.username.toLowerCase() === cleanUsername);
    if (exists) {
      return { success: false, error: 'Tên đăng nhập này đã có người sử dụng!' };
    }

    const randomSeed = Math.random().toString(36).substring(7);
    const newUser = {
      id: `user-${Date.now()}`,
      username: cleanUsername,
      fullName: cleanFullName,
      password: pass,
      avatarSeed: `https://api.dicebear.com/7.x/bottts/svg?seed=${randomSeed}`,
      createdAt: new Date().toLocaleDateString('vi-VN'),
    };

    users.push(newUser);
    localStorage.setItem('fptu_registered_users', JSON.stringify(users));

    const sessionUser: User = {
      id: newUser.id,
      username: newUser.username,
      fullName: newUser.fullName,
      avatarSeed: newUser.avatarSeed,
      createdAt: newUser.createdAt,
    };

    setCurrentUser(sessionUser);
    localStorage.setItem('fptu_current_user', JSON.stringify(sessionUser));
    return { success: true };
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('fptu_current_user');
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login,
        register,
        logout,
        showAuthModal,
        setShowAuthModal,
        authModalTab,
        setAuthModalTab,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
