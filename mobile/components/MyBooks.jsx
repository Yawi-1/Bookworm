import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import styles from '../assets/styles/profile.styles'
import { Image } from 'expo-image'
import RatingStars from './RatingStars'
import { MaterialIcons } from '@expo/vector-icons'
import COLORS from '../constants/color'
import DeleteModal from '../components/ConfirmModal'
import { useState } from 'react'
const MyBooks = ({ myBooks, deleteBook }) => {
  const [showModal, setShowModal] = useState(false);
  const handleDelete = async (id) => {
    await deleteBook(id)
    setShowModal(false);
  }

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
            onPress={() => setShowModal(true)}
          >
            <DeleteModal visible={showModal} onClose={() => setShowModal(false)} onConfirm={() => handleDelete(item._id)} text={'Are you sure want to delete ?'} />
            <MaterialIcons name="delete" size={20} color={COLORS.textSecondary} />
          </TouchableOpacity>
        </View>
      )}
    />
  )
}

export default MyBooks