import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

interface AuthState {
  user: { id: number; email: string; nome: string };
}

interface SignInCredentials {
  username: string;
  password: string;
}

interface AuthContextData {
  user: { id: number; email: string; nome: string };
  SignIn(credentials: SignInCredentials): Promise<void>;
  SignOut(): void;
  loading: boolean;
  login: boolean;
}

const AuthContext = createContext({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [login, setLogin] = useState(false);
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@Dogs:token');
    const user = localStorage.getItem('@Dogs:user');

    if (token && user) {
      return { user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const navigate = useNavigate();

  const getUser = useCallback(async (token: string) => {
    const response = await api.get('/api/user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { id, email, nome } = response.data;
    const user = {
      id,
      email,
      nome,
    };

    setData({ user });

    localStorage.setItem('@Dogs:token', token);
    localStorage.setItem('@Dogs:user', JSON.stringify({ email, nome }));
  }, []);

  const SignIn = useCallback(
    async ({ username, password }: SignInCredentials) => {
      try {
        setLoading(true);
        const response = await api.post('/jwt-auth/v1/token', {
          username,
          password,
        });
        const { token } = response.data;

        await getUser(token);
        setLogin(true);
        navigate('/conta');
      } catch (err) {
        // Adicionar toast de erro
        setLogin(false);
      } finally {
        setLoading(false);
      }
    },
    [getUser, navigate],
  );

  const SignOut = useCallback(() => {
    localStorage.removeItem('@Dogs:token');
    localStorage.removeItem('@Dogs:user');

    setData({} as AuthState);
    setLogin(false);
    navigate('/login');
  }, [navigate]);

  useEffect(() => {
    const autoLogin = async () => {
      const token = localStorage.getItem('@Dogs:token');
      const user = localStorage.getItem('@Dogs:user');

      if (token && user) {
        try {
          setLoading(true);
          await api.post('/jwt-auth/v1/token/validate', token, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          await getUser(token);
          setLogin(true);

          navigate('/conta');
        } catch (err) {
          // Adicionar toast de erro
          SignOut();
        } finally {
          setLoading(false);
        }
      } else {
        setLogin(false);
      }
    };
    autoLogin();
  }, [SignOut, getUser, navigate]);

  return (
    <AuthContext.Provider
      value={{ SignIn, user: data.user, SignOut, loading, login }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
