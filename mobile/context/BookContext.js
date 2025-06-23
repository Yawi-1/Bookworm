import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
const BookContext = createContext();

export const BookProvider = ({ children }) => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);

    const addBook = async (book) => {
        console.log('first')
        setLoading(true);
        try {
            const { data } = await axios.post('http://192.168.31.233:8000/books/', book,{
                headers: {
                    'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NTdmMGViMDNlNjZmODcyNjczZTc2NiIsImlhdCI6MTc1MDY2NzM0NiwiZXhwIjoxNzUxMjcyMTQ2fQ.3M-OxYh7jpl1pNgq0n5LXet1QNavhbOGpAvu73MVJJ4`
                }
            });
            setBooks([...books, data.book]);
            alert('Book added successfully!');
        } catch (error) {
            console.log(error)
            console.log(error?.response?.data?.message || 'Failed to add book.');
        } finally {
            setLoading(false);
        }
    }

  

    return (
        <BookContext.Provider value={{ books, addBook, loading }}>
            {children}
        </BookContext.Provider>
    )
}
export const useBooks = () => useContext(BookContext);