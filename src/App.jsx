import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import authenticationService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Header, Footer } from "./Components";
import { Outlet } from "react-router-dom";
function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    authenticationService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return !loading ? (
    <>
      <div>
        <Header />
        <Outlet />
        <Footer />
      </div>
    </>
  ) : (
    <>
      <h1>Loading...</h1>
    </>
  );
}

export default App;
