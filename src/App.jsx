import Login from "./pages/Login/Login";

function App() {
  const handleLogin = (data) => {
    console.log('Logging in with', data);
    // ở đây gọi API login bằng fetch/axios...
  };

  return (
    <div className="App">
      <Login onSubmit={handleLogin} />
    </div>
  );
}

export default App;
