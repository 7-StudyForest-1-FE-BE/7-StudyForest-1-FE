import Header from "./components/Header/Header";
import "./styles/reset.css";
import "./styles/global.css";
import ConcentrationPage from "./pages/ConcentrationPage.jsx";

function App({ children }) {
  return (
    <div className="wrap">
      <Header className="header" />
      <main className="container">
        <ConcentrationPage />
      </main>
    </div>
  );
}

export default App;
