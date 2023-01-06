import React from 'react';


function NavBar({ currentPage, handlePageChange }){

    return(
        <ul className="nav nav-tabs">
            <li className="nav-item">
        <a
          href="#home"
          onClick={() => handlePageChange('Home')}
          // This is a conditional (ternary) operator that checks to see if the current page is "Home"
          className={currentPage === 'Home' ? 'nav-link active' : 'nav-link'}
        >
          Home
        </a>
      </li>
      <li className="nav-item">
        <a
          href="#Search"
          onClick={() => handlePageChange('Search')}
          // Check to see if the currentPage is `About`, and if so we use the active link class from bootstrap. Otherwise, we set it to a normal nav-link
          className={currentPage === 'Search' ? 'nav-link active' : 'nav-link'}
        >
          Search
        </a>
        </li>
        <li className= "nav-item">
          <a href="#Login" ocClick={() => handlePageChange('Login')}
          className={currentPage === 'Login' ? 'nav-link active' : 'nav-link'}
          >Login</a>
        </li>
        <li className="nav-item">
          <a href='#Signup' onClick={() => handlePageChange('Signup')}
          className={currentPage === 'Signup' ? 'nav-link active' : 'nav-link'}
          >Signup</a>
        </li>
        </ul>

    )
} 
export default NavBar;