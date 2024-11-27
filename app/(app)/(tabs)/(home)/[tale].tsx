import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router';

export default function TalePage() {
    const { id } = useLocalSearchParams<{ name: string; id: string }>();

    
  return (
    <View>
      <Text>Tale Page: ${id}</Text>
    </View>
  )
}
