import Header from './components/Header';
import Footer from './components/Footer';
import Shop from './components/Shop';
// импортируем context
import { ContextProvider } from './context';

function App() {
  return (
    <>
      <Header />
      {/* обернув компонент shop в провайдер позволим ему получить все что есть в провайдере */}
      <ContextProvider>
        <Shop />
      </ContextProvider>

      <Footer />
    </>
  );
}

export default App;
