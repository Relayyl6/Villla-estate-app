import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { categories } from '@/constants/data';

const Filters = () => {
    const params = useLocalSearchParams<{ filter?: string }>();
    const [selectedCategory, setSelectedCategory] = useState(params.filter || "All");

    const handleCategoryPress = (category: string) => {
        if (selectedCategory === category) {
            setSelectedCategory('All');
            router.setParams({filter: 'All'});
            return;
        }
        setSelectedCategory(category);
        router.setParams({ filter: category })
    }

    return (
        <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            className='mt-3 mb-2 px-2 shadow-black-100/70 bg-white shadow-lg rounded-2xl'>
            {
                categories.map(
                    ({ title, category }, index) => (
                        <TouchableOpacity
                            key={index}
                            className={`flex flex-col items-start mr-4 px-4 py-2 my-2 rounded-full ${selectedCategory === category ? 'bg-blue-600' : 'bg-blue-50 border border-zinc-500'}`}
                            onPress={() => handleCategoryPress(category)}>
                                <Text
                                    className={`text-sm ${selectedCategory === category ? 'text-white font-rubik mt-0.5' : 'text-black-300 font-rubik-bold'}`}>
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