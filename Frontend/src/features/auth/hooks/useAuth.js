import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";
import { register, login, logout, getMe } from "../services/auth.api";

export const useAuth = () => {
  const { user, setUser, loading, setLoading } = useContext(AuthContext);

  const handleLogin = async ({ email, password }) => {
    setLoading(true);
    try {
      const data = await login({ email, password });
      if (data) {
        setUser(data.user);
      }
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async ({ username, email, password }) => {
    setLoading(true);
    try {
      const data = await register({ username, email, password });
      if (data) {
        setUser(data.user);
      }
    } catch (error) {
      console.error("Register error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getandSetUser = async () => {
      try {
        const data = await getMe();
        setUser(data);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    getandSetUser();
  }, []);

  return {
    user,
    loading,
    handleLogin,
    handleRegister,
    handleLogout,
  };
};
