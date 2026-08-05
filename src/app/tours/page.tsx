'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Tours.module.css';

interface ItineraryItem {
  day: number;
  title: string;
  desc: string;
}

interface Tour {
  id: string;
  title: string;
  subtitle: string;
  location: string;
  region: 'Himalayas' | 'Foothills' | 'Wetlands';
  duration: string;
  difficulty: 'Easy' | 'Moderate' | 'Strenuous';
  bestSeason: string;
  price: number;
  description: string;
  targets: string[];
  itinerary: ItineraryItem[];
  image: string;
}

const toursData: Tour[] = [
  {
    id: 'chopta',
    title: 'Chopta Alpine Pheasant Quest',
    subtitle: 'Quest for the Himalayan Monal & Alpine Endemics',
    location: 'Chopta & Mandal, Uttarakhand',
    region: 'Himalayas',
    duration: '6 Days',
    difficulty: 'Strenuous',
    bestSeason: 'March – May, Oct – Dec',
    price: 1400,
    image: '/images/chopta.png',
    description: 'Explore the high-altitude oak and rhododendron forests of Chopta (up to 11,500 ft). This expedition is carefully timed and paced to seek out spectacular high Himalayan pheasants, high-elevation raptors, and snow-zone targets.',
    targets: ['Himalayan Monal', 'Cheer Pheasant', 'Koklass Pheasant', 'Kalij Pheasant', 'Bearded Vulture', 'Golden Eagle', 'Pink-browed Rosefinch', 'Himalayan Snowcock'],
    itinerary: [
      { day: 1, title: 'Arrival in Dehradun & Transfer to Chopta', desc: 'Meet Shubham in Dehradun. 7-hour scenic drive into the mountains with birding stops along the Ganga and Alaknanda rivers. Check-in at alpine eco-lodge.' },
      { day: 2, title: 'Makku Math Forest Roads & Foothills', desc: 'Birding the lower oak forest belts. Key targets include Cheer Pheasant nesting slopes, laughingthrushes, and mixed foraging blocks.' },
      { day: 3, title: 'Chopta Rhododendron Trails', desc: 'A full day scanning high altitude trails. Setup tripods for the stunning Himalayan Monal and Koklass Pheasant feeding zones.' },
      { day: 4, title: 'Tungnath High Altitude Meadow Hike', desc: 'Hike to the alpine meadows near the highest temple. Focus on snowfinches, Himalayan Snowcock, Golden Eagle, and Bearded Vultures.' },
      { day: 5, title: 'Mandal Stream Birding & Valley Walks', desc: 'Birding alongside mountain torrents for Torrent Duck, Forktails, Crested Kingfisher, and scoping undergrowth for skulking warblers.' },
      { day: 6, title: 'Morning Birding & Return to Dehradun', desc: 'Final morning photography session, check-out, and transfer back to Dehradun airport/station.' }
    ]
  },
  {
    id: 'sattal',
    title: 'Sattal Foothills Special',
    subtitle: 'A subtropical paradise for high-volume photography',
    location: 'Sattal, Bhimtal & Pangot, Uttarakhand',
    region: 'Foothills',
    duration: '5 Days',
    difficulty: 'Easy',
    bestSeason: 'October – April',
    price: 950,
    image: '/images/sattal.png',
    description: 'Perfect for bird photographers. Sattal features rich forest patches, streams, and established bird hides, allowing incredibly close-up, eye-level views of colorful flycatchers, barbets, laughingthrushes, and woodpeckers.',
    targets: ['Blue-throated Barbet', 'Great Barbet', 'Scaly-bellied Woodpecker', 'Lesser Yellownape', 'White-throated Laughingthrush', 'Rufous-bellied Niltava', 'Red-billed Blue Magpie'],
    itinerary: [
      { day: 1, title: 'Delhi to Sattal Drive & Afternoon Hide Session', desc: 'Drive from Delhi (6 hours) to the foothills. Direct check-in at a forest resort. Spend the afternoon at a local bird hide for flycatchers and bulbuls.' },
      { day: 2, title: 'Sattal Streams & Studio Photography', desc: 'Full-day birding around the famous Sattal streams. Great opportunities to capture bathing forest birds at close ranges.' },
      { day: 3, title: 'Chafi River Walks & Khalij Habitats', desc: 'Early morning search for the Crested Kingfisher and Forktails along the Chafi stream, followed by forest trails for Khalij Pheasant.' },
      { day: 4, title: 'Day Trip to Pangot Oak Forest', desc: 'Drive up to Pangot (6,500 ft) for a change in altitude. Search for Cheer Pheasant, Koklass, and high-altitude woodpeckers in massive oak trees.' },
      { day: 5, title: 'Morning Birding & Return Drive to Delhi', desc: 'Final hide photography session to capture missed targets, check-out, and drive back to Delhi.' }
    ]
  },
  {
    id: 'manglajodi',
    title: 'Manglajodi Wetland Odyssey',
    subtitle: 'Migratory wildfowl & waders on Chilika Lake',
    location: 'Chilika Lake, Odisha',
    region: 'Wetlands',
    duration: '3 Days',
    difficulty: 'Easy',
    bestSeason: 'November – February',
    price: 680,
    image: '/images/manglajodi.png',
    description: 'Drift silently in handmade wooden boats steered by local fishermen-turned-conservationists. Get spectacularly close, water-level views of thousands of nesting and migratory ducks, shorebirds, and waders.',
    targets: ['Greater Painted-snipe', 'Black-tailed Godwit', 'Pheasant-tailed Jacana', 'Purple Heron', 'Glossy Ibis', 'Spot-billed Pelican', 'Ruddy-breasted Crake'],
    itinerary: [
      { day: 1, title: 'Bhubaneswar Pickup & Sunset Boat Safari', desc: 'Pickup from Bhubaneswar airport, drive to Manglajodi (2 hours). Check-in at the eco-tented camp. Afternoon boat safari on Chilika Lake channels.' },
      { day: 2, title: 'Morning & Evening Water Safaris', desc: 'Two extensive boat trips targeting specific marsh birds. Drift close to mudflats for shorebird feeding details and flight photography.' },
      { day: 3, title: 'Wetland Fringe Walk & Return Transfer', desc: 'Morning walk along dykes for warblers and pipits. Check-out and return transfer to Bhubaneswar.' }
    ]
  }
];

export default function Tours() {
  const [search, setSearch] = useState('');
  const [activeRegion, setActiveRegion] = useState<string>('All');
  const [activeDifficulty, setActiveDifficulty] = useState<string>('All');
  const [expandedItinerary, setExpandedItinerary] = useState<Record<string, boolean>>({});

  const toggleItinerary = (tourId: string) => {
    setExpandedItinerary((prev) => ({
      ...prev,
      [tourId]: !prev[tourId]
    }));
  };

  const filteredTours = toursData.filter((tour) => {
    const matchesSearch =
      tour.title.toLowerCase().includes(search.toLowerCase()) ||
      tour.targets.some((t) => t.toLowerCase().includes(search.toLowerCase())) ||
      tour.location.toLowerCase().includes(search.toLowerCase());

    const matchesRegion = activeRegion === 'All' || tour.region === activeRegion;
    const matchesDifficulty = activeDifficulty === 'All' || tour.difficulty === activeDifficulty;

    return matchesSearch && matchesRegion && matchesDifficulty;
  });

  return (
    <div>
      {/* Header */}
      <header className={styles.pageHeader}>
        <div className={`container ${styles.headerContent}`}>
          <h1>Guided Birding Tours & Hotspots</h1>
          <p>
            Explore our curated expeditions, specifically optimized for spotting target specialties, lifers, and premium photography opportunities.
          </p>
        </div>
      </header>

      {/* Sticky Filters */}
      <section className={styles.filterBar}>
        <div className={`container ${styles.filterFlex}`}>
          {/* Search Box */}
          <div className={styles.searchBox}>
            <span className={styles.searchIcon}>🔍</span>
            <input
              type="text"
              placeholder="Search by bird (e.g., Monal), location..."
              className={styles.searchInput}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Tag Filters */}
          <div className={styles.filterGroups}>
            {/* Region Group */}
            <div className={styles.filterGroup}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', alignSelf: 'center', color: 'var(--primary)' }}>
                Region:
              </span>
              {['All', 'Himalayas', 'Foothills', 'Wetlands'].map((region) => (
                <button
                  key={region}
                  className={`${styles.filterBtn} ${activeRegion === region ? styles.activeFilterBtn : ''}`}
                  onClick={() => setActiveRegion(region)}
                >
                  {region}
                </button>
              ))}
            </div>

            {/* Difficulty Group */}
            <div className={styles.filterGroup}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', alignSelf: 'center', color: 'var(--primary)' }}>
                Difficulty:
              </span>
              {['All', 'Easy', 'Moderate', 'Strenuous'].map((diff) => (
                <button
                  key={diff}
                  className={`${styles.filterBtn} ${activeDifficulty === diff ? styles.activeFilterBtn : ''}`}
                  onClick={() => setActiveDifficulty(diff)}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tours List */}
      <section className={styles.toursListSection}>
        <div className="container">
          {filteredTours.length > 0 ? (
            <div className={styles.toursFlex}>
              {filteredTours.map((tour) => {
                const isExpanded = !!expandedItinerary[tour.id];
                return (
                  <div key={tour.id} id={tour.id} className={styles.tourCard}>
                    {/* Left Column (Details banner) */}
                    <div className={styles.tourBanner}>
                      <Image
                        src={tour.image}
                        alt={tour.title}
                        fill
                        className={styles.tourBannerImg}
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className={styles.tourBannerOverlay} />
                      <div className={styles.tourBannerInner}>
                        <div>
                          <span className={styles.tourSubtitle}>{tour.region} Expedition</span>
                          <h2 className={styles.tourHeading}>{tour.title}</h2>
                          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.9rem', marginTop: '0.5rem' }}>📍 {tour.location}</p>
                        </div>

                        <div className={styles.tourPriceInfo}>
                          <span className={styles.priceLabel}>All-Inclusive Rate</span>
                          <div className={styles.priceValue}>
                            ${tour.price} <span className={styles.pricePer}>USD / birder</span>
                          </div>
                          <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)', marginTop: '0.25rem' }}>
                            *Includes transport, hides, permits, lodging & meals.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Right Column (Contents) */}
                    <div className={styles.tourContent}>
                      <div>
                        <p style={{ fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
                          {tour.description}
                        </p>

                        {/* Specs Grid */}
                        <div className={styles.tourSpecsGrid}>
                          <div className={styles.specItem}>
                            <span className={styles.specLabel}>Duration</span>
                            <span className={styles.specValue}>{tour.duration}</span>
                          </div>
                          <div className={styles.specItem}>
                            <span className={styles.specLabel}>Difficulty</span>
                            <span className={styles.specValue}>{tour.difficulty}</span>
                          </div>
                          <div className={styles.specItem}>
                            <span className={styles.specLabel}>Best Season</span>
                            <span className={styles.specValue}>{tour.bestSeason}</span>
                          </div>
                        </div>
                      </div>

                      {/* Target Species */}
                      <div className={styles.targetsSection}>
                        <h3>Target Bird Specialties</h3>
                        <div className={styles.targetsList}>
                          {tour.targets.map((target) => (
                            <span key={target} className={styles.targetBadge}>
                              🐦 {target}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Accordion Timeline Itinerary */}
                      <div className={styles.itinerarySection}>
                        <div className={styles.accordionHeader} onClick={() => toggleItinerary(tour.id)}>
                          <h3>Day-by-Day Itinerary</h3>
                          <span className={`${styles.accordionIcon} ${isExpanded ? styles.accordionIconExpanded : ''}`}>
                            ▼
                          </span>
                        </div>

                        {isExpanded && (
                          <div className={styles.itineraryTimeline}>
                            {tour.itinerary.map((dayItem) => (
                              <div key={dayItem.day} className={styles.itineraryDay}>
                                <h4 className={styles.dayTitle}>
                                  Day {dayItem.day}: {dayItem.title}
                                </h4>
                                <p className={styles.dayDesc}>{dayItem.desc}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Tour Call to Action */}
                      <div className={styles.actions}>
                        <Link href={`/book?tour=${tour.id}`} className="btn btn-primary">
                          Book This Tour
                        </Link>
                        <a
                          href="https://wa.me/910000000000"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-secondary"
                        >
                          Enquire via WhatsApp
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '5rem 0' }}>
              <span style={{ fontSize: '3rem' }}>🔍</span>
              <h2 style={{ margin: '1rem 0 0.5rem 0' }}>No Tours Found</h2>
              <p>We couldn't find any packages matching your search criteria. Try modifying your filters.</p>
              <button
                className="btn btn-secondary"
                style={{ marginTop: '1.5rem' }}
                onClick={() => {
                  setSearch('');
                  setActiveRegion('All');
                  setActiveDifficulty('All');
                }}
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
