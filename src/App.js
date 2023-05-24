import React from "react"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css';
import Header from "./Header";
import SwipeButtons from "./SwipeButtons";
import TinderCards from "./TinderCards";
import UserForm from "./Post";

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={
        <div className="app">
          <Header />
          <TinderCards />
          <SwipeButtons />
        </div>} />
      <Route path="/post" element={
                <div className="app">
                <Header />
                <UserForm />
              </div>
      } />
    </Routes>
  </Router>
  );
}

export default App;
