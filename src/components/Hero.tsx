import '../app/globals.css'
import Image from 'next/image'
const Hero = () => {
  return (
    <div className="hero">
      <div className='parents'>
        <Image src="/keyboard 1.png" height={200} width={200} alt="keyboard" className='keyboard' />
        <div className="center">
          <h1 className='EventName'>TECHTRIX 2024</h1>
          <br />
          <br />
          <Image src="/Untitled-1 1.png" height={10} width={800} alt='untitled'></Image>
        </div>
        <Image src="/pc-render 1.png" height={200} width={300} alt="pcrender1" className='pc' />
      </div>
      <div className="untitled">
      </div>
    </div>
  )
}

export default Hero