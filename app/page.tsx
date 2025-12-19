import React from "react";
import Image from "next/image";

const menuImages = Array.from({ length: 26 }, (_, i) => {
  const index = String(i + 1).padStart(4, "0");
  return `/coffee/menu_page-${index}.jpg`;
});

export default function MenuGallery() {
  return (
    <main>
      {menuImages.map((src, idx) => (
        <Image
          key={src}
          src={src}
          alt="Page du menu"
          width={1240}
          height={1754}
          priority={idx === 0}
          className="block w-full h-auto"
          sizes="100vw"
        />
      ))}
    </main>
  );
}
