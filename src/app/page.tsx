"use client"; // This is a client component
import { FeatureCard } from "./Components/FeatureCard";
import { FaSearch } from "react-icons/fa";
import { FaCartArrowDown } from "react-icons/fa";
import { TbBrandGoogleBigQuery } from "react-icons/tb";

export default function Home() {
  return (
    <div className="bg-black min-h-screen">
      <section className="flex items-center justify-center text-center text-white py-20">
        <div>
          <h2 className="text-4xl font-bold mb-4">TASTE TRIOS</h2>
          <p className="text-lg mb-8">
            Your one-stop solution for modern web design and development.
          </p>
          <div className="flex flex-wrap flex-row justify-center gap-6">
            <FeatureCard featureName="Pan-try It Out" description="This app lets you find recipes based on the ingredients you have around" featureRoute="/Pan-tryItOut" icon={FaSearch} />
            <FeatureCard featureName="Mix & Max" description="Given a list of the ingredients you have, this app can suggest which ingredients to buy to maximize the number of recipes you can make" featureRoute="/Mix&Max" icon={FaCartArrowDown} />
            <FeatureCard featureName="Elastic Search Queries" description="This app lets you see the result of the queries we defined for Elastic Search" featureRoute="/ElasticSearchQueries" icon={TbBrandGoogleBigQuery} />
          </div>
        </div>
      </section>
    </div>
  );
}
