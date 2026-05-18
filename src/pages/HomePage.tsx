import { useState } from 'react';
import Hero from '../components/sections/Hero';
import Ticker from '../components/sections/Ticker';
import Examples from '../components/sections/Examples';
import Process from '../components/sections/Process';
import WhyUs from '../components/sections/WhyUs';
import Packages from '../components/sections/Packages';
import OrderForm from '../components/sections/OrderForm';
import type { PackageId } from '../types';

export default function HomePage() {
  const [selectedPackage, setSelectedPackage] = useState<PackageId | undefined>();

  return (
    <>
      <Hero />
      <Ticker />
      <Examples />
      <Process />
      <WhyUs />
      <Packages onSelectPackage={setSelectedPackage} />
      <OrderForm selectedPackage={selectedPackage} />
    </>
  );
}