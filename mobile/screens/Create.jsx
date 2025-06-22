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
} from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import styles from '../assets/styles/add.styles' 
import COLORS from '../constants/color';

const Create = () => {
  const [title, setTitle] = useState('');
  const [rating, setRating] = useState(0);
  const [caption, setCaption] = useState('');
  const [imageUri, setImageUri] = useState(null);

  const handleRating = (index) => {
    setRating(index);
  };

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    console.log({
      title,
      rating,
      imageUri,
      caption,
    });
    // Send data to backend or state management
  };

  return (
    <KeyboardAvoidingView
      style={styles.scrollViewStyle}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.title}>Add Book Recommendation</Text>
            <Text style={styles.subtitle}>
              Share your favorite reads with others
            </Text>
          </View>

          {/* Book Title */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Book Title</Text>
            <View style={styles.inputContainer}>
              <MaterialIcons name="menu-book" size={20} style={styles.inputIcon} color={COLORS.textSecondary} />
              <TextInput
                placeholder="Enter book title"
                placeholderTextColor={COLORS.textSecondary}
                value={title}
                onChangeText={setTitle}
                style={styles.input}
              />
            </View>
          </View>

          {/* Rating */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Your Rating</Text>
            <View style={styles.ratingContainer}>
              {[1, 2, 3, 4, 5].map((index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.starButton}
                  onPress={() => handleRating(index)}
                >
                  <FontAwesome
                    name={index <= rating ? 'star' : 'star-o'}
                    size={24}
                    color="#f1c40f"
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Image Picker */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Book Image</Text>
            <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
              {imageUri ? (
                <Image source={{ uri: imageUri }} style={styles.previewImage} />
              ) : (
                <View style={styles.placeholderContainer}>
                  <MaterialIcons name="image" size={40} color={COLORS.textSecondary} />
                  <Text style={styles.placeholderText}>Tap to select image</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          {/* Caption */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Caption</Text>
            <TextInput
              placeholder="Write your review or thoughts about this book..."
              placeholderTextColor={COLORS.textSecondary}
              value={caption}
              onChangeText={setCaption}
              multiline
              style={styles.textArea}
            />
          </View>

          {/* Submit Button */}
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <MaterialIcons name="send" size={20} color={COLORS.white} style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Create;
