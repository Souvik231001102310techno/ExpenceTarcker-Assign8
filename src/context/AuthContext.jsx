import {
  createContext,
  useContext,
  useState
} from "react";

const AuthContext = createContext();

const USERS_KEY = "expenseTrackerUsers";
const USER_KEY = "expenseTrackerUser";
const JWT_KEY = "expenseTrackerJWT";

export function AuthProvider({ children }) {

  const [user, setUser] = useState(() => {

    const savedUser =
      localStorage.getItem(USER_KEY) ||
      sessionStorage.getItem(USER_KEY);

    return savedUser
      ? JSON.parse(savedUser)
      : null;
  });

  const getUsers = () => {

    const users =
      localStorage.getItem(USERS_KEY);

    return users
      ? JSON.parse(users)
      : [];
  };

  const saveUsers = (users) => {

    localStorage.setItem(
      USERS_KEY,
      JSON.stringify(users)
    );
  };

  const createFakeJWT = (username) => {

    const header = btoa(
      JSON.stringify({
        alg: "HS256",
        typ: "JWT"
      })
    );

    const payload = btoa(
      JSON.stringify({
        username,
        role: "user",
        issuedAt: Date.now()
      })
    );

    const signature = btoa(
      `${username}-${Date.now()}`
    );

    return `${header}.${payload}.${signature}`;
  };

  const register = (
    username,
    password
  ) => {

    const trimmedUsername =
      username.trim();

    if (!trimmedUsername) {
      return {
        success: false,
        message:
          "Username is required."
      };
    }

    if (!password) {
      return {
        success: false,
        message:
          "Password is required."
      };
    }

    const users = getUsers();

    const existingUser =
      users.find(
        (existing) =>
          existing.username.toLowerCase() ===
          trimmedUsername.toLowerCase()
      );

    if (existingUser) {
      return {
        success: false,
        message:
          "Username already exists."
      };
    }

    const newUser = {
      id: Date.now(),
      username: trimmedUsername,
      password
    };

    users.push(newUser);

    saveUsers(users);

    return {
      success: true,
      message:
        "Account created successfully."
    };
  };

  const login = (
    username,
    password,
    rememberMe
  ) => {

    const users = getUsers();

    const foundUser =
      users.find(
        (existing) =>
          existing.username.toLowerCase() ===
            username.trim().toLowerCase() &&
          existing.password === password
      );

    if (!foundUser) {

      return {
        success: false,
        message:
          "Invalid username or password."
      };
    }

    const token =
      createFakeJWT(
        foundUser.username
      );

    const userData = {
      id: foundUser.id,
      username: foundUser.username,
      token
    };

    if (rememberMe) {

      localStorage.setItem(
        USER_KEY,
        JSON.stringify(userData)
      );

      localStorage.setItem(
        JWT_KEY,
        token
      );

    } else {

      sessionStorage.setItem(
        USER_KEY,
        JSON.stringify(userData)
      );

      sessionStorage.setItem(
        JWT_KEY,
        token
      );
    }

    setUser(userData);

    return {
      success: true
    };
  };

  const logout = () => {

    localStorage.removeItem(
      USER_KEY
    );

    localStorage.removeItem(
      JWT_KEY
    );

    sessionStorage.removeItem(
      USER_KEY
    );

    sessionStorage.removeItem(
      JWT_KEY
    );

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        register,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}