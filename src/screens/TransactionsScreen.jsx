import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, TouchableOpacity, TextInput, Modal, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { LineChart } from 'react-native-chart-kit';
import { Text as T } from 'react-native-svg';
import LottieView from 'lottie-react-native';



const screenWidth = Dimensions.get('window').width;

const chartDataSets = {
  '1D': {
    labels: ['9AM', '10AM', '11AM', '12PM', '1PM'],
    datasets: [{ data: [40, 60, 30, 45, 70] }],
  },
  '1W': {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{ data: [55, 48, 60, 52, 70, 65, 75] }],
  },
  '1M': {
    labels: ['W1', 'W2', 'W3', 'W4'],
    datasets: [{ data: [100, 120, 90, 140] }],
  },
  '1Y': {
    labels: ['Jan', 'Mar', 'May', 'Jul', 'Sep', 'Nov'],
    datasets: [{ data: [300, 280, 350, 400, 370, 390] }],
  },
};

const timeFrames = ['1D', '1W', '1M', '1Y'];

const CropDashboard = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('1D');
  const [showAddCropModal, setShowAddCropModal] = useState(false);
  const [cropName, setCropName] = useState('');
  const [cropQuantity, setCropQuantity] = useState('');
  const [cropPrice, setCropPrice] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const chartData = {
    ...chartDataSets[selectedTimeframe],
    datasets: chartDataSets[selectedTimeframe].datasets.map((ds) => ({
      ...ds,
      color: () => '#2e7d32', // Green line color
      strokeWidth: 2,
    })),
  };
  const price = 145.02;
  const change = 12.7;
  const percentage = 9.6;

  return (
    <ScrollView style={styles.container}>
      <ScrollView showsHorizontalScrollIndicator={false} style={styles.body}>
        {/* Search Header */}
        <View style={styles.searchBar}>
          <Icon name="search" size={20} color="#555" style={{ marginLeft: 10 }} />
          <TextInput
            placeholder="Search Crops..."
            placeholderTextColor="#888"
            style={styles.searchInput}
          />
        </View>

        {/* Total Crop Value */}
        <View style={styles.valueContainer}>
          <View>
            <Text style={styles.label}>Inventory Value</Text>
            <Text style={styles.amount}>₹ 1,28,000</Text>
          </View>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setShowAddCropModal(true)}
          >
            <Text style={styles.addButtonText}>Add Crops</Text>
          </TouchableOpacity>
        </View>

        {/* Market Insights Chart */}
        <View style={{ paddingTop: 16 }}>
          <View style={styles.chartCard}>
            <Text style={styles.title}>Market Insights</Text>

            <View style={styles.priceBox}>
              <Text style={styles.price}>₹{price.toFixed(2)}</Text>
              <Text style={styles.change}>+{change} ({percentage}%) 1H</Text>
            </View>
          </View>

          <View style={styles.tabContainer}>
            {timeFrames.map((frame) => (
              <TouchableOpacity
                key={frame}
                style={[
                  styles.tab,
                  selectedTimeframe === frame && styles.selectedTab
                ]}
                onPress={() => setSelectedTimeframe(frame)}
              >
                <Text
                  style={[
                    styles.tabText,
                    selectedTimeframe === frame && styles.selectedTabText
                  ]}
                >
                  {frame}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <LineChart
              data={chartData}
              width={screenWidth * 1.8}
              height={250}
              withShadow={true}
              withDots={true}
              withInnerLines={false}
              withVerticalLines={false}
              withOuterLines={false}
              withHorizontalLabels={false}
              withVerticalLabels={true}
              bezier
              fromZero
              chartConfig={{
                backgroundGradientFrom: '#ffffff',
                backgroundGradientTo: '#ffffff',
                decimalPlaces: 0,
                color: () => '#2e7d32',
                labelColor: () => '#555',
                propsForDots: {
                  r: '5',
                  strokeWidth: '2',
                  stroke: '#2e7d32',
                  fill: '#2e7d32',
                },
                fillShadowGradientFrom: '#a5d6a7',
                fillShadowGradientTo: '#a5d6a7',
                fillShadowGradientFromOpacity: 0.3,
                fillShadowGradientToOpacity: 0.1,
              }}
              renderDotContent={({ x, y, index, indexData }) => (
                <T
                  key={index}
                  x={x}
                  y={y - 8}
                  fontSize={10}
                  fill="#2e7d32"
                  textAnchor="middle"
                >
                  {indexData}
                </T>
              )}
            />
          </ScrollView>
        </View>

        {/* Banner */}
        <View style={styles.banner}>
          <Text style={styles.bannerText}>Discover the in demand crops in the market!</Text>
          <Icon name="arrow-forward-ios" size={16} color="#fff" />
        </View>

        {/* Buyers Table */}
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderText}>Top Buyers</Text>
          </View>

          <View style={styles.tableHeaderRow}>
            <Text style={styles.columnHeader}>Buyer Name</Text>
            <View style={{ flex: 1, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={styles.columnHeader}>Price/kg</Text>
              <Text style={styles.columnHeader}>24h Chg %</Text>
            </View>
          </View>

          {[
            { name: 'Agro Corp Ltd', price: 200, change: '+3.2%', positive: true },
            { name: 'Farm Fresh Co', price: 100, change: '+1.9%', positive: true },
            { name: 'Green Valley', price: 150, change: '+2.5%', positive: true },
            { name: 'Harvest Hub', price: 170, change: '-1.2%', positive: false },
            { name: 'Crop Masters', price: 220, change: '+3.2%', positive: true },
          ].map((buyer, idx) => (
            <TouchableOpacity key={idx} style={styles.tableRow} activeOpacity={0.7}>
              <View style={styles.buyerInfo}>
                <View style={styles.buyerAvatar}>
                  <Text style={styles.buyerInitial}>{buyer.name.charAt(0)}</Text>
                </View>
                <Text style={styles.buyerName}>{buyer.name}</Text>
              </View>
              <View style={{ flex: 1, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.buyerPrice}>₹{buyer.price}</Text>
                <Text style={[styles.buyerChange, { color: buyer.positive ? '#000' : '#f44336' }]}>
                  {buyer.change}
                </Text>
              </View>
            </TouchableOpacity>
          ))}

          <TouchableOpacity style={styles.viewMoreButton} activeOpacity={0.7}>
            <Text style={styles.viewMoreText}>View All Buyers</Text>
            <Icon name="arrow-forward-ios" size={14} color="#388e3c" />
          </TouchableOpacity>
        </View>

        {/* Add Crop Modal */}
        <Modal
          visible={showAddCropModal}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setShowAddCropModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              {!submitting ? (
                <>
                  <View style={styles.modalHeader}>
                    <Text style={styles.modalTitle}>Add New Crop</Text>
                    <TouchableOpacity
                      onPress={() => setShowAddCropModal(false)}
                      style={styles.closeButton}
                    >
                      <Icon name="close" size={24} color="#666" />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.formContainer}>
                    <View style={styles.inputContainer}>
                      <Text style={styles.inputLabel}>Crop Name</Text>
                      <TextInput
                        style={styles.textInput}
                        placeholder="Enter crop name (e.g., Wheat, Rice)"
                        placeholderTextColor="#888"
                        value={cropName}
                        onChangeText={setCropName}
                      />
                    </View>

                    <View style={styles.qtyPriceContainer}>
                      <View style={[styles.inputContainer, { flex: 1 }]}>
                        <Text style={styles.inputLabel}>Quantity (kg)</Text>
                        <TextInput
                          style={styles.textInput}
                          placeholder="Enter quantity in kg"
                          placeholderTextColor="#888"
                          value={cropQuantity}
                          onChangeText={setCropQuantity}
                          keyboardType="numeric"
                        />
                      </View>

                      <View style={[styles.inputContainer, { flex: 1 }]}>
                        <Text style={styles.inputLabel}>Price (₹)</Text>
                        <TextInput
                          style={styles.textInput}
                          placeholder="Enter Price"
                          placeholderTextColor="#888"
                          value={cropPrice}
                          onChangeText={setCropPrice}
                          keyboardType="numeric"
                        />
                      </View>
                    </View>

                    <View style={styles.buttonContainer}>
                      <TouchableOpacity
                        style={styles.cancelButton}
                        onPress={() => {
                          setShowAddCropModal(false);
                          setCropName('');
                          setCropQuantity('');
                        }}
                      >
                        <Text style={styles.cancelButtonText}>Cancel</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.addCropButton}
                        onPress={() => {
                          // Handle add crop logic here
                          console.log('Adding crop:', { name: cropName, quantity: cropQuantity });
                          // setShowAddCropModal(false);
                          setSubmitting(true);
                          setCropName('');
                          setCropQuantity('');
                        }}
                      >
                        <Text style={styles.addCropButtonText}>Add Crop</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </>
              ) : (
                <View style={styles.animationConatiner}>
                  <LottieView
                    source={require('../../assets/success confetti.json')}
                    autoPlay
                    loop={false}
                    style={{ width: 250, height: 250 }}
                    onAnimationFinish={() => {
                      setSubmitting(false);
                      setShowAddCropModal(false);
                    }}
                  />
                </View>
              )}
            </View>
          </View>
        </Modal>
      </ScrollView>
    </ScrollView>
  );
};

export default CropDashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  body: {
    paddingHorizontal: 16,
    paddingBottom: 100
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 4,
    marginTop: 12,
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: 10,
    color: '#000',
    fontSize: 14,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  valueContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  label: { color: '#888', fontSize: 12 },
  amount: { fontSize: 28, fontWeight: 'bold', color: '#388e3c' },
  addButton: {
    backgroundColor: '#388e3c',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  addButtonText: { fontWeight: 'bold', color: '#FFF' },
  banner: {
    flexDirection: 'row',
    backgroundColor: '#388e3c',
    padding: 12,
    justifyContent: 'space-between',
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 20,
  },
  bannerText: { fontWeight: 'bold', color: '#FFF' },
  priceBox: {
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 12,
  },
  price: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
  },
  change: {
    fontSize: 14,
    color: '#4CAF50',
  },
  chartCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  timeButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 12,
    paddingHorizontal: 16,
  },
  timeButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  activeButton: {
    backgroundColor: '#c8e6c9',
  },
  timeButtonText: {
    color: '#555',
    fontSize: 14,
  },
  activeButtonText: {
    color: '#1b5e20',
    fontWeight: '600',
  },
  table: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginTop: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  tableHeader: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  tableHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1b5e20',
  },
  tableHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#f8f9fa',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  columnHeader: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6c757d',
    letterSpacing: 0.5,
    flex: 1,
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f8f9fa',
  },
  buyerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  buyerAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#e8f5e8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  buyerInitial: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#388e3c',
  },
  buyerName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    flex: 1,
  },
  buyerPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    flex: 1,
    textAlign: 'center',
  },
  buyerChange: {
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
    backgroundColor: '#FDD835',
    paddingVertical: 4,
    borderRadius: 4,
  },
  viewMoreButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  viewMoreText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#388e3c',
    marginRight: 8,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#f1f1f1',
    borderRadius: 16,
    padding: 6,
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 12,
  },
  selectedTab: {
    backgroundColor: '#b5e3c1', // light green background
  },
  tabText: {
    color: '#444',
    fontWeight: '500',
  },
  selectedTabText: {
    color: '#006400', // dark green text
    fontWeight: 'bold',
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 20,
    minHeight: 300,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    padding: 5,
  },
  formContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  qtyPriceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#f9f9f9',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    gap: 15,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  addCropButton: {
    flex: 1,
    backgroundColor: '#388e3c',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  addCropButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  animationConatiner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});