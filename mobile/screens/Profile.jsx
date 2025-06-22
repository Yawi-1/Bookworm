import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import styles from '../assets/styles/profile.styles'; // adjust path if needed
import COLORS from '../constants/color';
import { useAuth } from '../context/AuthContent';

const dummyBooks = [
  {
    id: '1',
    title: 'The Catcher in the Rye',
    rating: 3,
    caption: 'A classic coming-of-age novel about teenage alienation and rebellion.',
    image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f',
    date: '3/9/2025',
  },
  {
    id: '2',
    title: 'The Hunger Games',
    rating: 4,
    caption: 'A dystopian tale of survival, rebellion, and sacrifice.',
    image: 'https://images.unsplash.com/photo-1544717302-de2939b7ef71',
    date: '3/9/2025',
  },
  {
    id: '3',
    title: 'Sapiens',
    rating: 5,
    caption: 'A thought-provoking exploration of human history and our species.',
    image: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93',
    date: '3/9/2025',
  },
];

const RatingStars = ({ rating }) => {
  return (
    <View style={styles.ratingContainer}>
      {[1, 2, 3, 4, 5].map((index) => (
        <FontAwesome
          key={index}
          name={index <= rating ? 'star' : 'star-o'}
          size={14}
          color="#f1c40f"
        />
      ))}
    </View>
  );
};

const Profile = () => {
  const [books, setBooks] = useState(dummyBooks);
  const {handleLogout} = useAuth();

  const handleDelete = (id) => {
    const updatedBooks = books.filter((book) => book.id !== id);
    setBooks(updatedBooks);
  };

  return (
    <View style={styles.container}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <Image
          source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }}
          style={styles.profileImage}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.username}>John Doe</Text>
          <Text style={styles.email}>john@gmail.com</Text>
          <Text style={styles.memberSince}>Member since 3/9/2025</Text>
        </View>
      </View>

      {/* Logout Button */}
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <MaterialIcons name="logout" size={20} color={COLORS.white} />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      {/* Header */}
      <View style={styles.booksHeader}>
        <Text style={styles.booksTitle}>Your Recommendations</Text>
        <Text style={styles.booksCount}>{books.length} books</Text>
      </View>

      {/* Book List */}
      {books.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            You haven't added any recommendations yet.
          </Text>
        </View>
      ) : (
        <FlatList
          data={books}
          keyExtractor={(item) => item.id}
          style={styles.booksList}
          renderItem={({ item }) => (
            <View style={styles.bookItem}>
              <Image source={{ uri: item.image }} style={styles.bookImage} />
              <View style={styles.bookInfo}>
                <Text style={styles.bookTitle}>{item.title}</Text>
                <RatingStars rating={item.rating} />
                <Text style={styles.bookCaption} numberOfLines={2}>
                  {item.caption}
                </Text>
                <Text style={styles.bookDate}>{item.date}</Text>
              </View>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDelete(item.id)}
              >
                <MaterialIcons name="delete" size={20} color={COLORS.textSecondary} />
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default Profile;
