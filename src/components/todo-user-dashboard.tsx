import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./styles.css";

type User = {
    UserId: string;
    UserName: string;
    Email: string;
    Mobile: string;
};

type Task = {
    Appointment_Id: string;
    Title: string;
    Description: string;
    Date: string;
};

export function TodoUserDashboard() {
    const [user, setUser] = useState<User | null>(null);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [cookies] = useCookies(["userid"]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!cookies.userid) return;

        axios.get<User[]>(`http://127.0.0.1:3200/users`).then((response) => {
            const foundUser = response.data.find((u: User) => u.UserId === cookies.userid);
            if (foundUser) setUser(foundUser);
        });

        axios.get<Task[]>(`http://127.0.0.1:3200/appointments/${cookies.userid}`).then((response) => {
            setTasks(response.data);
        });
    }, [cookies.userid]);

    const handleDeleteTask = async (id: string) => {
        try {
            await axios.delete(`http://127.0.0.1:3200/delete-appointment/${id}`);
            setTasks((prevTasks) => prevTasks.filter(task => task.Appointment_Id !== id));
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    return (
        <div className="container py-4 d-flex flex-column align-items-center">
            {/* User Profile Heading & Add Appointment Button */}
            <div className="d-flex justify-content-between align-items-center w-100" style={{ maxWidth: "600px" }}>
                <h4 className=" fw-bold m-0">User Profile</h4>
                <button 
                    className="btn btn-success btn-sm px-3 py-1  rounded shadow-sm" 
                    style={{ fontSize: "14px" }} 
                    onClick={() => navigate("/add-appointment")}
                >
                    <i className="bi bi-calendar-plus"></i> Add Appointment
                </button>
            </div>

            {/* User Profile Section */}
            {user && (
                <div className="w-100 mt-3" style={{ maxWidth: "600px" }}>
                    <div className="p-4 bg-white shadow-sm rounded text-center">
                        <h3 className="fw-bold text-dark">
                            Hello <em>{user.UserName}!</em>
                        </h3>
                        <p className="text-secondary mb-1">
                            <i className="bi bi-envelope"></i> {user.Email}
                        </p>
                        <p className="text-secondary">
                            <i className="bi bi-telephone"></i> {user.Mobile}
                        </p>
                    </div>
                </div>
            )}

            {/* Appointments Section */}
            <div className="w-100 mt-4" style={{ maxWidth: "600px" }}>
                <h4 className="text-dark fw-bold">Your Appointments</h4>
                {tasks.length === 0 ? (
                    <p className="text-muted">No appointments added yet.</p>
                ) : (
                    <div className="d-flex flex-column align-items-center gap-3">
                        {tasks.map((task) => (
                            <div key={task.Appointment_Id} className="w-100">
                                <div className="card shadow-sm p-2">
                                    <div className="card-body">
                                        <h6 className="fw-bold text-primary">{task.Title}</h6>
                                        <p className="text-muted small">{task.Description}</p>
                                        <small className="text-muted">Date: {new Date(task.Date).toLocaleDateString()}</small>
                                    </div>
                                    <div className="card-footer d-flex gap-2">
                                        <button className="btn btn-warning btn-sm flex-fill"
                                            onClick={() => navigate(`/edit-appointment/${task.Appointment_Id}`, { state: task })}>
                                            <i className="bi bi-pencil-square"></i> Edit
                                        </button>
                                        <button className="btn btn-danger btn-sm flex-fill" onClick={() => handleDeleteTask(task.Appointment_Id)}>
                                            <i className="bi bi-trash"></i> Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
