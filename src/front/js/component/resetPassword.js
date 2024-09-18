import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const { uuid } = useParams(); // Extract UUID from URL params
    const apiUrl = process.env.BACKEND_URL; // Backend URL

    const handlePasswordReset = async (event) => {
        event.preventDefault();

        if (newPassword !== confirmPassword) {
            setMessage("Passwords do not match.");
            return;
        }

        try {
            const response = await fetch(`${apiUrl}/reset-password/${uuid}`, {
                method: "PUT", // PUT request to reset password
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ newPassword }),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const data = await response.json();
            if (data.msg === "Password updated") {
                setMessage("Password has been successfully updated!");
                setTimeout(() => {
                    navigate("/"); // Redirect to login page after success
                }, 3000);
            } else {
                setMessage("Error: Could not update the password.");
            }
        } catch (error) {
            console.error("Error:", error);
            setMessage("There was a problem updating your password. Please try again.");
        }
    };

    return (
        <div className="reset-password-container">
            <h2>Reset Password</h2>
            <form onSubmit={handlePasswordReset}>
                <input
                    type="password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <button type="submit">Reset Password</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default ResetPassword;