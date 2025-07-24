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
import { useIsFocused } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const images = [
    'https://plus.unsplash.com/premium_photo-1664301448502-c1c7a573aef9?q=80&w=904&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1461354464878-ad92f492a5a0?q=80&w=870&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=870&auto=format&fit=crop',
];

const collageImages = [
    'https://images.unsplash.com/photo-1492496913980-501348b61469?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://plus.unsplash.com/premium_photo-1663945779273-ebc45569fb9f?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1598030304671-5aa1d6f21128?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
];


const Carousel = ({ navigation }) => {
    const scrollViewRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const isFocused = useIsFocused();

    useEffect(() => {
        if (!isFocused) return;

        const interval = setInterval(() => {
            setActiveIndex(prev => {
                const nextIndex = (prev + 1) % images.length;
                scrollViewRef.current?.scrollTo({ x: nextIndex * width, animated: true });
                return nextIndex;
            });
        }, 3000);

        return () => clearInterval(interval);
    }, [isFocused]);

    const onScroll = (event) => {
        const index = Math.round(event.nativeEvent.contentOffset.x / width);
        setActiveIndex(index);
    };


    return (
        <ScrollView style={styles.carouselContainer} contentContainerStyle={{ paddingBottom: 50 }}>
            <View style={styles.header}>
                <Text style={styles.brand}>CropCircle</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.loginButton}>
                    <Text style={styles.loginButtonText}>Login</Text>
                </TouchableOpacity>
            </View>

            <ScrollView
                ref={scrollViewRef}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={onScroll}
                scrollEventThrottle={16}
                removeClippedSubviews={false}
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
                        uri: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?q=80&w=774&auto=format&fit=crop',
                    }}
                    style={styles.squareImage}
                />
                <BlurView
                    style={styles.fullGlass}
                    blurType="light"
                    blurAmount={5}
                    overlayColor="transparent"
                >
                    <Text style={styles.glassText}>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. It has survived not only five centuries.
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. It has survived not only five centuries.
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. It has survived not only five centuries.
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. It has survived not only five centuries.
                    </Text>
                </BlurView>
            </View>

            {/* <View style={styles.videoHeader}>
                <Text style={styles.brand}>Community Collage</Text>
            </View> */}

            <View style={styles.collageRow}>
                <Image source={{ uri: collageImages[0] }} style={styles.collageImageLeft} />
                <View style={styles.collageRight}>
                    <Image source={{ uri: collageImages[1] }} style={styles.collageImageRightTop} />
                    <Image source={{ uri: collageImages[2] }} style={styles.collageImageRightBottom} />
                </View>
            </View>


            <View style={styles.footer}>
                <Text style={styles.footerText}>Crafted by Softhought in Kolkata</Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    carouselContainer: {
        flex: 1,
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
    },
    videoHeader: {
        alignItems: 'center',
        marginBottom: 20,
    },
    collageRow: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
        marginRight: 100,
        gap: 10,
    },

    collageImageLeft: {
        width: (width - 30) / 2,   // Adjusted width
        height: 250,
        borderRadius: 12,
    },

    collageRight: {
        justifyContent: 'space-between',
        height: 250,
    },

    collageImageRightTop: {
        width: (width - 30) / 2,
        height: 120,
        borderRadius: 12,
        marginBottom: 10,
    },

    collageImageRightBottom: {
        width: (width - 30) / 2,
        height: 120,
        borderRadius: 12,
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
