import React from 'react'

const styles = {
    background : `conic-gradient(from 180deg at 50% 50%, #FFC800 0deg, #D85123 50.63deg, #FFC800 118.12deg, #D85123 183.75deg, #FFC800 245.62deg, #D85123 309.38deg, #FFC800 360deg)`,
    textBackground: `linear-gradient(187.03deg, #FFFFFF 49.99%, #000000 94.51%)
    `
}
const EventWrapper = ({children,title,description}:{
    children:React.ReactNode,
    title:any,
    description:string
}) => {
  return (
    <div className='mx-auto w-full'>
    <div style={{background:styles.background}} className=' lg:w-[80%] flex flex-col items-start justify-center mx-auto h-auto px-5  py-10 md:px-20 md:py-24 rounded-2xl'>
            <div className='relative  w-[100%]  justify-center flex flex-col gap-10 items-start'>
                <div className='flex flex-col lg:px-16 items-start gap-5'>
                <h1 className='font-bold text-3xl md:text-4xl lg:text-5xl text-white'>{title}</h1>
                <h1 className='text-white font-semibold text-xl lg:text-2xl'>{description}</h1>
                </div>
                {children}
            </div>
    </div>
   </div>
  )
}

export default EventWrapper