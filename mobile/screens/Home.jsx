import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, ActivityIndicator } from 'react-native';
import styles from '../assets/styles/home.styles'; // Adjust the path based on your structure
import COLORS from '../constants/color';
import RatingStars from '../components/RatingStars';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulate fetching data
  useEffect(() => {
    setTimeout(() => {
      // Replace this with your real API call
      setBooks([
        {
          id: '1',
          username: 'Yawi',
          avatar: 'https://i.pravatar.cc/150?img=12',
          image: 'https://books.google.co.in/books/publisher/content?id=fo5REQAAQBAJ&pg=PA1&img=1&zoom=3&hl=en&bul=1&sig=ACfU3U1JPo9J8o2UqMIQ1Se8bfLWB2EPZA&w=1280',
          title: 'Atomic Habits',
          caption: 'A great book on habits and behavior change.',
          date: 'June 22, 2025',
          rating:3.5
        },
        {
          id: '2',
          username: 'Aazra',
          avatar: 'https://i.pravatar.cc/150?img=5',
          image: 'https://books.google.co.in/books/publisher/content?id=lZpFCgAAQBAJ&pg=PA1&img=1&zoom=3&hl=en&bul=1&sig=ACfU3U2EA4BHcru6ODs7tAdmuUQ4ca-Xpw&w=1280',
          title: 'Deep Work',
          caption: 'Mastering the ability to focus without distraction.',
          date: 'June 21, 2025',
          rating:4
        },
      ]);
      setLoading(false);
    }, 1500);
  }, []);

  const renderBook = ({ item }) => (
    <View style={styles.bookCard}>
      <View style={styles.bookHeader}>
        <View style={styles.userInfo}>
          <Image source={{ uri: item.avatar }} style={styles.avatar} />
          <Text style={styles.username}>{item.username}</Text>
        </View>
        <Text style={styles.date}>{item.date}</Text>
      </View>

      <View style={styles.bookImageContainer}>
        <Image source={{ uri: item.image }} style={styles.bookImage} resizeMode="cover" />
      </View>

      <View style={styles.bookDetails}>
        <Text style={styles.bookTitle}>{item.title}</Text>
        <RatingStars rating={item.rating}/>
        <Text style={styles.caption}>{item.caption}</Text>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.listContainer}
        data={books}
        keyExtractor={(item) => item.id}
        renderItem={renderBook}
        ListHeaderComponent={() => (
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Book Feed</Text>
            <Text style={styles.headerSubtitle}>Explore what others are reading</Text>
          </View>
        )}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No Books Found</Text>
            <Text style={styles.emptySubtext}>Start adding books to see them here.</Text>
          </View>
        )}
      />
    </View>
  );
};

export default Home;
