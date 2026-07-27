import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();


    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:8080/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("token", data.token);
                navigate("/home");
            } else {
                const message = data.errors
                    ? data.errors.join(", ")
                    : data.message || "Login failed";

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
                <p className="text-2xl font-rotunda text-[#34113F] pt-6">
                    Welcome Back
                </p>
                <p className="text-l text-black pb-6">
                    Enter your credentials to enter the development environment.
                </p>

                <form onSubmit={handleLogin} className="space-y-4">

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

                    <button type="submit" className="items-center mt-2 p-3.5 w-full bg-[#34113F] text-white cursor-pointer">Sign In</button>

                </form>

                <div className="flex flex-row gap-2 items-center justify-center h-auto">
                    <p className="text-center text-l text-[#34113F] py-6">
                        New to the platform?
                    </p>
                    <p
                        onClick={() => navigate('/register')}
                        className="text-center text-l font-bold text-[#34113F] py-10 cursor-pointer">
                        Create an account
                    </p>
                </div>

            </div>
        </div>
    )
}

export default LoginPage;