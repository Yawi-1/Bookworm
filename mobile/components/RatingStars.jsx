import React from 'react';
import { View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const RatingStars = ({ rating }) => {
  const filledStars = Math.floor(rating);
  const hasHalfStar = rating - filledStars >= 0.5;
  const totalStars = 5;

  return (
    <View style={{ flexDirection: 'row' }}>
      {[...Array(totalStars)].map((_, index) => {
        if (index < filledStars) {
          return <FontAwesome key={index} name="star" size={16} color="#f1c40f" />;
        } else if (index === filledStars && hasHalfStar) {
          return <FontAwesome key={index} name="star-half-full" size={16} color="#f1c40f" />;
        } else {
          return <FontAwesome key={index} name="star-o" size={16} color="#f1c40f" />;
        }
      })}
    </View>
  );
};

export default RatingStars;
