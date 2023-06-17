import { Outlet, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';

export default function RootLayout() {
  return (
    <div>
      <header className="header">
        <h1>Bookstore CMS</h1>
        <FontAwesomeIcon className="user" icon={faCircleUser} />
        <nav>
          <NavLink className="link-item1" to="/">Book</NavLink>
          <NavLink className="link-item2" to="categories">Categories</NavLink>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>

    </div>
  );
}
