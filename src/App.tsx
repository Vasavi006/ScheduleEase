import React from 'react';
import logo from './logo.svg';
import './App.css';
import './components/todo.css';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import { TodoIndex } from './components/todo-index';
import { TodoUserRegister } from './components/todo-user-register';
import { ToDoUserLogin } from './components/todo-user-login';
import { ToDoAddAppointment } from './components/todo-add-appointment';
import {TodoUserDashboard} from './components/todo-user-dashboard';
import { EditTask } from './components/todo-edit-appointment';
//import {TodoUserDashboard } from './components/todo-user-dashboard';



 function App() {
  return (
    <div className="App bg-image">
     <section>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<TodoIndex/>}/>
        <Route path='register' element={<TodoUserRegister/>}/>
        <Route path='login' element={<ToDoUserLogin/>}/>
        <Route path='user-dashboard' element={<TodoUserDashboard/>}/>
        <Route path='add-appointment' element={<ToDoAddAppointment/>}/>
        <Route path='edit-appointment/:id' element={<EditTask/>}/>
        
      </Routes>
      </BrowserRouter>
     </section>
    </div>
  );
}

export default App;
