import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import DataProvider from './Context/DataContext';
import DropDown from './Components/DropDown/DropDown';
import Main from './Components/Main/Main';
import Card from './Components/Card/Card';

function App() {
  return (
    <div>   
      <DataProvider >
        <DropDown />
        <Main>
          <Card />
        </Main>
      </DataProvider>
    </div>
  )
}

export default App;