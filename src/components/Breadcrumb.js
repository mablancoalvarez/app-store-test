import { useLocation, NavLink } from "react-router-dom"

const ActiveLink = ({ to = "/", children, ...props }) => {
    return (
        <NavLink to={to} {...props} className={({ isActive }) => (isActive ? "is-active" : "")}>
            {children}
        </NavLink>
    );

}
const Breadcrumb = () => {
    const location = useLocation();
    return (
        <nav className="breadcrumbs">
            <ActiveLink to="/">Home</ActiveLink>
            {location.pathname !== '/' &&
                <ActiveLink to={location.pathname}>
                    <span> /</span>
                    <span> Shop</span>
                </ActiveLink>

            }
        </nav >
    );

}
export default Breadcrumb;