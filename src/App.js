import './App.css';
import DataProvider from './Context/DataContext';
import DropDown from './Components/DropDown/DropDown';
import Main from './Components/Main/Main';
import Card from './Components/Card/Card';

function App() {
  return (
    <div>   
      <DataProvider>
        <div>
          <DropDown />
          <Main>
            <Card />
          </Main>
        </div>
      </DataProvider>
    </div>
  )
}

export default App;