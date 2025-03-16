import axios from "axios";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

export function TodoUserRegister() {
    let navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            UserId: '',
            UserName: '',
            Password: '',
            Email: '',
            Mobile: ''
        },
        onSubmit: (user) => {
            axios.post(`http://127.0.0.1:3200/register-user`, user)
                .then(() => {
                    alert('Registered Successfully...');
                    navigate('/login');
                });
        }
    });

    return (
        <div className="register-container d-flex justify-content-center align-items-center">
            <div className="register-card p-4 shadow-lg">
                <h3 className="register-title text-center">Register User</h3>
                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">User ID</label>
                        <input type="text"required name="UserId" onChange={formik.handleChange} className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">User Name</label>
                        <input type="text" required name="UserName" onChange={formik.handleChange} className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input type="password" required name="Password" onChange={formik.handleChange} className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input type="email" required name="Email" onChange={formik.handleChange} className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Mobile No</label>
                        <input type="number"  required name="Mobile" onChange={formik.handleChange} className="form-control" />
                    </div>
                    <button className="btn btn-primary w-100">Register</button>
                </form>
                <div className="register-links text-center mt-3">
                    <Link to="/" className="me-3">🏠 Home</Link>
                    <Link to="/login">🔑 Have an Account?</Link>
                </div>
            </div>
        </div>
    );
}
