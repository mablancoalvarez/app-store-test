import { useLocation, NavLink } from 'react-router-dom';

const ActiveLink = ({ to = '/', children, ...props }) => {
  return (
    <NavLink to={to} {...props} className={({ isActive }) => (isActive ? 'is-active' : '')}>
      {children}
    </NavLink>
  );
};
const Breadcrumb = () => {
  const location = useLocation();
  return (
    <nav role="navigation" className="breadcrumbs">
      <ActiveLink to="/">Home</ActiveLink>
      {location.pathname !== '/' && (
        <>
          <span className="breadcrumbs__separator">/</span>
          <ActiveLink to={location.pathname}>
            <span>{location.pathname.substring(1)}</span>
          </ActiveLink>
        </>
      )}
    </nav>
  );
};

export default Breadcrumb;
