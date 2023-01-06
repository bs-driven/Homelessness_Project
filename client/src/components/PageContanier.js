import React, { useState } from 'react';
import Home from '../pages/Home';
import NavBar from './NavBar';
import Search from '../pages/SearchShelter';
import Saved from '../pages/SavedShelter';
import Login from './LoginForm';
import Signup from './SignUpForm'

export default function PageContainer (){
    const [currentPage, setCurrentPage] = useState('Home');

    const renderPage = () => {
        if (currentPage === 'Home') {
            return <Home />;
          }
          if (currentPage === 'Search') {
            return <Search />;
          }
          if (currentPage === 'Saved') {
            return <Saved />;
          }
          if (currentPage === 'Login') {
            return <Login />
          }
          if (currentPage === 'Signup') {
            return < Signup />
          }
          return <Home />

    };

    const handlePageChange = (page) => setCurrentPage(page);

    return(
        <div>
            <NavBar currentPage={currentPage} handlePageChange={handlePageChange} />
            {renderPage()}
        </div>
    )



}