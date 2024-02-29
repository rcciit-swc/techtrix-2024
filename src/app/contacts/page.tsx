import Block from '@/components/contacts/Block'
import { Heading } from '@/components/home'
import { generateMetadata } from '@/utils/metadata';
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = generateMetadata({
  title: "Gallery | TechTrix 2024",
  description: "Explore the Gallery of TechTrix 2024",
});

const Page = () => {
  return (
    <div className='flex flex-col items-center mx-auto'>
      <Heading text='Contact Us' />
      <Block />
    </div>
  )
}

export default Page
