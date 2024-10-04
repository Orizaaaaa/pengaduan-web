import LandingUi from "@/components/ui/LandingUi"
import dynamic from 'next/dynamic';

// Import komponen Map secara dinamis tanpa SSR




const page = () => {
  return (
    <LandingUi />
  )
}

export default page