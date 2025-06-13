import Header from './components/Header/Header';
import './styles/reset.css';
import './styles/global.css';

function App({ children }) {
  return (
    <div className="wrap">
      <Header className="header" />
      <main className="container">{children}</main>
    </div>
  );
}

export default App;
