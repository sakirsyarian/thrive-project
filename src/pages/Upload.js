import React, { useState } from 'react';
import DocumentPicker from 'react-native-document-picker';
import AsyncStorage from '@react-native-community/async-storage';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Button
} from 'react-native';

const Upload = ({ navigation }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [postFile, setPostFile] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const selectOneFile = async () => {
        try {
            const imagePicker = await DocumentPicker.pick({
                type: [DocumentPicker.types.images],
            });

            const dataFile = new FormData();
            dataFile.append('title', title);
            dataFile.append('description', description);
            dataFile.append('image', {
                name: imagePicker[0].name,
                type: imagePicker[0].type,
                uri: Platform.OS === 'ios' ?
                    imagePicker[0].uri.replace('file://', '')
                    : imagePicker[0].uri,
            });

            setPostFile(dataFile);

        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                alert('Canceled from single doc picker');
            } else {
                alert('Unknown Error: ' + JSON.stringify(err));
                throw err;
            }
        }
    }

    const postApiData = async () => {
        try {
            setIsLoading(true);
            const tokenUser = await AsyncStorage.getItem('token');

            const postData = await fetch(
                'https://playgroundapi.com/bootcamp/api/web/posting/post-data',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${tokenUser}`,
                    },
                    body: postFile,
                },
            );

            if (postData.status === 200) {
                console.log("Berhasil post data")

                setIsLoading(false);
                navigation.navigate('Home');

            } else {
                console.log("Gagal post data")
            }

        } catch (e) {
            console.log(e);
        }

        return;
    }

    return !isLoading ? (
        <View>
            <Text style={styles.textHeading}>Upload your Images Here</Text>

            <TextInput
                placeholderTextColor="gray"
                style={styles.inputForm}
                placeholder="Title"
                onChangeText={(value) => {
                    setTitle(value)
                }}
            />
            <TextInput
                placeholderTextColor="gray"
                style={styles.inputForm}
                placeholder="Description"
                multiline={true}
                numberOfLines={4}
                onChangeText={(value) => {
                    setDescription(value)
                }}
            />

            <Button
                title="Upload"
                color="blue"
                style={styles.button}
                onPress={() => {
                    selectOneFile();
                }}
            />
            <Button
                title="Submit"
                color="#d4293b"
                style={styles.button}
                onPress={() => {
                    postApiData();
                }}
            />
        </View>
    ) : (
        <View style={styles.containerLoad}>
            <Text style={styles.textLoading}>Loading...</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    containerLoad: {
        display: 'flex',
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
    },
    textHeading: {
        color: 'black',
    },
    textLoading: {
        color: "black",
        fontSize: 15,
        padding: 10,
    },
    inputForm: {
        borderWidth: 1,
        borderColor: '#d4293b',
        marginBottom: 15,
        padding: 10,
        color: 'gray',
    },
})

export default Upload;