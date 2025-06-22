import { createContext, useContext, useEffect, useState } from "react";
const AuthContext = createContext();
import axios from 'axios'
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthProvider = ({ children }) => {

    const [state, setState] = useState({
        token: '',
        user: null
    });
    const [loading, setLoading] = useState(false);

    // Default axios settings
    axios.defaults.baseURL = 'http://192.168.168.13:8000/api';


    // Sign Up Function
    const signup = async (userdata) => {
        setLoading(true)
        try {
            const { data } = await axios.post('/auth/signup', userdata);
            setState({ ...state, token: data?.token, user: data?.user })
            await AsyncStorage.setItem('@user', JSON.stringify({ token: data?.token, user: data?.user }))
            alert(data?.message);
        } catch (error) {
            alert(error?.response?.data?.message || 'Signup failed .')
        } finally {
            setLoading(false)
        }
    }

    // Login function

    const login = async (userdata) => {
        setLoading(true)
        try {
            const { data } = await axios.post('/auth/login', userdata);
            setState({ ...state, token: data?.token, user: data?.user })
            await AsyncStorage.setItem('@user', JSON.stringify({ token: data?.token, user: data?.user }))
            alert(data.message);

        } catch (error) {
            console.log(error)
            alert(error?.response?.data?.message || 'Login failed.')
        } finally {
            setLoading(false)
        }
    }

    //   Get Async Storage data
    const userData = async () => {
        const storedData = await AsyncStorage.getItem('@user');
        if (storedData) {
            const data = JSON.parse(storedData);
            setState({ ...state, token: data?.token, user: data?.user })
        }
    }

    // Logout 
    const handleLogout = async () => {
        await AsyncStorage.removeItem('@user');
        setState({ token: '', user: null });
        alert('Logged out successfully')
    }

    useEffect(() => {
        userData();
    }, [])


    return (
        <AuthContext.Provider value={{ signup, loading, state, handleLogout, login }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);