import React from "react";
import axios from "axios"

import EventComponent from "../EventInfo/EventInfo";
import { getToken } from "../../authentication/auth";

class EventList extends React.Component {
    state = {
        events: []
    }

    componentDidMount() {
        axios.defaults.headers = {
            Authorization: getToken(),
            'EventType': 'all'
        }
        axios.get('http://127.0.0.1:8000/api/myevents/')
            .then(response => {
                this.setState({
                    events: response.data
                })
            })
    }

    render() {
        return (
            <>
                {this.state.events.map((data, i) => (
                    <EventComponent
                        key={i}
                        id={data.id}
                        title={data.name}
                        creator={data.creator.first_name + " " + data.creator.last_name}
                        eventType={data.category}
                        image={data.image != null ? require('/Users/bram/Documents/3BA/Web Technologies/Project/GoOut/backend/' + data.image.substring(1)) : require(`../../images/Logo.png`)}
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