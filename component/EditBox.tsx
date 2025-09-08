import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'

const EditBox = ({ title, edit, placeholder, type }: { title: string; edit : boolean; placeholder: string }) => {
    const [ text, setText ] = useState('');
  return (
    <View className='w-full flex flex-col gap-2 justify-center mx-3 py-2'>
        <Text className='text-base font-rubik text-black'>
            {title}
        </Text>

        {
            edit ? (
                <TextInput
                    className='px-2 py-3 border-2 border-black rounded-lg text-lg font-rubik-bold flex justify-center items-start w-full'
                    placeholder={placeholder}
                    value={text}
                    onChangeText={text => setText(text)}
                    numberOfLines={1}
                    autoComplete={type}
                    autoCorrect={true}
                />
            ) : (
                <View className="px-2 py-3 border-2 border-black rounded-lg w-full">
                    <Text className='text-lg font-rubik-bold flex justify-center items-start'>{placeholder}</Text>
                </View>
            )
        }
    </View>
  )
}

export default EditBox