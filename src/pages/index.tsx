import HomeLayout from '@/components/Layouts/HomeLayout'
import { Meta } from '@/layout/meta'
import Image from 'next/image'

const Home = () => {
  return (
    <>
    <Meta title={'Developer Manager - Login'} description={'Welcome to the Developer Manager Page'} />
    <HomeLayout />
    </>
  )
}

export default Home
