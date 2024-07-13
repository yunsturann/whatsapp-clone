// ** React Imports
import { useEffect } from "react";

// ** Third Party Imports
import { Toaster } from "react-hot-toast";

// ** Custom Components
import Auth from "./components/auth";
import Chat from "./components/chat";
import Sidebar from "./components/sidebar";

// ** Store
import { useUserStore } from "./store/use-user-store";

// ** Firebase Imports
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase";

function App() {
  const { currentUser, fetchCurrentUser, isLoading } = useUserStore();

  useEffect(() => {
    const sub = onAuthStateChanged(auth, (user) => {
      fetchCurrentUser(user?.uid || "");
    });

    return () => sub();
  }, [fetchCurrentUser]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="main-background"></div>
      <main className="app shadow-sm">
        {currentUser ? (
          <>
            {/* Sidebar */}
            <Sidebar />

            {/* Chat */}
            <Chat />
          </>
        ) : (
          <Auth />
        )}
      </main>
      <Toaster />
    </>
  );
}

export default App;
