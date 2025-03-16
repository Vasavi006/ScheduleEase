import axios from "axios";
import { useFormik } from "formik";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

export function ToDoUserLogin() {
    const [cookie, setCookie] = useCookies(["userid"]);
    let navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            UserId: "",
            Password: "",   
        },
        onSubmit: (user) => {
            axios.get(`http://127.0.0.1:3200/users`).then((response) => {
                var client = response.data.find((item: any) => item.UserId === user.UserId);
                if (client) {
                    if (client.Password === user.Password) {
                        setCookie("userid", user.UserId);
                        navigate("/user-dashboard");
                    } else {
                        alert("Invalid Password");
                    }
                } else {
                    alert("User Not Found");
                }
            });
        },
    });

    return (
        <div className="auth-container">
            <form className="auth-card" onSubmit={formik.handleSubmit}>
                <h3 className="auth-title">User Login</h3>

                <div className="auth-input-group">
                    <label className="form-label">User ID</label>
                    <input type="text" name="UserId" onChange={formik.handleChange} className="form-control" />
                </div>

                <div className="auth-input-group">
                    <label className="form-label">Password</label>
                    <input type="password" name="Password" onChange={formik.handleChange} className="form-control" />
                </div>

                <button type="submit" className="btn btn-primary auth-btn">Login</button>

                <div className="auth-links">
                    <Link to="/" className="auth-link">🏠 Home</Link>
                    <Link to="/register" className="auth-link">🔑 New User? Register</Link>
                </div>
            </form>
        </div>
    );
}
