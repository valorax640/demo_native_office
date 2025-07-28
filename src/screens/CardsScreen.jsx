import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    Switch,
    ScrollView,
    Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = () => {
    const [pushNotification, setPushNotification] = useState(true);
    const [faceID, setFaceID] = useState(true);

    const confirmLogout = () => {
        Alert.alert(
            "Confirm Logout",
            "Are you sure you want to log out?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Logout", style: "destructive", onPress: () => handleLogout() }
            ]
        );
    };

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('token');
            navigation.navigate('Home');
        } catch (error) {
            console.error('Failed to logout:', error.message);
        }
    };

    return (
        <ScrollView style={styles.container}>
            {/* Avatar */}
            <View style={styles.avatarContainer}>
                <Image
                    source={{ uri: 'https://cdn-icons-png.flaticon.com/512/4140/4140037.png' }} // Replace with your image
                    style={styles.avatar}
                />
                <Text style={styles.name}>Developer</Text>
                <Text style={styles.email}>dev@gmail.com</Text>
                <TouchableOpacity style={styles.editButton}>
                    <Text style={styles.editText}>Edit profile</Text>
                </TouchableOpacity>
            </View>

            {/* Inventory Section */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Inventories</Text>

                <TouchableOpacity style={styles.itemRow}>
                    <View style={styles.iconLabel}>
                        <View style={styles.iconCover}>
                            <Icon name="account-circle" size={20} color="#388e3c" />
                        </View>
                        <Text style={styles.itemText}>My Profile</Text>
                    </View>
                    <Icon name="chevron-right" size={20} color="#999" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.itemRow}>
                    <View style={styles.iconLabel}>
                        <View style={styles.iconCover}>
                            <Icon name="local-shipping" size={20} color="#388e3c" />
                        </View>
                        <Text style={styles.itemText}>My Orders</Text>
                    </View>
                    <Icon name="chevron-right" size={20} color="#999" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.itemRow}>
                    <View style={styles.iconLabel}>
                        <View style={styles.iconCover}>
                            <Icon name="dehaze" size={20} color="#388e3c" />
                        </View>
                        <Text style={styles.itemText}>Current Listings</Text>
                    </View>
                    <Icon name="chevron-right" size={20} color="#999" />
                </TouchableOpacity>


                <TouchableOpacity style={styles.itemRow}>
                    <View style={styles.iconLabel}>
                        <View style={styles.iconCover}>
                            <Icon name="headset" size={20} color="#388e3c" />
                        </View>
                        <Text style={styles.itemText}>Support</Text>
                    </View>
                    <Icon name="chevron-right" size={20} color="#999" />
                </TouchableOpacity>
            </View>


            {/* Preferences Section */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Preferences</Text>

                <View style={styles.itemRow}>
                    <View style={styles.iconLabel}>
                        <View style={styles.iconCover}>
                            <Icon name="notifications" size={20} color="#388e3c" />
                        </View>
                        <Text style={styles.itemText}>Push notifications</Text>
                    </View>
                    <Switch
                        value={pushNotification}
                        onValueChange={setPushNotification}
                        trackColor={{ false: '#767577', true: '#388e3c' }} // background track
                        thumbColor={pushNotification ? '#f5dd4b' : '#f4f3f4'} // toggle circle
                        ios_backgroundColor="#3e3e3e" // fallback for iOS before toggle
                    />
                </View>

                <TouchableOpacity style={styles.itemRow}>
                    <View style={styles.iconLabel}>
                        <View style={styles.iconCover}>
                            <Icon name="language" size={20} color="#388e3c" />
                        </View>
                        <Text style={styles.itemText}>Change Language</Text>
                    </View>
                    <Icon name="chevron-right" size={20} color="#999" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.itemRow}>
                    <View style={styles.iconLabel}>
                        <View style={styles.iconCover}>
                            <Icon name="password" size={20} color="#388e3c" />
                        </View>
                        <Text style={styles.itemText}>Change Password</Text>
                    </View>
                    <Icon name="chevron-right" size={20} color="#999" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.itemRow} onPress={confirmLogout}>
                    <View style={styles.iconLabel}>
                        <View style={styles.iconCover}>
                            <Icon name="logout" size={20} color="#388e3c" />
                        </View>
                        <Text style={styles.itemText}>Logout</Text>
                    </View>
                    <Icon name="chevron-right" size={20} color="#999" />
                </TouchableOpacity>
            </View>

        </ScrollView>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    avatarContainer: {
        alignItems: 'center',
        marginBottom: 24,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 12,
    },
    name: {
        fontSize: 20,
        fontWeight: '600',
    },
    email: {
        color: '#888',
        marginBottom: 10,
    },
    editButton: {
        backgroundColor: '#388e3c',
        paddingVertical: 6,
        paddingHorizontal: 20,
        borderRadius: 20,
    },
    editText: {
        color: '#fff',
    },
    section: {
        backgroundColor: '#f4f4f4',
        borderRadius: 12,
        paddingVertical: 10,
        paddingHorizontal: 16,
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 14,
        color: '#777',
        marginBottom: 10,
    },
    itemRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 8,
    },
    iconLabel: {
        flexDirection: 'row',
        alignItems: 'center',

        gap: 10,
    },
    itemText: {
        fontSize: 16,
    },
    badgeText: {
        color: '#fff',
        fontSize: 12,
    },
    logoutRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginTop: 'auto',
        marginLeft: 10,
    },
    logoutText: {
        color: '#d00',
        fontSize: 16,
    },
    iconCover: {
        backgroundColor: 'rgba(76, 102, 159, 0.1)',
        width: 35,
        height: 35,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
});