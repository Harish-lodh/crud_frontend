import React, { useEffect, useState } from 'react';
import CreateIcon from '@mui/icons-material/Create';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import WorkIcon from '@mui/icons-material/Work';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { NavLink, useParams, useNavigate } from 'react-router-dom';

const Details = () => {
    const [getuserdata, setUserdata] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();

    const getdata = async () => {
        try {
            const res = await fetch(`https://project-1-wppc.onrender.com/getuser/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await res.json();

            if (res.status === 422 || !data) {
                console.error("Error fetching data");
            } else {
                setUserdata(data);
                console.log("Data fetched successfully");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        getdata();
    }, [id]);

    const deleteuser = async (id) => {
        try {
            const res = await fetch(`https://project-1-wppc.onrender.com/deleteuser/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const deletedata = await res.json();

            if (res.status === 422 || !deletedata) {
                console.error("Error deleting user");
            } else {
                console.log("User deleted successfully");
                navigate('/'); // Navigate to a different page after deletion, such as the home page
            }
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    return (
        <div className="container mt-3">
            <h1 style={{ fontWeight: 400 }}>Welcome to harish lodh</h1>

            <Card sx={{ maxWidth: 600 }}>
                <CardContent>
                    <div className="add_btn">
                        <NavLink to={`/edit/${getuserdata._id}`}>
                            <button className="btn btn-primary mx-2">
                                <CreateIcon />
                            </button>
                        </NavLink>
                        <button className="btn btn-danger" onClick={() => deleteuser(getuserdata._id)}>
                            <DeleteOutlineIcon />
                        </button>
                    </div>
                    <div className="row">
                        <div className="left_view col-lg-6 col-md-6 col-12">
                            <img src="/user_img.png" style={{ width: 70 }} alt="profile" />
                            <h3 className="mt-3">Name: <span>{getuserdata.name}</span></h3>
                            <h3 className="mt-3">Age: <span>{getuserdata.age}</span></h3>
                            <p className="mt-3"><MailOutlineIcon />Email: <span>{getuserdata.email}</span></p>
                            <p className="mt-3"><WorkIcon />Occupation: <span>{getuserdata.work}</span></p>
                        </div>
                        <div className="right_view col-lg-6 col-md-6 col-12">
                            <p className="mt-5"><PhoneAndroidIcon />Mobile: <span>+91 {getuserdata.mobile}</span></p>
                            <p className="mt-3"><LocationOnIcon />Location: <span>{getuserdata.add}</span></p>
                            <p className="mt-3">Description: <span>{getuserdata.desc}</span></p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Details;

