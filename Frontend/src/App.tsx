import BookList from "./components/BookList";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <div className="App">
            <header className="bg-primary text-white p-3">
                <h1>Bookstore</h1>
            </header>
            <BookList />
        </div>
    );
}

export default App;

