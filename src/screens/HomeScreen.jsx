import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image, StatusBar } from 'react-native';
import Carousel from 'react-native-snap-carousel';

const { width: screenWidth } = Dimensions.get('window');

const data = [
    { id: '1', url: 'https://picsum.photos/id/1015/600/400' },
    { id: '2', url: 'https://picsum.photos/id/1016/600/400' },
    { id: '3', url: 'https://picsum.photos/id/1018/600/400' },
];

const App = () => {

    const carouselRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);

    // Auto-slide every 3 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            let nextIndex = (activeIndex + 1) % data.length;
            carouselRef.current.snapToItem(nextIndex);
        }, 3000);

        return () => clearInterval(interval);
    }, [activeIndex]);

    const renderItem = ({ item }) => (
        <Image source={{ uri: item.url }} style={styles.image} resizeMode="cover" />
    );
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />

            {/* Top Bar with Login */}
            <View style={styles.topBar}>
                <TouchableOpacity onPress={() => alert('Login pressed')}>
                    <Text style={styles.loginText}>Login</Text>
                </TouchableOpacity>
            </View>

            {/* Logo and App Details */}
            <View style={styles.logoSection}>
                <Image
                    source={{ uri: 'https://cdn.dribbble.com/userupload/43791971/file/original-47c8d7630a5efb68354f911ee4275f8a.jpg?resize=1024x768&vertical=center' }}
                    style={styles.logo}
                />
                {/* <Text style={styles.appName}>YourApp</Text> */}
                {/* <Text style={styles.tagline}>The best platform to hire or get hired</Text> */}
            </View>

            <View>
                <Carousel
                    ref={carouselRef}
                    data={data}
                    renderItem={renderItem}
                    sliderWidth={screenWidth}
                    itemWidth={screenWidth}
                    onSnapToItem={index => setActiveIndex(index)}
                    loop={true}
                    autoplay={false} // we use manual interval autoplay
                />
            </View>

            {/* Action Buttons */}
            {/* <View style={styles.buttonGroup}>
        <TouchableOpacity style={styles.primaryButton} onPress={() => alert('Discover Jobs')}>
          <Text style={styles.primaryButtonText}>Discover Jobs</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton} onPress={() => alert('Post a Job')}>
          <Text style={styles.secondaryButtonText}>Post a Job</Text>
        </TouchableOpacity>
      </View> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        padding: '4%',
        backgroundColor: '#ffffff',
        paddingTop: 40,
        paddingHorizontal: 24,
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    loginText: {
        fontSize: 16,
        color: '#4A5CF0',
        fontWeight: '600',
    },
    logoSection: {
        alignItems: 'center',
        marginTop: 60,
    },
    logo: {
        width: 100,
        height: 100,
        borderRadius: 20,
        marginBottom: 20,
        backgroundColor: '#eee',
    },
    appName: {
        fontSize: 28,
        fontWeight: '700',
        color: '#000',
    },
    tagline: {
        fontSize: 16,
        color: '#444',
        textAlign: 'center',
        marginTop: 8,
        paddingHorizontal: 10,
    },
    buttonGroup: {
        marginTop: 60,
        alignItems: 'center',
    },
    primaryButton: {
        backgroundColor: '#4A5CF0',
        paddingVertical: 14,
        paddingHorizontal: 30,
        borderRadius: 12,
        marginVertical: 10,
        width: '80%',
        alignItems: 'center',
    },
    secondaryButton: {
        backgroundColor: '#E8ECFF',
        paddingVertical: 14,
        paddingHorizontal: 30,
        borderRadius: 12,
        marginVertical: 10,
        width: '80%',
        alignItems: 'center',
    },
    primaryButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
    },
    secondaryButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#4A5CF0',
    },

    image: {
        width: screenWidth,
        height: 200,
        borderRadius: 10,
    },
});

export default App;
