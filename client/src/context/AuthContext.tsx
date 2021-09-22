import {createContext} from 'react'

type LoginFunc = (jwtToken: string, userId: string) => void;
type LogoutFunc = () => void;
const loginMock = (jwtToken: string, userId: string) => {}
const logoutMock = () => {}

class AuthContextClass {
  token: string = '';
  userId: string = '';
  login: LoginFunc = loginMock;
  logout: LogoutFunc = logoutMock;
  isAuthenticated: Boolean = false;
}

const context = new AuthContextClass();
export const AuthContext : React.Context<AuthContextClass> = createContext<AuthContextClass>(context)
