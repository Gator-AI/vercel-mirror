import React from "react";
import Image from "next/image";
import depotParkSocial from "@/images/events-photos/depot-park-social.jpg";

const photos = [
  depotParkSocial,
  // Add more images here as needed
];

export default function DepotParkSocialPage() {
  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-4 font-neighbor">
        Depot Park Social
      </h1>
      <p className="text-lg text-gray-700 mb-8">
        On September 1st, 2025, GatorAI hosted a social at Depot Park! Members
        enjoyed games, food, and great company. Here’s a recap and some photos
        from the event.
      </p>
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">Event Highlights</h2>
        <ul className="list-disc ml-6 text-gray-600">
          <li>Outdoor games and activities</li>
          <li>Snacks and refreshments</li>
          <li>Networking and socializing</li>
        </ul>
      </section>
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">Photo Gallery</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {photos.map((img, idx) => (
            <div key={idx} className="rounded-lg overflow-hidden shadow">
              <Image
                src={img}
                alt={`Depot Park Social photo ${idx + 1}`}
                width={600}
                height={400}
                className="object-cover w-full h-auto"
              />
            </div>
          ))}
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-2">Reflections</h2>
        <p className="text-gray-700">
          The Depot Park Social was a fantastic opportunity for members to
          connect and unwind. We look forward to more events like this in the
          future!
        </p>
      </section>
    </div>
  );
}
