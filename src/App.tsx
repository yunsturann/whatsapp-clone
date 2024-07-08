import Chat from "./components/chat";
import Sidebar from "./components/sidebar";

function App() {
  return (
    <main className="app">
      {/* Sidebar */}
      <Sidebar />
      {/* Chat */}
      <Chat />
    </main>
  );
}

export default App;
