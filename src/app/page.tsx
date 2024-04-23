'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  return (
    <div className="w-full h-screen">
      <Image
        src="https://bzktkujjnkxlljgpzaha.supabase.co/storage/v1/object/public/CafeStorage/websiteImages/homepageImages/image1.png"
        alt="image"
        width={1920}
        height={1080}
        objectFit="contain"
        className="w-full h-1/3"
      />
      <div className="h-1/3 flex flex-col justify-evenly items-center w-full ">
        <Image
          src="https://bzktkujjnkxlljgpzaha.supabase.co/storage/v1/object/public/CafeStorage/websiteImages/homepageImages/image2.svg"
          alt="image"
          width={1920}
          height={1080}
          className="w-24 h-24 "
        />
        <h1>Restaurant</h1>
        <div className="flex gap-6 ">
          <button className="flex border-2 p-1 text-sm shadow-xl min-w-36 border-black rounded-md justify-center items-center">
            <Image
              src="https://bzktkujjnkxlljgpzaha.supabase.co/storage/v1/object/public/CafeStorage/websiteImages/homepageImages/bill.svg"
              alt="image"
              width={1920}
              height={1080}
              className="w-8 h-8 "
            />
            Request a Bill
          </button>
          <button
            onClick={() => {
              router.push('/restaurants')
            }}
            className="flex border-2 p-1 text-sm min-w-36 shadow-lg border-black rounded-md justify-center items-center"
          >
            <Image
              src="https://bzktkujjnkxlljgpzaha.supabase.co/storage/v1/object/public/CafeStorage/websiteImages/homepageImages/orderfood.svg"
              alt="image"
              width={1920}
              height={1080}
              className="w-8 h-8 "
            />
            Order Food
          </button>
        </div>
      </div>
      <Image
        src="https://bzktkujjnkxlljgpzaha.supabase.co/storage/v1/object/public/CafeStorage/websiteImages/homepageImages/image1.png"
        alt="image"
        width={1920}
        height={1080}
        objectFit="contain"
        className="w-full h-1/3"
      />
    </div>
  )
}
