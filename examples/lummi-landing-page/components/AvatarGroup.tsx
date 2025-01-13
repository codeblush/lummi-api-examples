import { useEffect, useState } from 'react'
import Image from 'next/image'

export function AvatarGroup() {
  const [avatars, setAvatars] = useState<string[]>([])

  useEffect(() => {
    const fetchAvatars = async () => {
      try {
        const response = await fetch('/api/search-images?query=portrait&perPage=3')
        const data = await response.json()
        if (data.data && data.data.length >= 3) {
          setAvatars(data.data.slice(0, 3).map((img: any) => img.url))
        }
      } catch (error) {
        console.error('Error fetching avatars:', error)
      }
    }

    fetchAvatars()
  }, [])

  return (
    <div className="flex justify-center -space-x-4 overflow-hidden mb-6">
      {avatars.map((avatar, index) => (
        <div key={index} className="relative w-16 h-16 rounded-full overflow-hidden ring-2 ring-white">
          <Image
            src={avatar}
            alt={`Avatar ${index + 1}`}
            layout="fill"
            objectFit="cover"
          />
        </div>
      ))}
    </div>
  )
}

