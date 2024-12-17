"use client"; // This is a client component
import { FeatureCard } from "./Components/FeatureCard";
import { FaSearch } from "react-icons/fa";
import { FaCartArrowDown } from "react-icons/fa";

export default function Home() {
  return (
    <div className="bg-black min-h-screen">
      <section className="flex items-center justify-center text-center text-white py-20">
        <div>
          <h2 className="text-4xl font-bold mb-4">TASTE TRIOS</h2>
          <p className="text-lg mb-8">
            Your one-stop solution for modern web design and development.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard featureName="Pan-try It Out" description="This app let's you find recepies based on the ingredients you have around" featureRoute="/Pan-tryItOut" icon={FaSearch} />
            <FeatureCard featureName="Mix & Max" description="Given a list of the ingredients you have, this app can suggest which ingredients to buy to maximize the number of recipes you can make" featureRoute="/Mix&Max" icon={FaCartArrowDown} />
          </div>
        </div>
      </section>
    </div>
  );
}
