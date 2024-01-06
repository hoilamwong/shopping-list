// import logo from './logo.svg';
// import './output.css';
import ShoppingList from './ShoppingList';

function App() {
  return (
    <div className="App divide-y divide-darkLamon/50 select-none">
      <div className='font-bold text-left mt-4 p-5 pb-1 text-lg text-darkLamon tracking-wide '>
        Lamon.io
      </div>
      <ShoppingList/>
    </div>
  );
}

export default App;
