import React, { useState } from 'react';
import "./TinderCards.css";
import TinderCard from 'react-tinder-card';

function TinderCards() {
    const [people, setPeople] = useState([{
        name: "Dinesh Tamang",
        url: ""
    },
    {
        name: "Selena Gomez",
        url: ""
    }])

    const swiped = (direction, nameToDelete) => {
        console.log("removing: " + nameToDelete);
    }

    const outofFrame = (name) => {
        console.log(name + " Left the screen!")
    }

  return <div className="tinderCards">
      <div className="tinderCards__cardContainer">
          {people.man((person) =>(
              <TinderCard 
                className="swipe"
                key={person.name}
                preventSwipe={["up", "down"]}
                onSwipe={(dir) => swiped(dir, person.name)}
                onCardLeftScreen={() => outofFrame(person.name)}
              >
                  <div 
                    style={{ backgroundImage: `url(${person.url})` }}
                    className="card"
                  >
                      <h3>{person.name}</h3>
                  </div>
              </TinderCard>
          ))}
      </div>
  </div>;
}

export default TinderCards;
