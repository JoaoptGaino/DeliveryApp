import { useState } from "react";
import { createContext } from "react";
import { useEffect } from "react";
import { ReactNode } from "react";
import { useHistory } from "react-router-dom";
import { UserFormData } from "../Components/Login";
import { api } from "../Services/api";

type User = {
  id: string;
  username: string;
  token: string;
};

type AuthContextType = {
  signed: boolean;
  Login: (data: UserFormData) => Promise<void>;
  user: User | null;
};
type AuthContextProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = (props: AuthContextProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const history = useHistory();
  useEffect(() => {
    const storedUser = localStorage.user;
    if (storedUser) {
      console.log("entrou aqui");
      const user = JSON.parse(storedUser) as User;
      console.log(user);
      api.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
      console.log(
        (api.defaults.headers.common["Authorization"] = `Bearer ${user.token}`)
      );
    }
  }, [user]);
  async function Login(data: UserFormData) {
    try {
      const response = await api.post("auth/login", {
        email: data.email,
        password: data.password,
      });
      setUser(response.data.user);
      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.user.token}`;
      console.log(response.data);
      console.log(api.defaults.headers.common);
      localStorage.user = JSON.stringify(response.data.user);
      history.push("/products");
    } catch (err) {
      alert(err);
    }
  }
  return (
    <AuthContext.Provider value={{ signed: true, Login, user }}>
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
