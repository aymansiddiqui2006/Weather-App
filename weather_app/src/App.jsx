import Weather_card from "./Weather_card"
import { useContext } from "react"
import { BgContext } from "./context/BgContext"

import clear from '../src/assets/bg-video/clear.mp4'
import cloud from '../src/assets/bg-video/cloud.mp4'
import drizzle from '../src/assets/bg-video/drizzle.mp4'
import rain from '../src/assets/bg-video/rain.mp4'
import snow from '../src/assets/bg-video/snow.mp4'


function App() {

  const { weather } = useContext(BgContext)

  const bgColor = {
    "01d": clear,
    "01n": clear,
    "02d": cloud,
    "02n": cloud,
    "03d": cloud,
    "03n": cloud,
    "04d": drizzle,
    "04n": drizzle,
    "09d": rain,
    "09n": rain,
    "10d": rain,
    "10n": rain,
    "13d": snow,
    "13n": snow,
  };


  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* Background Video */}
      <video
        key={weather}               // Reloads the video when weather changes
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover -z-10"
      >
        <source src={bgColor[weather] || clear} type="video/mp4" />
      </video>

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/30 -z-10"></div>

      {/* Weather Card */}
      <Weather_card />
    </div>
  );
}

export default App
