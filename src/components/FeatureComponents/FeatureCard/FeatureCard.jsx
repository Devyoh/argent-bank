import React from "react";
import "./featureCard.css"

const FeatureCard = ({ imgSrc, imgAlt, title, children }) => {
  return (
    <div className="feature-item">
      <img className="feature-icon" src={imgSrc} alt={imgAlt} />
      <h2 className="feature-item-title">{title}</h2>
      <p>{children}</p>
    </div>
  );
};

export default FeatureCard;
