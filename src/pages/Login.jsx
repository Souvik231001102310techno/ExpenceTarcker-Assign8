import {
  useState
} from "react";

import {
  Navigate,
  useLocation,
  useNavigate
} from "react-router-dom";

import {
  useAuth
} from "../context/AuthContext";

function Login() {

  const {
    user,
    login,
    register
  } = useAuth();

  const navigate =
    useNavigate();

  const location =
    useLocation();

  const [mode, setMode] =
    useState("login");

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [rememberMe, setRememberMe] =
    useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [errors, setErrors] =
    useState({});

  const [message, setMessage] =
    useState("");

  const [messageType, setMessageType] =
    useState("");

  const [passwordStrength, setPasswordStrength] =
    useState("");

  if (user) {

    return (
      <Navigate
        to="/"
        replace
      />
    );
  }

  const calculateStrength = (
    value
  ) => {

    if (!value) {
      return "";
    }

    let score = 0;

    if (value.length >= 6) {
      score++;
    }

    if (value.length >= 8) {
      score++;
    }

    if (/[A-Z]/.test(value)) {
      score++;
    }

    if (/[0-9]/.test(value)) {
      score++;
    }

    if (/[^A-Za-z0-9]/.test(value)) {
      score++;
    }

    if (score <= 2) {
      return "Weak";
    }

    if (score <= 4) {
      return "Medium";
    }

    return "Strong";
  };

  const handlePasswordChange = (e) => {

    const value =
      e.target.value;

    setPassword(value);

    setPasswordStrength(
      calculateStrength(value)
    );

    setErrors({
      ...errors,
      password: ""
    });

    setMessage("");
  };

  const switchMode = (
    selectedMode
  ) => {

    setMode(selectedMode);

    setUsername("");
    setPassword("");
    setConfirmPassword("");

    setErrors({});
    setMessage("");
    setPasswordStrength("");
  };

  const validateLogin = () => {

    const newErrors = {};

    if (!username.trim()) {

      newErrors.username =
        "Username is required.";
    }

    if (!password) {

      newErrors.password =
        "Password is required.";
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors)
        .length === 0
    );
  };

  const validateRegister = () => {

    const newErrors = {};

    if (!username.trim()) {

      newErrors.username =
        "Username is required.";

    } else if (
      username.trim().length < 3
    ) {

      newErrors.username =
        "Username must contain at least 3 characters.";
    }

    if (!password) {

      newErrors.password =
        "Password is required.";

    } else if (
      password.length < 6
    ) {

      newErrors.password =
        "Password must contain at least 6 characters.";
    }

    if (!confirmPassword) {

      newErrors.confirmPassword =
        "Please confirm your password.";

    } else if (
      password !== confirmPassword
    ) {

      newErrors.confirmPassword =
        "Passwords do not match.";
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors)
        .length === 0
    );
  };

  const handleLogin = (e) => {

    e.preventDefault();

    setMessage("");

    if (!validateLogin()) {
      return;
    }

    const result = login(
      username,
      password,
      rememberMe
    );

    if (!result.success) {

      setMessage(
        result.message
      );

      setMessageType("error");

      return;
    }

    const destination =
      location.state?.from || "/";

    navigate(
      destination,
      {
        replace: true
      }
    );
  };

  const handleRegister = (e) => {

    e.preventDefault();

    setMessage("");

    if (!validateRegister()) {
      return;
    }

    const result =
      register(
        username,
        password
      );

    if (!result.success) {

      setMessage(
        result.message
      );

      setMessageType("error");

      return;
    }

    setMessage(
      "Account created successfully. Please login."
    );

    setMessageType("success");

    setMode("login");

    setPassword("");
    setConfirmPassword("");

    setPasswordStrength("");

    setErrors({});
  };

  return (
    <div className="login-page">

      <div className="login-decoration decoration-one" />

      <div className="login-decoration decoration-two" />

      <div className="login-card">

        <div className="login-brand">

          <div className="login-brand-logo">
            ₹
          </div>

          <div>

            <h2>
              MoneyTrack
            </h2>

            <span>
              Expense Manager
            </span>

          </div>

        </div>

        <div className="login-heading">

          <h1>
            {mode === "login"
              ? "Welcome Back"
              : "Create Account"}
          </h1>

          <p>
            {mode === "login"
              ? "Sign in to manage your expenses and finances."
              : "Create your account to start tracking your expenses."}
          </p>

        </div>

        <div className="auth-tabs">

          <button
            type="button"
            className={
              mode === "login"
                ? "auth-tab active"
                : "auth-tab"
            }
            onClick={() =>
              switchMode("login")
            }
          >
            Login
          </button>

          <button
            type="button"
            className={
              mode === "register"
                ? "auth-tab active"
                : "auth-tab"
            }
            onClick={() =>
              switchMode("register")
            }
          >
            Create Account
          </button>

        </div>

        {message && (

          <div
            className={
              messageType === "success"
                ? "auth-message success"
                : "auth-message error"
            }
          >
            {message}
          </div>

        )}

        <form
          className="login-form"
          onSubmit={
            mode === "login"
              ? handleLogin
              : handleRegister
          }
        >

          <div className="login-form-group">

            <label>
              Username
            </label>

            <div
              className={`login-input ${
                errors.username
                  ? "login-input-error"
                  : ""
              }`}
            >

              <span>
                👤
              </span>

              <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => {
                  setUsername(
                    e.target.value
                  );

                  setErrors({
                    ...errors,
                    username: ""
                  });

                  setMessage("");
                }}
              />

            </div>

            {errors.username && (

              <small className="validation-error">
                {errors.username}
              </small>

            )}

          </div>

          <div className="login-form-group">

            <label>
              Password
            </label>

            <div
              className={`login-input ${
                errors.password
                  ? "login-input-error"
                  : ""
              }`}
            >

              <span>
                🔒
              </span>

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Enter your password"
                value={password}
                onChange={
                  handlePasswordChange
                }
              />

              <button
                type="button"
                className="show-password"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
              >
                {showPassword
                  ? "Hide"
                  : "Show"}
              </button>

            </div>

            {errors.password && (

              <small className="validation-error">
                {errors.password}
              </small>

            )}

            {mode === "register" &&
              password && (

                <div className="password-strength">

                  <div className="strength-bars">

                    <span
                      className={
                        passwordStrength
                          ? "filled"
                          : ""
                      }
                    />

                    <span
                      className={
                        passwordStrength ===
                          "Medium" ||
                        passwordStrength ===
                          "Strong"
                          ? "filled"
                          : ""
                      }
                    />

                    <span
                      className={
                        passwordStrength ===
                        "Strong"
                          ? "filled"
                          : ""
                      }
                    />

                  </div>

                  <span
                    className={`strength-label ${passwordStrength.toLowerCase()}`}
                  >
                    Password strength:{" "}
                    <strong>
                      {passwordStrength}
                    </strong>
                  </span>

                </div>

              )}

          </div>

          {mode === "register" && (

            <div className="login-form-group">

              <label>
                Confirm Password
              </label>

              <div
                className={`login-input ${
                  errors.confirmPassword
                    ? "login-input-error"
                    : ""
                }`}
              >

                <span>
                  🔒
                </span>

                <input
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Confirm your password"
                  value={
                    confirmPassword
                  }
                  onChange={(e) => {

                    setConfirmPassword(
                      e.target.value
                    );

                    setErrors({
                      ...errors,
                      confirmPassword:
                        ""
                    });

                    setMessage("");
                  }}
                />

                <button
                  type="button"
                  className="show-password"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                >
                  {showConfirmPassword
                    ? "Hide"
                    : "Show"}
                </button>

              </div>

              {errors.confirmPassword && (

                <small className="validation-error">
                  {
                    errors.confirmPassword
                  }
                </small>

              )}

            </div>

          )}

          {mode === "login" && (

            <label className="remember-user">

              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) =>
                  setRememberMe(
                    e.target.checked
                  )
                }
              />

              <span>
                Remember me
              </span>

            </label>

          )}

          <button
            type="submit"
            className="login-button"
          >
            {mode === "login"
              ? "Sign In"
              : "Create Account"}

            <span>
              →
            </span>

          </button>

        </form>

        <div className="auth-switch">

          {mode === "login" ? (
            <>
              Don't have an account?{" "}

              <button
                type="button"
                onClick={() =>
                  switchMode("register")
                }
              >
                Create Account
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}

              <button
                type="button"
                onClick={() =>
                  switchMode("login")
                }
              >
                Login
              </button>
            </>
          )}

        </div>

        <div className="jwt-note">
          🔐 JWT authentication simulation
        </div>

      </div>

    </div>
  );
}

export default Login;