import React from 'react'
import EventPreviewCard from './EventPreviewCard'


const EventPreview = ({events}:{events:any}) => {
  return (
    <div className='flex flex-col items-center mx-auto gap-10'>
      {
        events.map((event:any,index:number) => {
          return <EventPreviewCard key={index} event={event} />
        })
      }
       
    </div>
  )
}

export default EventPreview