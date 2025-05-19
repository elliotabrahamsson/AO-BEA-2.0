import Home from './components/Home';
import Navbar from './components/Navbar';
import DropdownProducts from './components/DropdownProducts';
import DropdownCare from './components/DropdownCare';

function App() {
    return (
        <>
            <Home />
            <DropdownProducts/>
            <DropdownCare/>
            <Navbar/>
        </>
    );
}

export default App;
