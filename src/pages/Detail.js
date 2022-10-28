import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";

const Detail = ({ route }) => {
    const { item } = route.params;

    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={{ uri: item.full_image_url }}
            />

            <Text style={styles.text}>{item.id}</Text>
            <Text style={styles.text}>{item.title}</Text>
            <Text style={styles.text}>{item.created_at}</Text>
            <Text style={styles.text}>{item.description}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
    },
    text: {
        color: 'black',
    },
    image: {
        width: 200,
        height: 200,
    },
});

export default Detail;