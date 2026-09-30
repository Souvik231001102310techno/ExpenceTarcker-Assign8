import {
  Outlet,
  useNavigate
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function Navbar() {
  const {
    user,
    logout
  } = useAuth();

  const navigate =
    useNavigate();

  const handleLogout = () => {
    logout();

    navigate(
      "/login",
      {
        replace: true
      }
    );
  };

  return (
    <>
      <header className="expense-navbar">

        <div className="navbar-brand">

          <div className="navbar-logo">
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

        <div className="navbar-user">

          <div className="navbar-avatar">
            {user?.username
              ?.charAt(0)
              .toUpperCase()}
          </div>

          <div className="navbar-user-info">

            <strong>
              {user?.username}
            </strong>

            <span>
              Logged in
            </span>

          </div>

          <button
            className="navbar-logout"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      </header>

      <Outlet />
    </>
  );
}

export default Navbar;