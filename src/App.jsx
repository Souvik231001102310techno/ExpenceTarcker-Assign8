import { Navigate, Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import ExpenseDashboard from "./ExpenseDashboard";

function App() {
  return (
    <Routes>
      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Navbar />
          </ProtectedRoute>
        }
      >
        <Route
          index
          element={<ExpenseDashboard />}
        />
      </Route>

      <Route
        path="*"
        element={
          <Navigate
            to="/"
            replace
          />
        }
      />
    </Routes>
  );
}

export default App;