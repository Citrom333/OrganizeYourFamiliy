import React, { useState, useEffect } from 'react';
import { View, Text, Button, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, NavigationContainer } from '@react-navigation/native';
import data from './translator.json';
import Flags from './Flags.js'; // Tegyél létre egy Flags.js fájlt, ahol a zászlókat kezeled

function Home() {
  const navigation = useNavigation();
  const [language, setLanguage] = useState('English');

  useEffect(() => {
    // Aszinkron adattárolás helyett használjuk az AsyncStorage-t
    const saveLanguage = async () => {
      try {
        await AsyncStorage.setItem('language', language);
      } catch (error) {
        console.error('AsyncStorage hiba:', error);
      }
    };

    saveLanguage();
  }, [language]);

  return (
    <>

      <SafeAreaView style={{ flex: 1, backgroundColor: "beige" }}>
        <Flags
          language={language}
          onLanguageChange={(flag) => setLanguage(flag)}
        />
        <View>
          {/* {navigation && navigation.isFocused() && ( // navigation.isFocused()-al ellenőrizd, hogy az aktuális képernyőn vagyunk-e */}
          <View>
            <Text>{data['HelloThisistheGreatFamilyOrganizer'][language]}</Text>
            <Text>{data['Doesyourfamilyhaveanaccount?'][language]}</Text>
            <Button title={data['Log in'][language]} onPress={() => navigation.navigate('Login')} />
            <Text>{data['If not, register now'][language]}</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
              <Button title={data['Sign up'][language]} />
            </TouchableOpacity>
          </View>
          {/* )} */}
        </View>
      </SafeAreaView>

    </>
  );
}

export default Home;