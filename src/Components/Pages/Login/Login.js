import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import './Login.css';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {

    const navigate = useNavigate();

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (isLoggedIn) {
            navigate("/"); 
        }
    }, [navigate]);

    const sendTokenToBackend = async (token) => {
        try {
            const response = await fetch("https://bluestarbackend.vercel.app/api/api/auth/google", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ token })
            });
            const data = await response.json();
            console.log("Backend Response:", data);
            if (data.access_token) {
                localStorage.setItem("access_token", data.access_token);
                localStorage.setItem("refresh_token", data.refresh_token);
                localStorage.setItem("avatar", data.avatar);
                localStorage.setItem("email", data.user.email);
                localStorage.setItem('isLoggedIn', true);
                localStorage.setItem("name", data.user.name);
                window.location.href = "/";
            }
        } catch (error) {
            console.error("Error sending token to backend:", error);
        }
    };

    return (
        <GoogleOAuthProvider clientId="891374767728-0v026vakvdcic7rqonj3reh80c04me68.apps.googleusercontent.com">
            <div className="login-container">
                <GoogleLogin
                    onSuccess={(response) => {
                        console.log("Login Success:", response);
                        const googleToken = response.credential;
                        sendTokenToBackend(googleToken);
                    }}
                    onError={() => console.log("Login Failed")}
                />
            </div>
        </GoogleOAuthProvider>
    );
}
