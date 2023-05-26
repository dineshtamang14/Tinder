import React, { useState, useEffect } from "react";
import "./TinderCards.css";
import TinderCard from "react-tinder-card";
import axios from "./axios";

function TinderCards() {
  const [people, setPeople] = useState([]);
  // console.log(people);
  const url = process.env.REACT_APP_API_URL;

  useEffect(() => {
    async function fetchData() {
      const req = await axios.get("/tinder/cards");
      console.log(req.data);
      setPeople(req.data);
    }

    fetchData();
  }, []);

  const swiped = (direction, nameToDelete) => {
    console.log("removing: " + nameToDelete);
  };

  const outofFrame = (name) => {
    console.log(name + " Left the screen!");
  };

  return (
    <div className="tinderCards">
      <div className="tinderCards__cardContainer">
        {people.map((person) => (
          <TinderCard
            className="swipe"
            key={person.name}
            preventSwipe={["up", "down"]}
            onSwipe={(dir) => swiped(dir, person.name)}
            onCardLeftScreen={() => outofFrame(person.name)}
          >
            <div
              style={{
                backgroundImage: `url(http://${url}/img/${person._id})`,
                // backgroundImage: `url(http://localhost:8000/${person.imageUrl})`,
              }}
              className="card"
            >
              <h3>{person.name}</h3>
            </div>
          </TinderCard>
        ))}
      </div>
    </div>
  );
}

export default TinderCards;
