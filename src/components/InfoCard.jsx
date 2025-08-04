import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const InfoCard = ({ icon, title, content }) => (
  <View style={styles.card}>
    <View style={styles.iconContainer}>{icon}</View>
    <View style={styles.textContainer}>
      {title ? <Text style={styles.cardTitle}>{title}</Text> : null}
      <Text style={styles.cardContent}>{content}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  iconContainer: {
    backgroundColor: '#E8F5E9',
    borderRadius: 999,
    padding: 12,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#4B4B4B',
    marginBottom: 2,
  },
  cardContent: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
});

export default InfoCard;
