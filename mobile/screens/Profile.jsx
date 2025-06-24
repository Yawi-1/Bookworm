import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import styles from '../assets/styles/profile.styles';
import COLORS from '../constants/color';
import { useAuth } from '../context/AuthContent';
import { useBooks } from '../context/BookContext';
import ProfileCard from '../components/ProfileCard';
import MyBooks from '../components/MyBooks';
import LogoutModal from '../components/LogoutModal';

const Profile = () => {
  const { handleLogout, state } = useAuth();
  const { user } = state;
  const { myBooks, fetchMyBooks, loading } = useBooks();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleDelete = (id) => {
    // const updatedBooks = books.filter((book) => book.id !== id);
    // setBooks(updatedBooks);
  };
  useEffect(() => {
    fetchMyBooks();
  }, []);

  return (
    <View style={styles.container}>
      {/* Profile Card */}
      <ProfileCard user={user} />
      {/* Logout Button */}
      <TouchableOpacity onPress={()=>setShowLogoutModal(true)} style={styles.logoutButton}>
        <MaterialIcons name="logout" size={20} color={COLORS.white} />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      {/* Header */}
      <View style={styles.booksHeader}>
        <Text style={styles.booksTitle}>Your Recommendations</Text>
        <Text style={styles.booksCount}>{myBooks.length} books</Text>
      </View>

      {/* Book List */}
      {myBooks.length === 0 ? (
        <>
          {
            loading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" />
              </View>
            ) : (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>
                  You haven't added any recommendations yet.
                </Text>
              </View>
            )
          }
        </>
      ) : (
        <MyBooks myBooks={myBooks} handleDelete={handleDelete} />
      )}

      {/* Logout Modal */}
      <LogoutModal visible={showLogoutModal} onClose={()=>setShowLogoutModal(false)} onConfirm={handleLogout}/>
    </View>
  );
};

export default Profile;
