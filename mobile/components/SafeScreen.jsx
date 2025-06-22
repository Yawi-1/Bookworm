import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
const SafeScreen = ({ children }) => {
    const insets = useSafeAreaInsets();
    return (
        <View style={{ flex: 1,backgroundColor:"#ede1d1", paddingTop: insets.top }}>
            {children}
        </View>
    )
}

export default SafeScreen