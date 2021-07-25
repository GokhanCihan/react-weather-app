import './App.css';
import DataProvider from './Context/DataContext';
import Main from './Components/Main/Main';
import DropDown from './Components/DropDown/DropDown';

function App() {
  return (
    <div>   
      <DataProvider>
        <DropDown />
        <Main />
      </DataProvider>
    </div>
  )
}

export default App;