'use client'

import React, { useEffect, useState } from 'react'
import data from '@emoji-mart/data'

interface EmojiPickerProps {
  onEmojiSelect: (emoji: any) => void
}

const EmojiPicker: React.FC<EmojiPickerProps> = ({ onEmojiSelect }) => {
  const [Picker, setPicker] = useState<any>(null)

  useEffect(() => {
    import('@emoji-mart/react').then((module) => {
      setPicker(() => module.default)
    })
  }, [])

  if (!Picker) {
    return null
  }

  return (
    <Picker
      data={data}
      onEmojiSelect={onEmojiSelect}
      theme="dark"
      set="apple"
      skinTonePosition="search"
      previewPosition="none"
      maxFrequentRows={2}
    />
  )
}

export default EmojiPicker
