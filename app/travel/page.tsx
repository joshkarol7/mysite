import Image from "next/image";
import Link from "next/link";

export default function Travel() {
  // List of travel photos from the public/travel folder
  const travelPhotos = [
    {
      src: "/travel/IMG_9149.png",
      alt: "Travel photo 1"
    },
    {
      src: "/travel/IMG_7263.png",
      alt: "Travel photo 2"
    },
    {
      src: "/travel/IMG_6830.png",
      alt: "Travel photo 3"
    },
    {
      src: "/travel/IMG_6782.png",
      alt: "Travel photo 4"
    },
    {
      src: "/travel/IMG_6747.png",
      alt: "Travel photo 5"
    },
    {
      src: "/travel/IMG_5776.png",
      alt: "Travel photo 6"
    },
    {
      src: "/travel/IMG_5621.png",
      alt: "Travel photo 7"
    },
    {
      src: "/travel/IMG_1866.png",
      alt: "Travel photo 8"
    },
    {
      src: "/travel/IMG_0945.png",
      alt: "Travel photo 9"
    },
    {
      src: "/travel/G0091040.JPG",
      alt: "Travel photo 10"
    },
    {
      src: "/travel/DSC00012_Original.jpg",
      alt: "Travel photo 11"
    },
    {
      src: "/travel/IMG_0807_Original.jpg",
      alt: "Travel photo 12"
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
        <h1 className="text-4xl font-bold mb-4">travel</h1>

      </div>

      {/* Photo grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {travelPhotos.map((photo, index) => (
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