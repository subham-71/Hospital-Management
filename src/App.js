import './App.css';
import Rautes from './Router/Router'
import { AuthProvider } from './Contexts/AuthContext';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Rautes />
      </AuthProvider>
    </div>
  );
}

export default App;
