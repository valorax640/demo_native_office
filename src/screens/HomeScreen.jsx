import React, { useRef, useState, useEffect } from 'react';
import {
    View,
    ScrollView,
    Image,
    StyleSheet,
    Dimensions,
    Text,
    TouchableOpacity,
} from 'react-native';
import { BlurView } from '@react-native-community/blur';
import Video from 'react-native-video';
import { useIsFocused } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const images = [
    'https://plus.unsplash.com/premium_photo-1664301448502-c1c7a573aef9?q=80&w=904&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1461354464878-ad92f492a5a0?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
];

const Carousel = ({ navigation }) => {
    const scrollViewRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            const nextIndex = (activeIndex + 1) % images.length;
            scrollViewRef.current?.scrollTo({ x: nextIndex * width, animated: true });
            setActiveIndex(nextIndex);
        }, 2000);
        return () => clearInterval(interval);
    }, [activeIndex]);

    const onScroll = (event) => {
        const index = Math.round(event.nativeEvent.contentOffset.x / width);
        setActiveIndex(index);
    };

    const isFocused = useIsFocused();

    return (
        <ScrollView style={styles.carouselContainer} contentContainerStyle={{ paddingBottom: 50 }}>
            <View style={styles.header}>
                <Text style={styles.brand}>CropCircle</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.loginButton}>
                    <Text style={styles.loginButtonText} >Login</Text>
                </TouchableOpacity>
            </View>

            <ScrollView
                ref={scrollViewRef}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={onScroll}
                scrollEventThrottle={16}
            >
                {images.map((img, index) => (
                    <Image key={index} source={{ uri: img }} style={styles.image} />
                ))}
            </ScrollView>

            <View style={styles.indicatorContainer}>
                {images.map((_, i) => (
                    <View
                        key={i}
                        style={[styles.dot, i === activeIndex ? styles.activeDot : null]}
                    />
                ))}
            </View>

            <View style={styles.squareContainer}>
                <Image
                    source={{
                        uri: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                    }}
                    style={styles.squareImage}
                />

                {/* Glass overlay over the entire image */}
                <BlurView
                    style={styles.fullGlass}
                    blurType="light"
                    blurAmount={5}
                    overlayColor="transparent"
                >
                    <Text style={styles.glassText}>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                    </Text>
                </BlurView>
            </View>

            <View style={styles.videoHeader}>
                <Text style={styles.brand}>Community</Text>
            </View>

            {isFocused && (
                <Video
                    source={{ uri: 'https://videos.pexels.com/video-files/10041437/10041437-hd_1920_1080_24fps.mp4' }}
                    style={styles.video}
                    resizeMode="cover"
                    repeat={true}
                    muted={true}
                    controls={false}
                    fullscreen={false}
                    ignoreSilentSwitch="ignore"
                    onError={e => console.error(e)}
                />
            )}

            <View style={styles.footer}>
                <Text style={styles.footerText}>Crafted by Softhought in Kolkata</Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    carouselContainer: {
        paddingVertical: 25,
        paddingHorizontal: '4%',
        backgroundColor: '#FFFFF0',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 50,
        paddingHorizontal: 10,
    },
    videoHeader: {
        textAlign: 'center',
        alignItems: 'center',
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    brand: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    loginButton: {
        backgroundColor: 'green',
        paddingVertical: 8,
        paddingHorizontal: 25,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 2,
    },
    loginButtonText: {
        fontSize: 16,
        color: '#fff',
    },
    image: {
        width: width,
        height: 200,
        resizeMode: 'cover',
    },
    indicatorContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#ccc',
        marginHorizontal: 4,
    },
    activeDot: {
        backgroundColor: '#000',
        width: 10,
        height: 10,
    },
    squareContainer: {
        marginTop: 20,
        alignItems: 'center',
        position: 'relative',
        marginBottom: 50,
    },
    squareImage: {
        width: width * 0.75,
        height: width * 0.75,
        borderRadius: 10,
    },
    fullGlass: {
        position: 'absolute',
        top: 60,
        bottom: 0,
        height: width * 0.65,
        width: width * 0.65,
        borderRadius: 20,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },
    glassText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
        paddingHorizontal: 10,
        paddingVertical: 10,
        textAlignVertical: 'center',
    },
    video: {
        width: '100%',
        height: 200,
        marginBottom: 20,
    },
    footer: {
        marginTop: 50,
        alignItems: 'center',
    },
    footerText: {
        fontSize: 16,
        color: '#555',
        textAlign: 'center',
        paddingHorizontal: 20,
    },
});

export default Carousel;
