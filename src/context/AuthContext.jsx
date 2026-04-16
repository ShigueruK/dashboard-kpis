import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Función para obtener el perfil desde el backend
  const fetchPerfil = async (token) => {
    try {
      const response = await axios.get('http://localhost:8000/perfil', {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      console.error('Error al obtener perfil:', error);
      return null;
    }
  };
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchPerfil(token).then(perfil => {
        if (perfil) {
          setUser(perfil);
        } else {
          localStorage.removeItem('token');
        }
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const params = new URLSearchParams();
    params.append('username', email);
    params.append('password', password);
    
    const response = await axios.post('http://localhost:8000/login', params);
    const { access_token, rol } = response.data;
    
    localStorage.setItem('token', access_token);
    
    // Obtener el perfil completo del usuario
    const perfil = await fetchPerfil(access_token);
    if (perfil) {
      setUser(perfil);
    } else {
      // Fallback: usar datos del token
      const decoded = jwtDecode(access_token);
      setUser({ email: decoded.sub, rol });
    }
    
    return response.data;

  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};