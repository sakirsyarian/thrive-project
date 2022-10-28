import React, { useState, useEffect } from "react";
import AsyncStorage from '@react-native-community/async-storage';
import {
    Image,
    Text,
    View,
    StyleSheet,
    Button,
    FlatList,
    TouchableOpacity
} from "react-native";

const Home = ({ navigation }) => {
    const [name, setName] = useState('');
    const [image, setImage] = useState(false);
    const [token, setToken] = useState('');
    const [allData, setAllData] = useState([]);

    const getLoginData = async (name, image, token) => {
        try {
            const nameUser = await AsyncStorage.getItem(name);
            const imageUser = await AsyncStorage.getItem(image);
            const tokenUser = await AsyncStorage.getItem(token);

            setName(nameUser);
            setImage(imageUser);
            setToken(tokenUser);

        } catch (e) {
            console.log(e);
        }
    };

    const getAllData = async () => {
        try {
            const getData = await fetch(
                'https://playgroundapi.com/bootcamp/api/web/posting/list-posting?page=0',
                {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                },
            );

            if (getData.status === 200) {
                const result = await getData.json();
                setAllData(result.data);
            }

        } catch (e) {
            console.log(e);
        }

        return;

    };

    const Item = ({ images, onPress }) => (
        <TouchableOpacity onPress={onPress} >
            <Image
                style={styles.imageList}
                source={{ uri: images }}
            />
        </TouchableOpacity>
    );

    const renderItem = ({ item }) => {
        return (
            <Item
                images={item.full_image_url}
                onPress={() => navigation.navigate('Detail', { item })}
            />
        )
    };

    useEffect(() => {
        getAllData();
        getLoginData('name', 'image', 'token');
    }, [getAllData()]);

    return (
        <View style={styles.container}>
            <View style={styles.profile}>
                <Image
                    style={styles.image}
                    source={{ uri: image }}
                />
                <View style={styles.info}>
                    <Text style={styles.username}>{name}</Text>
                    <Button
                        title="Upload"
                        color="blue"
                        onPress={() => {
                            navigation.navigate('Upload');
                        }}
                    />
                    <Button
                        title="Sign Out"
                        color="red"
                        onPress={() => {
                            navigation.navigate('Login');
                        }}
                    />
                </View>
            </View>
            <View style={styles.listImages}>
                <FlatList
                    data={allData}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    horizontal={false}
                    numColumns={3}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
    },
    profile: {
        flexDirection: 'row',
        padding: 30,
    },
    image: {
        width: 100,
        height: 100,
        marginRight: 30,
    },
    imageList: {
        width: 120,
        height: 120,
    },
    info: {
        flex: 1,
    },
    username: {
        color: 'black',
        marginBottom: 10,
    },
    listImages: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: 'center',
    },
});

export default Home;