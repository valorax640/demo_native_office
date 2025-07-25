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
import FontAwesome from 'react-native-vector-icons/FontAwesome';


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
    icon: 'storefront',
    title: 'Direct Farm Access',
    description: 'Connect directly with verified farmers to get fresh produce without middlemen.'
  },
  {
    icon: 'local-shipping',
    title: 'Logistics Support',
    description: 'Integrated delivery options for smooth and timely transportation.'
  },
  {
    icon: 'price-check',
    title: 'Transparent Pricing',
    description: 'Real-time market rates ensure fair pricing for both farmers and buyers.'
  },
  {
    icon: 'support-agent',
    title: '24/7 Support',
    description: 'Dedicated assistance for order, payment, and logistics queries.'
  },
  {
    icon: 'insights',
    title: 'Smart Insights',
    description: 'Track purchase trends, demand forecasts, and farming seasons for better decisions.'
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
                <Text style={styles.slideTitle}>Trade with Transparency</Text>
                <Text style={styles.slideText}>Oppurtunity to trade better by choosing the better</Text>
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
      <Text style={styles.sectionTitle}>Offerings</Text>
      <View style={styles.featuresContainer}>
        {features.map((feature, index) => (
          <Animated.View
            key={index}
            style={[styles.featureCard, { opacity: fadeAnim }]}
          >
            <View style={styles.featureIcon}>
              <Icon name={feature.icon} size={28} color="#388e3c" />
            </View>
            <View>
              <Text style={styles.featureTitle}>{feature.title}</Text>
              <Text style={styles.featureText}>{feature.description}</Text>
            </View>
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
          blurAmount={5}
          overlayColor="transparent"
        >
          <Text style={styles.glassText}>
            "Empowering farmers with direct access to markets, our platform bridges the gap between growers and buyers. Whether you're sourcing fresh produce or looking to sell your harvest fairly, we make trading simple, transparent, and rewarding for everyone."
          </Text>
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
              ""This platform helped me sell my crops directly to buyers at better prices!""
            </Text>
            <Text style={styles.testimonialAuthor}>- Mohan Das</Text>
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
        <Text style={styles.footerText}>Crafted by Softhought in Kolkata</Text>
        <View style={styles.socialIcons}>
          <FontAwesome name="facebook" size={24} color="#388e3c" style={styles.socialIcon} />
          <FontAwesome name="twitter" size={24} color="#388e3c" style={styles.socialIcon} />
          <FontAwesome name="instagram" size={24} color="#388e3c" style={styles.socialIcon} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFF0',
  },
  header: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#388e3c',
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
    width: width * 0.9,
    backgroundColor: '#FFFFF0',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,

  },
  featureIcon: {
    backgroundColor: 'rgba(76, 102, 159, 0.1)',
    width: 40,
    height: 40,
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
    fontSize: 12,
    color: '#666',
    lineHeight: 20,
    width: width * 0.7,
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
    justifyContent: 'center',
  },
  glassText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  demoImage: {
    width: '100%',
    height: '100%',
  },
  demoBlur: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
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
    backgroundColor: '#FFFFF0',
  },
  footerText: {
    fontSize: 16,
    color: '#388e3c',
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