import { Route, Routes } from "react-router-dom";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import { AuthProvider } from "./features/auth/auth.context";
import Home from "./features/interview/pages/Home";
import Protected from "./features/auth/components/Protected";
import Interview from "./features/interview/pages/Interview";
import { InterviewProvider } from "./features/interview/interview.context";
import NavBar from "./components/NavBar";

function App() {
  return (
    <>
      <NavBar></NavBar>
      <AuthProvider>
        <InterviewProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/"
              element={
                <Protected>
                  <Home />
                </Protected>
              }
            />
            <Route
              path="/interview/:interviewId"
              element={
                <Protected>
                  <Interview />
                </Protected>
              }
            />
          </Routes>
        </InterviewProvider>
      </AuthProvider>
    </>
  );
}

export default App;
