import axios from "axios";
import { useFormik } from "formik";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

export function ToDoAddAppointment() {
    const [cookie] = useCookies(["userid"]);
    let navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            Appointment_Id: 0,
            Title: "",
            Description: "",
            Date: "",
            UserId: cookie["userid"],
        },
        onSubmit: (appointment) => {
            axios.post(`http://localhost:3200/add-appointment`, appointment)
                .then(() => {
                    alert("Appointment added successfully...");
                    navigate("/user-dashboard");
                });
        },
    });

    return (
        <div className="page-container d-flex align-items-center justify-content-center">
            <div className="appointment-card">
                <h3 className="appointment-title">Add New Appointment</h3>
                <form onSubmit={formik.handleSubmit}>
                    <div className="form-group text-start">
                        <label className="form-label">Appointment Id</label>
                        <input type="number"required name="Appointment_Id" onChange={formik.handleChange} className="form-control" />
                    </div>
                    <div className="form-group text-start">
                        <label className="form-label">Title</label>
                        <input type="text" name="Title" required onChange={formik.handleChange} className="form-control" />
                    </div>
                    <div className="form-group text-start">
                        <label className="form-label">Description</label>
                        <input type="text" name="Description" required onChange={formik.handleChange} className="form-control" />
                    </div>
                    <div className="form-group text-start">
                        <label className="form-label">Date</label>
                        <input type="date" name="Date"  required onChange={formik.handleChange} className="form-control" />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Add Appointment</button>
                    <div className="text-center mt-3">
                        <Link to="/user-dashboard" className="custom-link">🔙 Back to Dashboard</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
