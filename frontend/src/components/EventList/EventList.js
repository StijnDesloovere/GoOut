import React from "react";
import axios from "axios"

import EventComponent from "../EventInfo/EventInfo";

class EventList extends React.Component {
    state = {
        events: []
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/events/')
            .then(response => {
                this.setState({
                    events: response.data
                })
            }
            )
    }

    render() {
        return (
            <>
                {this.state.events.map((data, i) => (
                    <EventComponent
                        key={i}
                        title={data.name}
                        creator="PATRICK"
                        eventType={data.category}
                        image="Pat"
                        location={data.location}
                        date={data.date}
                        startTime={data.startTime}
                        endTime={data.endTime}
                        description={data.description}
                        friendsGoing={5}
                        friendsInterested={5}
                    />
                ))}
            </>
        )
    }
}

export default EventList