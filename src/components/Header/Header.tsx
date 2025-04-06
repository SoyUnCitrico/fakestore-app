import React from 'react';
import { Link } from 'react-router-dom';
import CartMenu from '../CartMenu/CartMenu';

const Header : React.FC= () => {
    return(
        <header className="app-header">
            <Link to="/" className="logo-link">FakeStore</Link>
            <CartMenu />
        </header>
    )
}

export default Header;