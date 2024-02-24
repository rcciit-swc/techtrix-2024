import { Events } from '@/components/home'
import { generateMetadata } from '@/utils/metadata'
import { Metadata } from 'next'
import React from 'react'

export const metadata:Metadata = generateMetadata({
  title: "Events | TechTrix 2024",
  description: "Explore the events of TechTrix 2024",
})
const page = () => {
  return (
    <div>
        <Events />
    </div>
  )
}

export default page