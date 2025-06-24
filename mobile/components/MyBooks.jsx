import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import styles from '../assets/styles/profile.styles'
import { Image } from 'expo-image'
import RatingStars from './RatingStars'
import {MaterialIcons} from '@expo/vector-icons'
import COLORS from '../constants/color'
const MyBooks = ({myBooks}) => {
  return (
    <FlatList
          data={myBooks}
          keyExtractor={(item) => item._id}
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
                // onPress={() => handleDelete(item.id)}
              >
                <MaterialIcons name="delete" size={20} color={COLORS.textSecondary} />
              </TouchableOpacity>
            </View>
          )}
        />
  )
}

export default MyBooks