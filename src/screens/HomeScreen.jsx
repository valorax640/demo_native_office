import React, { useRef, useState, useEffect } from 'react';
import {
    View,
    ScrollView,
    Image,
    StyleSheet,
    Dimensions,
    Text,
    TouchableOpacity,
    Animated
} from 'react-native';
import { BlurView } from '@react-native-community/blur';
import { useIsFocused } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.9;
const CARD_HEIGHT = CARD_WIDTH * 0.6;

const images = [
    'https://plus.unsplash.com/premium_photo-1664301448502-c1c7a573aef9?q=80&w=904&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1461354464878-ad92f492a5a0?q=80&w=870&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=870&auto=format&fit=crop',
];

const features = [
    {
        icon: 'photo-camera',
        title: 'Smart Cropping',
        description: 'Automatically detects and crops your images perfectly'
    },
    {
        icon: 'collections',
        title: 'Multiple Formats',
        description: 'Supports various aspect ratios and collage styles'
    },
    {
        icon: 'share',
        title: 'Easy Sharing',
        description: 'Share your creations directly to social media'
    }
];

const Carousel = ({ navigation }) => {
    const scrollViewRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const isFocused = useIsFocused();
    const fadeAnim = useState(new Animated.Value(0))[0];

    useEffect(() => {
        if (!isFocused) return;

        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true
        }).start();

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
        <ScrollView 
            style={styles.container} 
            contentContainerStyle={{ paddingBottom: 50 }}
            showsVerticalScrollIndicator={false}
        >
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.brand}>CropCircle</Text>
                <TouchableOpacity 
                    onPress={() => navigation.navigate('Login')} 
                    style={styles.loginButton}
                    activeOpacity={0.7}
                >
                    <Text style={styles.loginButtonText}>Get Started</Text>
                    <Icon name="arrow-forward" size={18} color="#fff" style={styles.buttonIcon} />
                </TouchableOpacity>
            </View>

            {/* Hero Carousel */}
            <View style={styles.carouselWrapper}>
                <ScrollView
                    ref={scrollViewRef}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onScroll={onScroll}
                    scrollEventThrottle={16}
                >
                    {images.map((img, index) => (
                        <View key={index} style={styles.slide}>
                            <Image source={{ uri: img }} style={styles.carouselImage} />
                            <View style={styles.imageOverlay}>
                                <Text style={styles.slideTitle}>Smart Image Cropping</Text>
                                <Text style={styles.slideText}>Transform your photos with AI-powered cropping</Text>
                            </View>
                        </View>
                    ))}
                </ScrollView>
                <View style={styles.indicatorContainer}>
                    {images.map((_, i) => (
                        <TouchableOpacity
                            key={i}
                            style={[styles.dot, i === activeIndex ? styles.activeDot : null]}
                            onPress={() => {
                                scrollViewRef.current?.scrollTo({ x: i * width, animated: true });
                                setActiveIndex(i);
                            }}
                            activeOpacity={0.7}
                        />
                    ))}
                </View>
            </View>

            {/* Features Section */}
            <Text style={styles.sectionTitle}>Key Features</Text>
            <View style={styles.featuresContainer}>
                {features.map((feature, index) => (
                    <Animated.View 
                        key={index} 
                        style={[styles.featureCard, { opacity: fadeAnim }]}
                    >
                        <View style={styles.featureIcon}>
                            <Icon name={feature.icon} size={28} color="#4c669f" />
                        </View>
                        <Text style={styles.featureTitle}>{feature.title}</Text>
                        <Text style={styles.featureText}>{feature.description}</Text>
                    </Animated.View>
                ))}
            </View>

            {/* Demo Section */}
            <View style={styles.demoSection}>
                <Image
                    source={{
                        uri: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?q=80&w=774&auto=format&fit=crop',
                    }}
                    style={styles.demoImage}
                />
                <BlurView
                    style={styles.demoBlur}
                    blurType="light"
                    blurAmount={10}
                    overlayColor="transparent"
                >
                    <Text style={styles.demoTitle}>See It In Action</Text>
                    <Text style={styles.demoText}>
                        Our intuitive interface makes cropping and editing a breeze. Try it yourself!
                    </Text>
                    <TouchableOpacity 
                        style={styles.demoButton}
                        activeOpacity={0.7}
                    >
                        <Text style={styles.demoButtonText}>Try Demo</Text>
                    </TouchableOpacity>
                </BlurView>
            </View>

            {/* Testimonials */}
            <Text style={styles.sectionTitle}>User Testimonials</Text>
            <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.testimonialsContainer}
            >
                {[1, 2, 3].map((item) => (
                    <View key={item} style={styles.testimonialCard}>
                        <Image
                            source={{ uri: `https://randomuser.me/api/portraits/${item % 2 === 0 ? 'women' : 'men'}/${item}0.jpg` }}
                            style={styles.avatar}
                        />
                        <Text style={styles.testimonialText}>
                            "This app has completely changed how I edit my photos. So easy to use!"
                        </Text>
                        <Text style={styles.testimonialAuthor}>- Sarah J.</Text>
                        <View style={styles.rating}>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Icon 
                                    key={star} 
                                    name="star" 
                                    size={16} 
                                    color="#FFD700" 
                                />
                            ))}
                        </View>
                    </View>
                ))}
            </ScrollView>

            {/* Footer */}
            <View style={styles.footer}>
                <Text style={styles.footerText}>Crafted with ❤️ by Softhought in Kolkata</Text>
                <View style={styles.socialIcons}>
                    <Icon name="facebook" size={24} color="#4c669f" style={styles.socialIcon} />
                    <Icon name="twitter" size={24} color="#4c669f" style={styles.socialIcon} />
                    <Icon name="instagram" size={24} color="#4c669f" style={styles.socialIcon} />
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    header: {
        paddingVertical: 20,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#4c669f',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    brand: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
        fontFamily: 'sans-serif-medium',
    },
    loginButton: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 25,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
    },
    loginButtonText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '600',
    },
    buttonIcon: {
        marginLeft: 5,
    },
    carouselWrapper: {
        marginTop: 20,
        height: CARD_HEIGHT,
    },
    slide: {
        width: width,
        height: CARD_HEIGHT,
        position: 'relative',
    },
    carouselImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    imageOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 20,
        paddingBottom: 30,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    slideTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 5,
    },
    slideText: {
        fontSize: 16,
        color: '#fff',
    },
    indicatorContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#ccc',
        marginHorizontal: 5,
    },
    activeDot: {
        backgroundColor: '#4c669f',
        width: 12,
        height: 12,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 30,
        marginBottom: 15,
        paddingHorizontal: 20,
    },
    featuresContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        paddingHorizontal: 10,
    },
    featureCard: {
        width: width * 0.45,
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 15,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    featureIcon: {
        backgroundColor: 'rgba(76, 102, 159, 0.1)',
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    featureTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 5,
    },
    featureText: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
    },
    demoSection: {
        marginTop: 20,
        marginHorizontal: 20,
        borderRadius: 15,
        overflow: 'hidden',
        height: 300,
        position: 'relative',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 5,
    },
    demoImage: {
        width: '100%',
        height: '100%',
    },
    demoBlur: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 20,
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    demoTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 5,
    },
    demoText: {
        fontSize: 16,
        color: '#fff',
        marginBottom: 15,
    },
    demoButton: {
        backgroundColor: '#4c669f',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 25,
        alignSelf: 'flex-start',
    },
    demoButtonText: {
        color: '#fff',
        fontWeight: '600',
    },
    testimonialsContainer: {
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    testimonialCard: {
        width: width * 0.8,
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 20,
        marginRight: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        alignSelf: 'center',
        marginBottom: 15,
    },
    testimonialText: {
        fontSize: 16,
        color: '#555',
        fontStyle: 'italic',
        textAlign: 'center',
        marginBottom: 10,
        lineHeight: 22,
    },
    testimonialAuthor: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginBottom: 5,
    },
    rating: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    footer: {
        paddingVertical: 30,
        paddingHorizontal: 20,
        marginTop: 30,
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
    },
    footerText: {
        fontSize: 16,
        color: '#4c669f',
        textAlign: 'center',
        marginBottom: 15,
    },
    socialIcons: {
        flexDirection: 'row',
    },
    socialIcon: {
        marginHorizontal: 10,
    },
});

export default Carousel;