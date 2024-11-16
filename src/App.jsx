import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import authenticationService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Header, Footer } from "./Components";
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
        <Footer />
      </div>
      <h1>LoggedIn Successfully!</h1>
    </>
  ) : (
    <>
      <h1>You Must Login to Continue!</h1>
    </>
  );
}

export default App;
