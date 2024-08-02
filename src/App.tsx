import ChessBoard from "./components/UI/chess-board/ChessBoard";
import {Route, Routes} from "react-router-dom";
import StartPage from "./components/UI/start-page/StartPage";
import ConfigPage from "./components/UI/config-page/ConfigPage";
import {useAuth} from "./components/contexts/auth-context/AuthContext.tsx";

function App() {
    const {isAuthenticated} = useAuth();
  return (
      <>
          <Routes>
              <Route path="/" element={<StartPage />}/>
              <Route path="/config" element={<ConfigPage />} />
              { isAuthenticated && <Route path="/game" element={<ChessBoard />} /> }
              { !isAuthenticated && <Route path="/game" element={<ConfigPage />} /> }
          </Routes>
      </>
  );
}

export default App;
