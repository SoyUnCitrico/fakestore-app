import React from 'react';
import { Link } from 'react-router-dom'

const Footer : React.FC = () => {
    return(
        <footer className="app-footer">
            <p>© {new Date().getFullYear()} FakeStore App. </p>
            <p>Desarrollado por <Link to ='https://www.github.com/SoyUnCitrico'>Emme</Link></p>
        </footer>
    )
}

export default Footer;