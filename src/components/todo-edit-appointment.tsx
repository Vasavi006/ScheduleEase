import axios from "axios";
import { useFormik } from "formik";
import { useCookies } from "react-cookie";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./styles.css";

export function EditTask() {
    const [cookie] = useCookies(["userid"]);
    let navigate = useNavigate();
    let location = useLocation();
    const task = location.state;

    const formik = useFormik({
        initialValues: {
            Appointment_Id: task?.Appointment_Id || "",
            Title: task?.Title || "",
            Description: task?.Description || "",
            Date: task?.Date ? task.Date.split("T")[0] : "", // Ensure correct date format
            UserId: cookie["userid"],
        },
        onSubmit: (updatedTask) => {
            axios.put(`http://localhost:3200/edit-appointment/${updatedTask.Appointment_Id}`, updatedTask)
                .then(() => {
                    alert("Appointment updated successfully...");
                    navigate("/user-dashboard");
                });
        },
    });

    return (
        <div className="page-container d-flex align-items-center justify-content-center">
            <div className="appointment-card">
                <h3 className="appointment-title">Edit Appointment</h3>
                <form onSubmit={formik.handleSubmit}>
                    <div className="form-group text-start">
                        <label className="form-label">Appointment Id</label>
                        <input type="number" name="Appointment_Id" value={formik.values.Appointment_Id} className="form-control" disabled />
                    </div>
                    <div className="form-group text-start">
                        <label className="form-label">Title</label>
                        <input type="text" name="Title" value={formik.values.Title} onChange={formik.handleChange} className="form-control" />
                    </div>
                    <div className="form-group text-start">
                        <label className="form-label">Description</label>
                        <input type="text" name="Description" value={formik.values.Description} onChange={formik.handleChange} className="form-control" />
                    </div>
                    <div className="form-group text-start">
                        <label className="form-label">Date</label>
                        <input type="date" name="Date" value={formik.values.Date} onChange={formik.handleChange} className="form-control" />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Save Appointment</button>
                    <div className="text-center mt-3">
                        <Link to="/user-dashboard" className="custom-link">🔙 Back to Dashboard</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
