// import { useState } from "react";
// import api from "../api";
// import { useNavigate } from "react-router-dom";
// import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
// import "../styles/Form.css";
// import LoadingIndicator from "./LoadingIndicator";
// import { useDispatch, useSelector } from 'react-redux';
// import { 
//     signInStart, 
//     signInSuccess, 
//     signInFailure, 
//     updateUserStart, 
//     updateUserSuccess, 
//     updateUserFailure 
// } from '../redux/user/userSlice';

// function Form({ route, method }) {
//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const { loading, error } = useSelector((state) => state.user); 
//     const name = method === "login" ? "Login" : "Register";

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         if (method === "login") {
//             dispatch(signInStart());
//         } else {
//             dispatch(updateUserStart()); 
//         }

//         try {
//             const res = await api.post(route, { username, password });

//             if (method === "login") {
//                 localStorage.setItem(ACCESS_TOKEN, res.data.access);
//                 localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
//                 dispatch(signInSuccess({ username })); // Dispatch success action with user data
//                 navigate("/");
//             } else {
//                 dispatch(updateUserSuccess({ username })); // Dispatch success action for registration
//                 navigate("/login");
//             }
//         } catch (error) {
//             if (method === "login") {
//                 dispatch(signInFailure(error.message)); // Dispatch failure action with error
//             } else {
//                 dispatch(updateUserFailure(error.message)); // Dispatch failure action for registration
//             }
//             alert(error.message);
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit} className="form-container">
//             <h1>{name}</h1>
//             <input
//                 className="form-input"
//                 type="text"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 placeholder="Username"
//             />
//             <input
//                 className="form-input"
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="Password"
//             />
//             {loading && <LoadingIndicator />} {/* Show loading indicator if loading is true */}
//             {error && <p className="error-message">{error}</p>} {/* Display error message if there's an error */}
//             <button className="form-button" type="submit">
//                 {name}
//             </button>
//         </form>
//     );
// }

// export default Form;
import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import LoadingIndicator from "./LoadingIndicator";
import { useDispatch, useSelector } from 'react-redux';
import { 
    signInStart, 
    signInSuccess, 
    signInFailure, 
    updateUserStart, 
    updateUserSuccess, 
    updateUserFailure 
} from '../redux/user/userSlice';

function Form({ route, method }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.user); 
    const name = method === "login" ? "Login" : "Register";

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (method === "login") {
            dispatch(signInStart());
        } else {
            dispatch(updateUserStart()); 
        }

        try {
            const res = await api.post(route, { username, password });

            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                dispatch(signInSuccess({ username })); 
                navigate("/");
            } else {
                dispatch(updateUserSuccess({ username })); 
                navigate("/login");
            }
        } catch (error) {
            if (method === "login") {
                dispatch(signInFailure(error.message)); 
            } else {
                dispatch(updateUserFailure(error.message)); 
            }
            alert(error.message);
        }
    };

    return (
        <div className="flex flex-col justify-end items-center min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900">
            <form 
                onSubmit={handleSubmit} 
                className="bg-white/10 backdrop-blur-md shadow-2xl rounded-2xl p-8 w-96 space-y-6 mb-16 transform transition-all duration-300 hover:scale-105">
                <h1 className="text-3xl font-bold text-center text-white mb-4">{name}</h1>
                <input
                    className="w-full px-4 py-3 bg-white/20 text-white placeholder-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                />
                <input
                    className="w-full px-4 py-3 bg-white/20 text-white placeholder-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                {loading && (
                    <div className="flex justify-center">
                        <LoadingIndicator />
                    </div>
                )}
                {error && (
                    <p className="text-red-500 text-sm text-center">{error}</p>
                )}
                <button
                    className="w-full py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 transition-transform transform hover:-translate-y-1 duration-300"
                    type="submit"
                >
                    {name}
                </button>
            </form>
        </div>
    );
}

export default Form;
