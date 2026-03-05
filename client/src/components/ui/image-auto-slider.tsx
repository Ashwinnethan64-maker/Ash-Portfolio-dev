
import React from 'react';

export interface CertificateItem {
  image: string;
  title?: string;
  issuer?: string;
  year?: string;
}

type SliderInput = string | CertificateItem;

export const ImageAutoSlider = ({ images }: { images: SliderInput[] }) => {
  // Normalize inputs to CertificateItem objects
  const normalizedImages: CertificateItem[] = images.map((item) =>
    typeof item === 'string' ? { image: item } : item
  );

  // Duplicate images for seamless loop
  const duplicatedImages = [...normalizedImages, ...normalizedImages];

  return (
    <div className="relative w-full overflow-hidden py-12">
      <style>{`
        @keyframes scroll-right {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .infinite-scroll {
          animation: scroll-right 30s linear infinite;
        }

        .scroll-container {
          mask: linear-gradient(
            90deg,
            transparent 0%,
            black 10%,
            black 90%,
            transparent 100%
          );
          -webkit-mask: linear-gradient(
            90deg,
            transparent 0%,
            black 10%,
            black 90%,
            transparent 100%
          );
        }

        .image-item {
          transition: transform 0.3s ease, filter 0.3s ease;
        }

        .image-item:hover {
          transform: scale(1.05);
          filter: brightness(1.2) drop-shadow(0 0 8px rgba(0, 243, 255, 0.4));
        }

        .cert-overlay {
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .image-item:hover .cert-overlay {
          opacity: 1;
        }
      `}</style>
      
      <div className="scroll-container w-full">
        <div className="infinite-scroll flex gap-6 w-max">
          {duplicatedImages.map((cert, index) => {
            const hasMetadata = cert.title || cert.issuer || cert.year;
            return (
              <div
                key={index}
                className="image-item flex-shrink-0 w-64 h-40 md:w-80 md:h-48 rounded-xl overflow-hidden border border-white/10 shadow-2xl relative cursor-pointer"
                onClick={() => window.open(cert.image, '_blank', 'noopener,noreferrer')}
              >
                <img
                  src={cert.image}
                  alt={cert.title || `Certificate ${(index % normalizedImages.length) + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                {hasMetadata && (
                  <div className="cert-overlay absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end p-4">
                    {cert.title && (
                      <h4 className="text-white text-sm font-bold leading-tight mb-1 drop-shadow-lg">
                        {cert.title}
                      </h4>
                    )}
                    {cert.issuer && (
                      <p className="text-cyan-400 text-xs font-mono drop-shadow-lg">
                        {cert.issuer}
                      </p>
                    )}
                    {cert.year && (
                      <p className="text-white/70 text-xs font-mono mt-0.5">
                        {cert.year}
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
