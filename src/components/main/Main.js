import React, { Component } from "react";
import { API } from "aws-amplify";

import Mountains from "./Mountains";

const GEO_STATUS = {
    NOT_INITIALIZED: "GEO_STATUS_NOT_INTIALIZED",
    PENDING: "GEO_STATUS_PENDING",
    SUCCESS: "GEO_STATUS_SUCCESS",
    FAILURE: "GEO_STATUS_FAILURE",
}

class Main extends Component {

    state = { lat: 0, lng: 0, status: GEO_STATUS.NOT_INITIALIZED, colour: 0xffffff };

    componentDidMount = () => {
        if (navigator.geolocation) {
            // we have geolocation data
            navigator.geolocation.getCurrentPosition(
                async (pos) => {
                    const { latitude, longitude } = pos.coords;
                    console.log(latitude, longitude);
                    const response = await API.get("timeAPI", `/time/${latitude}/${longitude}`);
                    console.log(response);
                    this.setState({ status: GEO_STATUS.SUCCESS, lat: latitude, lng: longitude, colour: 0xaf3f9f });
                },
                (err) => {
                    console.log("errer!");
                    this.setState({ status: GEO_STATUS.FAILURE });
                },
                {
                    enableHighAccuracy: true,
                    timeout: 5000,
                }
            );
            this.setState({ status: GEO_STATUS.PENDING });
        } else {
            // we don't have geolocation
            this.setState({ status: GEO_STATUS.FAILURE });
        }
    }

    render = () => {
        const { status } = this.state;
        return (
            <div>
                {
                    status === GEO_STATUS.NOT_INITIALIZED ||
                    status === GEO_STATUS.PENDING ? (
                        "Fetching location"
                    ) : status === GEO_STATUS.SUCCESS ? (
                        <Mountains/>
                    ) : (
                        "Something went wrong"
                    )
                }
            </div>
        );
    }
}

export default Main;