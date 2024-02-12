"use client";
import { useParams } from 'next/navigation'
import React from 'react'

const page = ({}) => {
    const event = useParams();
    console.log(event);
  return (
  <div>
    Hi
  </div>
  )
}

export default page