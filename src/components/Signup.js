import { useState } from "react";
import {useNavigate} from "react-router-dom";
const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phoneNumber: '',
        profession: ''
    });
    const [loginData, setLoginData] = useState({
        name: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [isLogin, setIsLogin] = useState(true); 
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (isLogin) {
            setLoginData({ ...loginData, [name]: value });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isLogin) {
            
            const userData = JSON.parse(localStorage.getItem('userData'));
            if (userData && userData.name === loginData.name && userData.password === loginData.password) {
                localStorage.setItem('login',true);
                navigate("/movies");
            } else {
                setError('Invalid Credentials');
            }
        } else {
            navigate("/movies");
            localStorage.setItem('userData', JSON.stringify(formData));
            localStorage.setItem('login',true);
        }
    };

    const toggleForm = () => {
        setIsLogin(!isLogin);
        setError(''); 
    };

    return (
<div className="h-screen flex justify-center items-center">
        <div className="lg:w-1/3 sm:w-3/4 md:w-1/3 mt-8 bg-gray-100 shadow-md p-5 rounded-md">

            <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
                <h2 className="text-3xl font-bold mb-4 text-center">{isLogin ? 'Login' : 'Sign up'}</h2>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700">Name</label>
                    <input type="text" id="name" name="name" value={isLogin ? loginData.name : formData.name} onChange={handleChange} 
                    placeholder="Enter your name" required
                    className=" mt-1 block w-full rounded-sm" />
                </div>
                {!isLogin && (
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700">Email</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} 
                        placeholder="Enter your email" className="form-input mt-1 block w-full rounded-sm" required/>
                    </div>
                )}
                {!isLogin && (
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700">Password</label>
                        <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} 
                        placeholder="Enter your password" className="form-input mt-1 block w-full rounded-sm" required/>
                    </div>
                )}
                {!isLogin && (
                    <div className="mb-4">
                        <label htmlFor="phoneNumber" className="block text-gray-700">Phone Number</label>
                        <input type="tel" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} 
                        placeholder="Enter your number" required
                        className="form-input mt-1 block w-full rounded-sm" />
                    </div>
                )}
                {!isLogin && <div className="mb-4">
                    <label htmlFor="profession" className="block text-gray-700">Profession</label>
                    <select id="profession" name="profession" value={formData.profession} onChange={handleChange} 
                    className="form-select mt-1 block w-full rounded-sm">
                        <option value="">Select Profession</option>
                        <option value="Student">Student</option>
                        <option value="Professional">Professional</option>
                        <option value="Business">Business</option>
                        <option value="Teacher">Teacher</option>
                        <option value="Doctor">Doctor</option>
                        <option value="Other">Other</option>
                    </select>
                </div>}
                {isLogin && (
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700">Password</label>
                        <input type="password" id="password" name="password" value={loginData.password} onChange={handleChange} autoComplete="current-passowrd" 
                        placeholder="Confirm password" required
                        className="form-input mt-1 block w-full rounded-sm" />
                    </div>
                )}
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <button type="submit" className="mt-4 bg-blue-500 text-white px-3 py-2 rounded hover:bg-green-600 w-full">{isLogin ? 'Login' : 'Signup'}</button>
                <p className="mt-4 text-gray-400 text-center">{isLogin ? "Don't have an account? " : "Already have an account? "}
                    <button type="button" className="text-blue-500" onClick={toggleForm}>
                        {isLogin ? 'Signup' : 'Login'}
                    </button>
                </p>
            </form>
        </div>
        </div>
    );
};
export default Signup;