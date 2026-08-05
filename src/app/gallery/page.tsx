'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import styles from './Gallery.module.css';

interface BirdPhoto {
  id: string;
  name: string;
  scientificName: string;
  location: string;
  category: 'Himalayas' | 'Foothills' | 'Wetlands';
  image: string;
  exif: {
    camera: string;
    lens: string;
    shutter: string;
    aperture: string;
    iso: string;
  };
  description: string;
  themeColor: string;
  svgIcon: string;
}

const galleryData: BirdPhoto[] = [
  {
    id: 'monal',
    name: 'Himalayan Monal',
    scientificName: 'Lophophorus impejanus',
    location: 'Chopta, Uttarakhand (10,500 ft)',
    category: 'Himalayas',
    image: '/images/monal.png',
    exif: {
      camera: 'Sony α9 II',
      lens: 'FE 600mm f/4 GM OSS',
      shutter: '1/1600s',
      aperture: 'f/4.0',
      iso: '640',
    },
    description: 'Spotted foraging along the frozen meadows of Chopta. It is the state bird of Uttarakhand, famous for its glowing metallic iridescent crown and multi-colored plumage. Took years of winter tracking to secure this stable eye-level profile.',
    themeColor: 'linear-gradient(135deg, #0f2e3d 0%, #1e4d2b 100%)',
    svgIcon: '🦚',
  },
  {
    id: 'vulture',
    name: 'Bearded Vulture',
    scientificName: 'Gypaetus barbatus',
    location: 'Tungnath Ridge, Chopta (11,800 ft)',
    category: 'Himalayas',
    image: '/images/vulture.png',
    exif: {
      camera: 'Sony α1',
      lens: 'FE 400mm f/2.8 GM OSS',
      shutter: '1/3200s',
      aperture: 'f/4.0',
      iso: '500',
    },
    description: 'A massive lammergeier soaring past the alpine ridges of Tungnath. Famous for dropping large bones from high altitude onto rocks to break them into edible bone marrow chunks. Captured in soaring flight against snow peaks.',
    themeColor: 'linear-gradient(135deg, #422d1d 0%, #a3724c 100%)',
    svgIcon: '🦅',
  },
  {
    id: 'sunbird',
    name: 'Green-tailed Sunbird',
    scientificName: 'Aethopyga nipalensis',
    location: 'Pangot Oak Forest, Uttarakhand',
    category: 'Foothills',
    image: '/images/sunbird.png',
    exif: {
      camera: 'Sony α9 II',
      lens: 'FE 600mm f/4 GM OSS',
      shutter: '1/1250s',
      aperture: 'f/5.6',
      iso: '800',
    },
    description: 'Feeding on wild honeysuckle blossoms on the forest edges. Capturing the dynamic metallic sheen of its green tail and yellow breast requires waiting for specific early-morning angles when they are most active.',
    themeColor: 'linear-gradient(135deg, #1b3d1b 0%, #526f29 100%)',
    svgIcon: '🐦',
  },
  {
    id: 'barbet',
    name: 'Blue-throated Barbet',
    scientificName: 'Psilopogon asiaticus',
    location: 'Sattal Streams, Uttarakhand',
    category: 'Foothills',
    image: '/images/barbet.png',
    exif: {
      camera: 'Sony α9 II',
      lens: 'FE 600mm f/4 GM OSS',
      shutter: '1/800s',
      aperture: 'f/4.0',
      iso: '1200',
    },
    description: 'A vibrant resident barbet showing off its bright blue cheeks and crown. Photographed from a camouflaged hide near a natural spring where they drop down to bathe and wash off sticky fruit pulp in the hot afternoons.',
    themeColor: 'linear-gradient(135deg, #123e47 0%, #177a70 100%)',
    svgIcon: '🦜',
  },
  {
    id: 'bluethroat',
    name: 'Asian Paradise Flycatcher',
    scientificName: 'Terpsiphone paradisi',
    location: 'Corbett Buffer Zone, Uttarakhand',
    category: 'Foothills',
    image: '/images/flycatcher.png',
    exif: {
      camera: 'Sony α7R V',
      lens: 'FE 200-600mm f/5.6-6.3 G OSS',
      shutter: '1/1000s',
      aperture: 'f/6.3',
      iso: '400',
    },
    description: 'A stunning white morph male boasting long ribbon-like tail streamers. Spotted floating through misty canopy branches. Securing this clean frame required patient observation near nesting territory.',
    themeColor: 'linear-gradient(135deg, #14224c 0%, #1e3b8a 100%)',
    svgIcon: '🐦',
  },
  {
    id: 'hornbill',
    name: 'Cheer Pheasant',
    scientificName: 'Catreus wallichii',
    location: 'Chopta Ridge, Uttarakhand',
    category: 'Himalayas',
    image: '/images/pheasant.png',
    exif: {
      camera: 'Sony α9 II',
      lens: 'FE 600mm f/4 GM OSS',
      shutter: '1/2000s',
      aperture: 'f/4.0',
      iso: '1000',
    },
    description: 'An extremely rare and endangered Himalayan pheasant. Tracked on steep, grassy rocky slopes early morning before sunrise clouds roll into the valley.',
    themeColor: 'linear-gradient(135deg, #1a1a1a 0%, #3a3d3c 100%)',
    svgIcon: '🦤',
  },
  {
    id: 'lark',
    name: 'Himalayan Monal (Display Flight)',
    scientificName: 'Lophophorus impejanus',
    location: 'Tungnath High Meadow',
    category: 'Himalayas',
    image: '/images/monal.png',
    exif: {
      camera: 'Sony α1',
      lens: 'FE 600mm f/4 GM OSS',
      shutter: '1/2500s',
      aperture: 'f/4.0',
      iso: '320',
    },
    description: 'Shifting colors of the rainbow nape exposed under full sun at 11,000 feet. Photographed during an intensive winter expedition.',
    themeColor: 'linear-gradient(135deg, #8c7e6c 0%, #c4bca6 100%)',
    svgIcon: '🐦',
  },
  {
    id: 'owlet',
    name: 'Blue-throated Barbet Hide Shot',
    scientificName: 'Glaucidium brodiei',
    location: 'Sattal Forest, Uttarakhand',
    category: 'Foothills',
    image: '/images/barbet.png',
    exif: {
      camera: 'Sony α9 II',
      lens: 'FE 600mm f/4 GM OSS',
      shutter: '1/250s',
      aperture: 'f/4.0',
      iso: '1600',
    },
    description: 'A sharp profile frame captured near hide perches during early spring breeding activity.',
    themeColor: 'linear-gradient(135deg, #3d2d1e 0%, #634d3d 100%)',
    svgIcon: '🦉',
  }
];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedPhoto, setSelectedPhoto] = useState<BirdPhoto | null>(null);

  const filteredPhotos = galleryData.filter(
    (photo) => activeCategory === 'All' || photo.category === activeCategory
  );

  return (
    <div>
      {/* Header */}
      <header className={styles.pageHeader}>
        <div className={`container ${styles.headerContent}`}>
          <h1>Professional Bird Photography Gallery</h1>
          <p>
            Stunning frames captured by guide Shubham Kumar on various birding and photography expeditions.
          </p>
        </div>
      </header>

      {/* Gallery content */}
      <section className={styles.gallerySection}>
        <div className="container">
          {/* Categories Tab */}
          <div className={styles.filterTabs}>
            {['All', 'Himalayas', 'Foothills', 'Wetlands'].map((cat) => (
              <button
                key={cat}
                className={`${styles.tabBtn} ${activeCategory === cat ? styles.activeTabBtn : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat === 'All' ? 'All Birds' : `${cat} Specialties`}
              </button>
            ))}
          </div>

          {/* Grid Layout */}
          <div className={styles.grid}>
            {filteredPhotos.map((photo) => (
              <div
                key={photo.id}
                className={styles.card}
                onClick={() => setSelectedPhoto(photo)}
              >
                {/* Visual Frame */}
                <div
                  className={styles.imageFrame}
                >
                  <Image
                    src={photo.image}
                    alt={photo.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className={styles.cardImg}
                  />

                  <div className={styles.imageOverlay}>
                    <span className={styles.hoverCameraIcon}>📷</span>
                    <span style={{ fontWeight: 700 }}>Click to View Details</span>
                    <span className={styles.hoverExif}>
                      {photo.exif.camera} • {photo.exif.shutter}
                    </span>
                  </div>
                </div>

                {/* Info Area */}
                <div className={styles.cardInfo}>
                  <h3 className={styles.speciesTitle}>{photo.name}</h3>
                  <p className={styles.speciesScientific}>{photo.scientificName}</p>

                  <div className={styles.cardMeta}>
                    <span className={styles.cardLocation}>📍 {photo.location.split('(')[0].trim()}</span>
                    <span className="badge badge-primary" style={{ fontSize: '0.65rem' }}>
                      {photo.category}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div className={styles.lightbox} onClick={() => setSelectedPhoto(null)}>
          <div
            className={styles.lightboxContent}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              className={styles.closeBtn}
              onClick={() => setSelectedPhoto(null)}
              aria-label="Close lightbox"
            >
              ✕
            </button>

            {/* Left Photo Visual */}
            <div
              className={styles.lightboxImageArea}
              style={{ position: 'relative', overflow: 'hidden' }}
            >
              <Image
                src={selectedPhoto.image}
                alt={selectedPhoto.name}
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Right Information */}
            <div className={styles.lightboxInfoArea}>
              <div>
                <span className="badge badge-accent" style={{ marginBottom: '0.75rem' }}>
                  {selectedPhoto.category} Specialty
                </span>
                <h2 className={styles.lightboxTitle}>{selectedPhoto.name}</h2>
                <p className={styles.lightboxScientific}>{selectedPhoto.scientificName}</p>
                <p className={styles.lightboxDesc}>{selectedPhoto.description}</p>
              </div>

              {/* Camera Metadata EXIF */}
              <div>
                <h4 style={{ textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.05em', color: 'var(--primary)', marginBottom: '0.5rem' }}>
                  Camera & Lens Sighting EXIF
                </h4>
                <div className={styles.exifGrid}>
                  <div>
                    <span className={styles.exifLabel}>Camera Body</span>
                  </div>
                  <div>
                    <span className={styles.exifValue}>{selectedPhoto.exif.camera}</span>
                  </div>
                  <div>
                    <span className={styles.exifLabel}>Lens Used</span>
                  </div>
                  <div>
                    <span className={styles.exifValue}>{selectedPhoto.exif.lens}</span>
                  </div>
                  <div>
                    <span className={styles.exifLabel}>Shutter Speed</span>
                  </div>
                  <div>
                    <span className={styles.exifValue}>{selectedPhoto.exif.shutter}</span>
                  </div>
                  <div>
                    <span className={styles.exifLabel}>Aperture</span>
                  </div>
                  <div>
                    <span className={styles.exifValue}>{selectedPhoto.exif.aperture}</span>
                  </div>
                  <div>
                    <span className={styles.exifLabel}>ISO Speed</span>
                  </div>
                  <div>
                    <span className={styles.exifValue}>{selectedPhoto.exif.iso}</span>
                  </div>
                  <div>
                    <span className={styles.exifLabel}>Location</span>
                  </div>
                  <div>
                    <span className={styles.exifValue} style={{ fontSize: '0.75rem' }}>{selectedPhoto.location}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
