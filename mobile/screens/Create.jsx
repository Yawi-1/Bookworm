import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import styles from '../assets/styles/add.styles';
import COLORS from '../constants/color';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { useBooks } from '../context/BookContext'

const Create = () => {
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [rating, setRating] = useState(0);
  const [image, setImage] = useState(null); // object from picker
  const [preview, setPreview] = useState(null); // uri to show image
  const { addBook, loading } = useBooks();

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
      base64: false, 
    });

    if (!result.canceled) {
      const asset = result.assets[0];
      setPreview(asset.uri);
      setImage({
        uri: asset.uri,
        type: asset.type || 'image/jpeg',
        name: asset.fileName || 'photo.jpg',
      });
    }
  };

  const handleSubmit = async () => {
    if (!title || !caption || !rating || !image) {
      return Alert.alert('All fields are required');
    }
    const formData = new FormData();
    formData.append('title', title);
    formData.append('caption', caption);
    formData.append('rating', rating.toString());
    formData.append('image', image);
    console.log('hello')
    await addBook(formData);
  };

  return (
    <KeyboardAvoidingView
      style={styles.scrollViewStyle}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Add Book Recommendation</Text>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Book Title</Text>
            <TextInput
              placeholder="Enter book title"
              style={styles.input}
              value={title}
              onChangeText={setTitle}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Rating</Text>
            <View style={styles.ratingContainer}>
              {[1, 2, 3, 4, 5].map((num) => (
                <TouchableOpacity key={num} onPress={() => setRating(num)}>
                  <FontAwesome
                    name={rating >= num ? 'star' : 'star-o'}
                    size={24}
                    color="#f1c40f"
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Select Image</Text>
            <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
              {preview ? (
                <Image source={{ uri: preview }} style={styles.previewImage} />
              ) : (
                <View style={styles.placeholderContainer}>
                  <MaterialIcons name="image" size={40} color={COLORS.textSecondary} />
                  <Text style={styles.placeholderText}>Tap to select image</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Caption</Text>
            <TextInput
              multiline
              placeholder="Write your thoughts..."
              style={styles.textArea}
              value={caption}
              onChangeText={setCaption}
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            {
              loading ? (
                <ActivityIndicator size="small" color='#fff' />
              ) : (
                <>
                  <MaterialIcons name="send" size={20} color={COLORS.white} style={styles.buttonIcon} />
                  <Text style={styles.buttonText}>Submit</Text>
                </>
              )
            }

          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Create;
