import React, { useState } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';

const Flags = ({ language, onLanguageChange }) => {
    const [showFlags, setShowFlags] = useState(false);
    const flags = ["English", "Hungarian", "Deutsch", "Français", "Italiano", "Español"];

    return (
        <View>
            <View
                style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                onMouseEnter={() => setShowFlags(true)}
                onMouseLeave={() => setShowFlags(false)}
            >
                <Image style={{ width: 30, height: 20 }} source={{ uri: `/images/flags/${language}.png` }} />
                {showFlags &&
                    flags.map((flag) => (
                        <TouchableOpacity key={flag} onPress={() => onLanguageChange(flag)}>
                            <Image
                                style={{ width: 30, height: 20, marginLeft: 5 }}
                                source={{ uri: `/images/flags/${flag}.png` }}
                            />
                        </TouchableOpacity>
                    ))}
            </View>
        </View>
    );
};

export default Flags;