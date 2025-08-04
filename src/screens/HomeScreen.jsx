import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Animated,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import { BarChart as ChartKitBar, PieChart } from 'react-native-chart-kit';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import Geolocation from 'react-native-geolocation-service';
import { useLocation } from '../context/LocationContext';
import SkeletonLoader from '../components/SkeletonLoader';
import InfoCard from '../components/InfoCard';

const screenWidth = Dimensions.get('window').width;

const features = [
  {
    icon: 'eco',
    title: 'Total Products Listed',
    value: '15'
  },
  {
    icon: 'currency-rupee',
    title: 'Total Sales',
    value: '₹ 75,000'
  },
  {
    icon: 'inventory',
    title: 'Pending Orders',
    value: '3'
  },
  {
    icon: 'check-circle',
    title: 'Delivered Orders',
    value: '12'
  }
];

const cropData = [
  {
    name: "Wheat",
    population: 4500,
    color: "#4CAF50",
    legendFontColor: "#333",
    legendFontSize: 14
  },
  {
    name: "Rice",
    population: 3000,
    color: "#FFC107",
    legendFontColor: "#333",
    legendFontSize: 14
  },
  {
    name: "Corn",
    population: 2200,
    color: "#03A9F4",
    legendFontColor: "#333",
    legendFontSize: 14
  },
  {
    name: "Barley",
    population: 1300,
    color: "#E91E63",
    legendFontColor: "#333",
    legendFontSize: 14
  },
];


const SalesDashboard = () => {
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [activeTab, setActiveTab] = useState('Analytics');
  const fadeAnim = useState(new Animated.Value(0))[0];
  const [isLoadingAddress, setIsLoadingAddress] = useState(true);
  const { address, updateLocation, updateAddress } = useLocation();

  const GOOGLE_API_KEY = 'AIzaSyCEQXnTKBQGY4Y5AK4ojtvSQ1SFfWYXEv4'; // Replace with your API key

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true
    }).start();

    // Get location when component mounts
    if (!address) {
      getLocation();
    } else {
      setIsLoadingAddress(false);
    }
  }, []);

  const getLocationPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true; // iOS already configured
  };

  const getLocation = async () => {
    const hasPermission = await getLocationPermission();
    if (!hasPermission) {
      console.log('Permission denied');
      setIsLoadingAddress(false);
      return;
    }

    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        updateLocation({ latitude, longitude });
        getAddressFromCoords(latitude, longitude);
      },
      (error) => {
        console.log('Location error:', error);
        setIsLoadingAddress(false);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  const getAddressFromCoords = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`
      );
      const data = await response.json();
      if (data.results.length > 0) {
        const formattedAddress = data.results[0].formatted_address;
        updateAddress(formattedAddress);
      } else {
        updateAddress('Address not found');
      }
    } catch (err) {
      console.log('Geocoding error:', err);
      updateAddress('Error fetching address');
    }
    setIsLoadingAddress(false);
  };

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true
    }).start();
  }, []);

  const monthlyData = [10000, 6000, 4000, 2000, 5000, 7000];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const categories = ['Semua', 'Food', 'Drink', 'Snack', 'Dessert'];
  const bestseller = {
    name: 'Special fried rice',
    total: 850
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          {isLoadingAddress ? (
            <SkeletonLoader width={'40%'} />
          ) : (
            <Text style={styles.brand}>Hi, Developer</Text>
          )}
          {isLoadingAddress ? (
            <SkeletonLoader width={'80%'} />
          ) : (
            <Text style={styles.locationText} numberOfLines={1} ellipsizeMode="tail">
              {address || 'Maharaja Tagore Road, Dhakuria, Kolkata, West Bengal 700092'}
            </Text>
          )}
        </View>
        <View style={styles.notifyIcon}>
          <Icon name="notifications" size={24} color="#388e3c" />
        </View>
      </View>

      {/* Top Tabs */}
      <View style={styles.tabContainerTop}>
        <TouchableOpacity style={{ width: '50%' }} onPress={() => setActiveTab('Analytics')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'Analytics' ? styles.activeTabTop : styles.inactiveTabTop
            ]}
          >
            Analytics
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ width: '50%' }} onPress={() => setActiveTab('Insights')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'Insights' ? styles.activeTabTop : styles.inactiveTabTop
            ]}
          >
            Insights
          </Text>
        </TouchableOpacity>
      </View>
      {activeTab === 'Analytics' ? (
        <ScrollView style={styles.body}>
          {/* Sales Chart Section */}
          <View style={styles.section}>
            {/* <Text style={styles.sectionTitle}>Monthly Sale</Text> */}
            <ChartKitBar
              data={{
                labels: months,
                datasets: [
                  {
                    data: monthlyData
                  }
                ]
              }}
              width={screenWidth - 32}
              height={220}
              // yAxisLabel="₹"
              chartConfig={{
                backgroundColor: '#ffffff',
                backgroundGradientFrom: '#ffffff',
                backgroundGradientTo: '#ffffff',
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16
                },
                propsForBackgroundLines: {
                  stroke: '#e3e3e3'
                }
              }}
              verticalLabelRotation={0}
              style={{ borderRadius: 12, marginTop: 12 }}
            />
          </View>

          {/* Features Section */}
          <View style={styles.featuresContainer}>
            {features.map((feature, index) => (
              <Animated.View
                key={index}
                style={[styles.featureCard, { opacity: fadeAnim }]}
              >
                <View style={styles.iconHeader}>
                  <View style={styles.featureIcon}>
                    <Icon name={feature.icon} size={20} color="#388e3c" />
                  </View>
                  <Text style={styles.featureTitle}>{feature.title}</Text>
                </View>

                <Text style={styles.featureValue}>{feature.value}</Text>
              </Animated.View>
            ))}
          </View>
        </ScrollView>
      ) : (
        <ScrollView style={styles.body}>

          <View style={styles.sectionInsights}>
            <Text style={styles.sectionTitleInsights}>This Month's Highlights</Text>

            <InfoCard
              icon={<MaterialCommunityIcons name="chart-pie" size={24} color="#2E7D32" />}
              title="TOP CROP"
              content="Wheat – ₹4500"
            />

            <InfoCard
              icon={<Feather name="trending-up" size={24} color="#2E7D32" />}
              title="GROWTH"
              content="18% sales vs last month"
            />
          </View>

          <View style={{ alignItems: 'center', marginTop: 30, borderColor: 'lightgrey', padding: 10, borderRadius: 25, borderWidth: 0.5 }}>
            {/* <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Crop Production Share</Text> */}
            <PieChart
              data={cropData}
              width={screenWidth}
              height={220}
              chartConfig={{
                backgroundColor: '#ddd',
                backgroundGradientFrom: "#ddd",
                backgroundGradientTo: "#ddd",
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              }}
              accessor={"population"}
              backgroundColor={"transparent"}
              paddingLeft={"15"}
              center={[10, 10]}
              absolute
            />
          </View>

        </ScrollView>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  header: {
    paddingVertical: 15,
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
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
    marginBottom: 25
  },
  body: {
    paddingHorizontal: 16,
    paddingBottom: 100
  },
  notifyIcon: {
    backgroundColor: '#FFFFF0',
    width: 40,
    height: 40,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 10
  },
  headerLeft: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: 4
  },
  brand: {
    fontSize: 20,
    color: '#fff',
    fontFamily: 'sans-serif-medium'
  },
  locationText: {
    fontSize: 14,
    color: '#ddd',
    fontFamily: 'sans-serif-medium',
    overflow: 'hidden',
    maxWidth: '80%'
  },
  section: {
    marginVertical: 24
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 4
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    marginRight: 8,
    marginBottom: 8
  },
  selectedCategory: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50'
  },
  categoryText: {
    color: '#333'
  },
  selectedCategoryText: {
    color: '#fff'
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureCard: {
    width: screenWidth * 0.44,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  iconHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'center',
    gap: 20
  },
  featureIcon: {
    backgroundColor: 'rgba(76, 102, 159, 0.1)',
    width: 40,
    height: 40,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: 'grey',
    marginBottom: 5,
    width: screenWidth * 0.25,
  },
  featureValue: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#388e3c',
    marginTop: 6,
    textAlign: 'right'
  },

  tabContainerTop: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 8,
    marginHorizontal: 16,
  },
  tabText: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    textAlign: 'center',
  },
  activeTabTop: {
    backgroundColor: '#4CAF50',
    color: '#fff',
  },
  inactiveTabTop: {
    backgroundColor: 'transparent',
    color: '#333',
  },

  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 4
  },
  activeTab: {
    backgroundColor: '#4CAF50',
    color: '#fff',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 6
  },
  inactiveTab: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 6
  },
  bestsellerCard: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 8
  },
  bestsellerName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8
  },
  bestsellerTotal: {
    fontSize: 14,
    color: '#666'
  },
  headerInsights: {
    backgroundColor: '#2E7D32',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerText: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
  },
  sectionInsights: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  sectionTitleInsights: {
    color: '#388e3c',
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
  },
});

export default SalesDashboard;
