import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import data from '../translator.json';

function Login() {
    const apiUrl = 'http://172.23.0.1:5150/api';
    const navigation = useNavigation();
    const [language, setLanguage] = useState('English');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const fetchFamilyId = async () => {
        try {
            const response = await fetch(`${apiUrl}/Family/${name}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });
            const json = await response.json();
            // AsyncStorage.setItem('familyId', json.id);
            // AsyncStorage.setItem('leader', json.leaderOfFamilyId);
            // AsyncStorage.setItem('language', language);
        } catch (error) {
            console.error('Error during fetchFamilyId:', error);
        }
    };

    const fetchLogin = async (familyname, familyPassword) => {
        try {
            const response = await fetch(`${apiUrl}/Family/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: 'Rédei', password: '030713Roland' }),
                redirect: 'follow',
            });

            if (response.status !== 200) {
                setMessage(data['Wrong login details'][language]);
                return null;
            }

            const fetchdata = await response.json();

            if (fetchdata != null) {
                // AsyncStorage.setItem('familyName', fetchdata.name);
            } else {
                setMessage(data['Wrong login details'][language]);
            }

            return fetchdata != null;
        } catch (error) {
            console.error('Error during fetchLogin:', error);
            return null;
        }
    };

    const handleLogin = async () => {
        // AsyncStorage.clear();
        const success = await fetchLogin(name, password);

        if (!success) {
            setMessage(data['Wrong login details'][language]);
        } else {
            await fetchFamilyId();
            setMessage('Success!!!');
            // AsyncStorage.setItem('familyName', name);
            // AsyncStorage.setItem('familyId', '2');
            // navigation.navigate('MainFamilyPage');
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'beige' }}>
            <View>
                <Text>{data['Login'][language]}</Text>
                <View>
                    <Text>{data['Family identifier'][language]}</Text>
                    <TextInput onChangeText={(text) => setName(text)} />
                </View>
                <View>
                    <Text>{data['Family password'][language]}</Text>
                    <TextInput onChangeText={(text) => setPassword(text)} secureTextEntry={true} />
                </View>
                <View>
                    <Button title={data['Login'][language]} onPress={handleLogin} />
                </View>
                <Text>{message}</Text>
                <View>
                    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                        <Button title={data['Back'][language]} />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

export default Login;
