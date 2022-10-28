import React, { useState } from "react";
import AsyncStorage from '@react-native-community/async-storage';
import {
    View,
    Image,
    KeyboardAvoidingView,
    TextInput,
    StyleSheet,
    Text,
    Platform,
    TouchableWithoutFeedback,
    Button,
    Keyboard
} from 'react-native';

const Login = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [username, setUsername] = useState('user_9');
    const [password, setPassword] = useState('secret');

    const getApiData = async () => {
        if (username === '' || password === '') {
            console.error("username or password not filled")
            return;
        }

        try {
            setIsLoading(true);
            const getData = await fetch(
                'https://playgroundapi.com/bootcamp/api/web/user/login',
                {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username,
                        password,
                    }),
                },
            );

            if (getData.status === 200) {
                const result = await getData.json();

                await AsyncStorage.setItem('image', result.data.avatar_url);
                await AsyncStorage.setItem('name', result.data.username);
                await AsyncStorage.setItem('token', result.data.token);

                setIsLoading(false);

                navigation.navigate('Home');
            }

        } catch (e) {
            console.log(e);
        }

        return;
    }

    return !isLoading ? (
        <View style={styles.container}>
            <View style={styles.containerImage}>
                <Image source={require('../images/telkomsel.png')} style={styles.image} />
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === "android" ? "padding" : "height"}
                style={styles.containerForm}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View>
                        <Text style={styles.textHeading}>Login with your credential</Text>

                        <View style={styles.formInput}>
                            <TextInput
                                placeholderTextColor="gray"
                                style={styles.inputName}
                                placeholder="Username"
                                value={username}
                                onChangeText={(value) => {
                                    setUsername(value)
                                }}
                            />
                            <TextInput
                                placeholderTextColor="gray"
                                style={styles.inputPass}
                                placeholder="Password"
                                secureTextEntry={true}
                                value={password}
                                onChangeText={(value) => {
                                    setPassword(value)
                                }}
                            />
                        </View>

                        <Button
                            title="Sign In"
                            color="#d4293b"
                            onPress={() => {
                                getApiData();
                            }}
                        />
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </View>
    ) : (
        <View style={styles.containerLoad}>
            <Text style={styles.text}>Loading...</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
    },
    containerImage: {
        flex: 1.5,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerForm: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
    },
    containerLoad: {
        display: 'flex',
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
    },
    textHeading: {
        color: '#fb990c',
        fontWeight: '600',
        fontSize: 18,
        marginBottom: 25,
    },
    text: {
        color: "black",
        fontSize: 15,
        padding: 10,
    },
    image: {
        width: 250,
        height: 250,
    },
    formInput: {
        marginBottom: 20,
    },
    inputName: {
        borderWidth: 1,
        borderColor: '#d4293b',
        marginBottom: 15,
        padding: 10,
        color: 'gray',
    },
    inputPass: {
        borderWidth: 1,
        borderColor: '#d4293b',
        padding: 10,
        color: 'gray',
    },
});

export default Login;