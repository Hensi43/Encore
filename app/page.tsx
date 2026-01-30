import Hero from '@/components/home/Hero';
import FestHighlights from '@/components/home/FestHighlights';
import SignatureNights from '@/components/home/SignatureNights';
import EventsPreview from '@/components/home/EventsPreview';
import TimelineTeaser from '@/components/home/TimelineTeaser';
import SponsorsPreview from '@/components/home/SponsorsPreview';
import Flashback from '@/components/home/Flashback';
// import About from '@/components/home/About'; // Might be redundant now or can be added back
import Stats from '@/components/home/Stats'; // Replacing with FestHighlights or keeping? FestHighlights is better suited for the new theme
import FAQ from '@/components/home/FAQ';

export default function Home() {
  return (
    <div className="min-h-screen bg-black overflow-hidden">
      <Hero />
      <FestHighlights />
      <div className="relative z-10">
        <SignatureNights />
        <EventsPreview />
        <TimelineTeaser />
        <Flashback />
        {/* <Stats /> Removing old stats in favor of FestHighlights */}
        <SponsorsPreview />
        <FAQ />
      </div>
    </div>
  );
}
