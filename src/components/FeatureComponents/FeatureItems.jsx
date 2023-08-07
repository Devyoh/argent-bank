import React from "react";
import featureItemsData from "../../data/featureItemsData";
import FeatureCard from "./FeatureCard/FeatureCard";
import "./featureItems.css"



/**
 * Afficher les composants FeatureCard basé sur les données du tableau featureItemsData.
 *
 * Display FeatureCard components based on data from the featureItemsData array.
 *
 * @component
 */

function FeatureItems() {
  return (
    <div className="feature">
      {featureItemsData.map((item) => (
        <FeatureCard
          key={item.imgSrc}
          imgSrc={item.imgSrc}
          imgAlt={item.imgAlt}
          title={item.title}
        >
          {item.description}
        </FeatureCard>
      ))}
    </div>
  );
}

export default FeatureItems;
