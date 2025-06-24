import { View, Text, FlatList, Image, ActivityIndicator } from 'react-native';
import styles from '../assets/styles/home.styles'; 
import COLORS from '../constants/color';
import RatingStars from '../components/RatingStars';
import { useBooks } from '../context/BookContext';
const Home = () => {
  const {books,loading} = useBooks();
 
  const renderBook = ({ item }) => (
    <View style={styles.bookCard}>
      <View style={styles.bookHeader}>
        <View style={styles.userInfo}>
          <Image source={{ uri: item.createdBy.profilePic }} style={styles.avatar} />
          <Text style={styles.username}>{item.createdBy.username}</Text>
        </View>
        <View>
        <Text style={[styles.date]}>{new Date(item.createdAt).toLocaleString()}</Text>
        </View>
        
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
        keyExtractor={(item) => item._id}
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
