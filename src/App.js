import './App.css';
import AttributeControl from './components/AttributeControl.js';
import ClassList from './components/ClassList.js';
import SkillControl from './components/SkillControl.js';


const App = () => {

    return (
        <div className="App">
            <header className="App-header">
                <h1>React Coding Exercise</h1>
            </header>
            <section className="App-section">
                <AttributeControl />
                <ClassList />
                <SkillControl />
            </section>
        </div>
    );
}

export default App;
