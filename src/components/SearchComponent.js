import React from "react";

import SearchFilterDataComponent from "./SearchFilterDataComponent";
import SearchFetchDataComponent from "./SearchFetchDataComponent";


class SearchComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hotel : -1, date: new Date(), nights : 1}

        this.handleNightsChange = this.handleNightsChange.bind(this);
        this.handleHotelChange  = this.handleHotelChange.bind(this);
    }

    datePickerHandleChange = startDate => {
        this.setState({ date : startDate});
    }

    handleHotelChange = hotel =>  {
        this.setState({ hotel : hotel });
    }

    handleNightsChange = nights => {
        this.setState({ nights : nights });
    }

    render() {
        return (
            <div>
                <SearchFilterDataComponent
                    hotel              = {this.state.hotel}
                    date               = {this.state.date}
                    nights             = {this.state.nights}
                    onHotelChange      = {this.handleHotelChange}
                    onNightsChange     = {this.handleNightsChange}
                    onDatePickerChange = {this.datePickerHandleChange}
                />

                <SearchFetchDataComponent 
                    hotel   = {this.state.hotel}
                    date    = {this.state.date}
                    nights  = {this.state.nights}
                />
            </div>
        );
    }
}

export default SearchComponent;