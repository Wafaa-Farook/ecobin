import React from "react";

const EarnPoints = ({ onEarnPoints }) => {
  const actions = [
    { name: "Recycled Plastic", points: 10 },
    { name: "Used Public Transport", points: 15 },
    { name: "Saved Electricity", points: 20 },
    { name: "Reduced Water Usage", points: 12 },
    { name: "Planted a Tree", points: 30 },
    { name: "Used Reusable Bags", points: 8 },
    { name: "Reduced Food Waste", points: 18 },
    { name: "Used a Bicycle", points: 20 },
    { name: "Participated in a Cleanup Drive", points: 25 },
    { name: "Composted Organic Waste", points: 15 },
    { name: "Switched to LED Bulbs", points: 10 },
    { name: "Reduced Screen Time", points: 5 },
    { name: "Carpooled with Others", points: 12 },
    { name: "Bought Local Products", points: 10 },
    { name: "Conserved Fuel Usage", points: 20 }
  ];

  return (
    <div>
      <h3>Earn Points for Sustainable Actions 🌿</h3>
      <ul>
        {actions.map((action, index) => (
          <li key={index}>
            <button onClick={() => onEarnPoints(action.points)}>
              {action.name} (+{action.points} pts)
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EarnPoints; // ✅ This should be at the top level, not inside any function or block
