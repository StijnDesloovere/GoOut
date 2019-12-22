import React from "react";
import MenuBar from "../components/Menu/Menu";
import DetailedEventInfoComponent from "../components/DetailedEventInfo/DetailedEventInfo";

class DetailedEvent extends React.Component {
  componentDidMount() {
    document.title = "Event | GoOut";
  }
  render() {
    return (
      <div>
        <MenuBar />
        <DetailedEventInfoComponent
          title="Jellyfishing"
          creator="Pat"
          eventType="Meetup"
          image="Pat"
          location="Pleinlaan 2, 1050 Elsene"
          date="November 30"
          time="14:00-23:00"
          description="Are ya' ready, kids?
        Aye, aye Captain!
        I can't hear you!
        Aye, aye, captain!
        Ohh!
        
        Who lives in a pineapple under the sea?
        SpongeBob SquarePants!
        Absorbent and yellow and porous is he
        SpongeBob SquarePants!
        If nautical nonsense be something you wish
        SpongeBob SquarePants!
        Then drop on the deck and flop like a fish!
        SpongeBob SquarePants!
        Ready?!
        
        SpongeBob SquarePants!
        SpongeBob SquarePants!
        SpongeBob SquarePants!
        SpongeBob SquarePants!"
          friendsGoing={5}
          friendsInterested={9}
          peopleGoing={250}
          peopleInterested={348}
        />
      </div>
    );
  }
}

export default DetailedEvent;
