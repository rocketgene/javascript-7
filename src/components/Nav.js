import { NavLink } from 'react-router-dom';


function Nav() {
    return (
        <nav className="main-nav">
            <ul>
                <li><NavLink to='/sea'>Sea</NavLink></li>
                <li><NavLink to='/mountain'>Mountain</NavLink></li>
                <li><NavLink to='/waterfall'>Waterfall</NavLink></li>
            </ul>
        </nav>
    )
}

export default Nav;