import { Link } from "react-router-dom";
import { FaUserPlus, FaSignInAlt } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

export function TodoIndex() {
    return (
        <div className="page-container">
            <div className="todo-card">
                <h2 className="todo-title"> Schedule Ease</h2>
                <p className="todo-text">Manage your tasks easily and efficiently.</p>
                <div className="button-container">
                    <Link to="/register" className="btn btn-primary">
                        <FaUserPlus className="me-2" /> New Register User
                    </Link>
                    <Link to="/login" className="btn btn-secondary">
                        <FaSignInAlt className="me-2" /> Existing User Login
                    </Link>
                </div>
            </div>
        </div>
    );
}
