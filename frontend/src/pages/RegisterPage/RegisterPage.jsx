import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const navigate = useNavigate();


    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:8080/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    email,
                    password,
                }),
            });

            const data = await response.json();


            if (response.ok) {
                localStorage.setItem("token", data.token);
                navigate("/login");
            } else {
                const message = data.errors
                    ? data.errors.join(", ")
                    : data.message || "Register failed";

                alert(message);
            }
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="flex flex-col  w-1/4 h-auto border bg-white p-8 gap-y-4 shadow">
                <p className="text-center text-4xl font-rotunda text-[#34113F] py-6">
                    Join the <br/> Workspace
                </p>

                <form onSubmit={handleRegister} className="space-y-4">

                    <div>
                        <label className="text-gray-600 font-fabrikat">FIRST NAME</label>

                        <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                            className="w-full p-3 border bg-[#f1f3fc] text-black"
                        />
                    </div>

                    <div>
                        <label className="text-gray-600 font-fabrikat">LAST NAME</label>

                        <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                            className="w-full p-3 border bg-[#f1f3fc] text-black"
                        />
                    </div>

                    <div>
                        <label className="text-gray-600 font-fabrikat" >EMAIL ADDRESS</label>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full p-3 border bg-[#f1f3fc] text-black"
                        />
                    </div>

                    <div>
                        <label className="text-gray-600 font-fabrikat">PASSWORD</label>

                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full p-3 border bg-[#f1f3fc] text-black"
                        />
                    </div>

                    <button type="submit" className="items-center mt-2 p-3.5 w-full bg-[#34113F] text-white cursor-pointer">Create Account</button>

                </form>

                <div className="flex flex-row gap-2 items-center justify-center h-auto">
                    <p className="text-center text-l text-[#34113F] py-6">
                        Already part of the network?
                    </p>
                    <p
                        onClick={() => navigate('/login')}
                        className="text-center text-l font-bold text-[#34113F] py-10 cursor-pointer">
                        Sign In
                    </p>
                </div>

            </div>
        </div>
    )
}

export default RegisterPage;