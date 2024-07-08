import Chat from "./components/chat";
import Sidebar from "./components/sidebar";

function App() {
  return (
    <>
      <div className="main-background"></div>
      <main className="app shadow-lg">
        {/* Sidebar */}
        <Sidebar />
        {/* Chat */}
        <Chat />
      </main>
    </>
  );
}

export default App;
