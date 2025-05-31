import Image from "next/image";
import Link from "next/link";

export default function Fishing() {
  // List of fishing photos from the public/fishing folder
  const fishingPhotos = [
    {
      src: "/fishing/IMG_4294.JPG",
      alt: "Fishing photo 1"
    },
    {
      src: "/fishing/FullSizeRender.jpeg", 
      alt: "Fishing photo 2"
    },
    {
      src: "/fishing/IMG_6591.png",
      alt: "Fishing photo 3"
    },
    {
      src: "/fishing/B42F2120-BDBF-4F80-9416-1C7D86DD6299.png",
      alt: "Fishing photo 4"
    },
    {
      src: "/fishing/3E0C9410-3FD2-4AE6-8EC4-6A89F1732C4D.png",
      alt: "Fishing photo 5"
    },

    {
      src: "/fishing/E52F1BD8-E01B-45E5-85E4-71EAD7D9617E.png",
      alt: "Fishing photo 7"
    },
    {
      src: "/fishing/FullSizeRender.png",
      alt: "Fishing photo 8"
    },
    {
      src: "/fishing/IMG_1645.png",
      alt: "Fishing photo 9"
    },
    {
      src: "/fishing/IMG_1486.png",
      alt: "Fishing photo 10"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 font-[family-name:var(--font-geist-sans)]">
      {/* Back to home link */}
      <div className="mb-8">
        <Link href="/" className="text-blue-600 dark:text-blue-400 hover:underline">
          ← home
        </Link>
      </div>

      {/* Page header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">fishing</h1>
      </div>

      {/* Photo grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {fishingPhotos.map((photo, index) => (
          <div key={index} className="aspect-square relative overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
        ))}
      </div>

    </div>
  );
} 