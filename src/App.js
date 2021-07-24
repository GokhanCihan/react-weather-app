import './App.css';
import DataProvider from './Context/DataContext';
import Main from './Components/Main/Main';

function App() {
  return (
    <DataProvider>
      <Main />
    </DataProvider>
  )
}

export default App;
