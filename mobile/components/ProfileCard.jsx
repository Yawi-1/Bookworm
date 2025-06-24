import { View, Text } from 'react-native'
import styles from '../assets/styles/profile.styles'
import {Image} from 'expo-image'
const ProfileCard = ({user}) => {
    return (
        <View style={styles.profileHeader}>
            <Image
                source={{ uri: user.profilePic || 'https://randomuser.me/api/portraits/men/32.jpg' }}
                style={styles.profileImage}
            />
            <View style={styles.profileInfo}>
                <Text style={styles.username}>{user.username}</Text>
                <Text style={styles.email}>{user.email}</Text>
                <Text style={styles.memberSince}>Member since {new Date(user.createdAt).toLocaleDateString()}</Text>
            </View>
        </View>
    )
}

export default ProfileCard