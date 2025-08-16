import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { categories } from '@/constants/data';

const Filters = () => {
    const params = useLocalSearchParams<{ filter?: string }>();
    const [selectedCategory, setSelectedCategory] = useState(params.filter || "All");

    const handlePress = (category: string) => {

    }

    return (
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} className='mt-3 mb-2 shadow-black-100/70 bg-white shadow-lg rounded-2xl'>
            {
                categories.map(
                    ({ title, category }, index) => (
                        <TouchableOpacity
                            key={index}
                            className={`flex flex-col items-start mr-4 px-4 py-2 rounded-full ${selectedCategory === category ? 'bg-primary-300' : 'bg-primary-100 border border-primary'}`}
                            onPress={() => handlePress(category)}>
                                <Text
                                    className={`text-sm ${selectedCategory === category ? 'text-white' : 'text-primary-300'}`}>
                                    {title}
                                </Text>
                        </TouchableOpacity>
                    )
                )
            }
        </ScrollView>
    )
}

export default Filters