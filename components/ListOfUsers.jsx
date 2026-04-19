import {View, StyleSheet, Text, FlatList} from "react-native";
import StyledText from "./StyledText";
import {COLORS} from "../constants/colors";
import UserSearchCard from "./UserSearchCard";

const ListOfUsers = ({users}) => {
    return <View style={styles.container} >
        <FlatList data={users} renderItem={({item}) => (
            <UserSearchCard userName={item} />
        )}/>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})

export default ListOfUsers;