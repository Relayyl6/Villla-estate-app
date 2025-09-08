import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import icons from '@/constants/icons'
import { router } from 'expo-router';

const Header = ({ username }: { username: string }) => {
  return (
    <View className='flex flex-row items-center justify-between mt-5 px-2'>
        <TouchableOpacity onPress={() => router.back()} className='size-11 flex flex-row items-center justify-center rounded-full'>
          <Image
            source={icons.backArrow}
            alt="alt"
            className='size-4 dark:invert rounded-full bg-blue-400/20 p-5'
          />
        </TouchableOpacity>
        
    
        <Text className='font-rubik-medium text-center text-xl'>
            {username}
        </Text>
    
        <Image
            source={icons.person}
            className='size-7 dark: invert'
        />
    </View>
  )
}

export default Header