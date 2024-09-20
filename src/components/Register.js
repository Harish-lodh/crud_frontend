import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { adddata } from './context/ContextProvider';

const Register = () => {
    const { setUdata } = useContext(adddata); // Assuming setUdata is for updating the context
    const navigate = useNavigate();

    const [inpval, setINP] = useState({
        name: "",
        email: "",
        age: "",
        mobile: "",
        work: "",
        add: "",
        desc: ""
    });

    const setdata = (e) => {
        const { name, value } = e.target;
        setINP((preval) => ({
            ...preval,
            [name]: value
        }));
    };

    const addinpdata = async (e) => {
        e.preventDefault();

        const { name, email, work, add, mobile, desc, age } = inpval;

        try {
            const res = await fetch("https://project-1-wppc.onrender.com/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name, email, work, add, mobile, desc, age
                })
            });

            const data = await res.json();
            console.log(data);

            if (res.status === 422 || !data) {
                console.error("Error occurred");
                alert("Error occurred");
            } else {
                navigate("/");
                setUdata(data);
                console.log("Data added successfully");
            }
        } catch (error) {
            console.error("Error adding data:", error);
            alert("An error occurred while adding data");
        }
    };

    return (
        <div className="container">
            <NavLink to="/">Home</NavLink>
            <form className="mt-4">
                <div className="row">
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input
                            type="text"
                            value={inpval.name}
                            onChange={setdata}
                            name="name"
                            className="form-control"
                            id="name"
                        />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            value={inpval.email}
                            onChange={setdata}
                            name="email"
                            className="form-control"
                            id="email"
                        />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="age" className="form-label">Age</label>
                        <input
                            type="text"
                            value={inpval.age}
                            onChange={setdata}
                            name="age"
                            className="form-control"
                            id="age"
                        />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="mobile" className="form-label">Mobile</label>
                        <input
                            type="tel"
                            value={inpval.mobile}
                            onChange={setdata}
                            name="mobile"
                            className="form-control"
                            id="mobile"
                        />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="work" className="form-label">Work</label>
                        <input
                            type="text"
                            value={inpval.work}
                            onChange={setdata}
                            name="work"
                            className="form-control"
                            id="work"
                        />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="address" className="form-label">Address</label>
                        <input
                            type="text"
                            value={inpval.add}
                            onChange={setdata}
                            name="add"
                            className="form-control"
                            id="address"
                        />
                    </div>
                    <div className="mb-3 col-lg-12 col-md-12 col-12">
                        <label htmlFor="desc" className="form-label">Description</label>
                        <textarea
                            name="desc"
                            value={inpval.desc}
                            onChange={setdata}
                            className="form-control"
                            id="desc"
                            cols="30"
                            rows="5"
                        ></textarea>
                    </div>
                    <button type="submit" onClick={addinpdata} className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default Register;
