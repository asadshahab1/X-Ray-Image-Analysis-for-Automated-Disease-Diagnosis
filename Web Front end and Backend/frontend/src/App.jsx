import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Layout from './Layout';
import Home from './Home';
import SignIn from './SignIn';
import SignUp from './SignUp';


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout/>} >
            <Route index element={<Home/>} />
            <Route path='/signin' element={<SignIn/>}/>
            <Route path='/signup' element={<SignUp/>}/>

          </Route>

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
