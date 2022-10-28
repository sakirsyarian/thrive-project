import React, { useState, useEffect } from "react";
import AsyncStorage from '@react-native-community/async-storage';
import { Card, Layout, Avatar, Text, Button } from '@ui-kitten/components';
import {
    Image,
    // Text,
    View,
    StyleSheet,
    // Button,
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
        <TouchableOpacity onPress={onPress} activeOpacity={1.0}>
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
        <Layout style={styles.container} level='2'>
            <Card style={styles.card} status='danger'>
                <Layout style={styles.profile} level='1'>
                    <Avatar source={{ uri: image }} size='giant' style={styles.image} />

                    <Text style={styles.text} status='danger'>{name}</Text>
                </Layout>
            </Card>

            <Layout style={styles.containerButton} level='2'>
                <Button style={styles.button} status='primary' onPress={() => { navigation.navigate('Upload'); }}>
                    Upload
                </Button>

                <Button style={styles.button} status='danger' onPress={() => { navigation.navigate('Login'); }}>
                    Sign Out
                </Button>
            </Layout>

            <Card style={styles.card} status='danger'>
                <Layout style={styles.listImages} level='1'>
                    <FlatList
                        data={allData}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        horizontal={false}
                        numColumns={3}
                    />
                </Layout>
            </Card>
        </Layout>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
    },
    containerHead: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    containerButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginHorizontal: 30,
    },
    card: {
        margin: 30,
    },
    profile: {
        flexDirection: 'row',
    },
    image: {
        marginRight: 30,
    },
    imageList: {
        width: 80,
        height: 80,
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
        margin: 10,
    },
});

export default Home;