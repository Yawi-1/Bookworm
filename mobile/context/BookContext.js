import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { useAuth } from '../context/AuthContent';
const BookContext = createContext();

export const BookProvider = ({ children }) => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const { state } = useAuth();
    const token = state?.token;



    const addBook = async (book) => {
        setLoading(true);
        if (!token) {
            alert('Token is missing')
            return;
        }
        try {
            const { data } = await axios.post('/books', book, {
                headers: {
                    'Authorization': `Bearer ${token}`,
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


    const getBooks = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get('/books/', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setBooks(data.books);
        } catch (error) {
            console.log(error)
            console.log(error?.response?.data?.message || 'Failed to fetch books.');
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        // console.log('Fetching books')
        if (token) {
            getBooks();
        };
    }, [token])



    return (
        <BookContext.Provider value={{ books, addBook, loading }}>
            {children}
        </BookContext.Provider>
    )
}
export const useBooks = () => useContext(BookContext);