// ** Third Party Imports
import { Toaster } from "react-hot-toast";

// ** Custom Components
import Auth from "./components/auth";
import Chat from "./components/chat";
import Sidebar from "./components/sidebar";

function App() {
  const isLoggedIn = false;

  return (
    <>
      <div className="main-background"></div>
      <main className="app shadow-lg">
        {isLoggedIn ? (
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
