import React from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

class SearchFilterDataComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = { hotels : []};

        this.datePickerHandleChange = this.datePickerHandleChange.bind(this);
        this.handleNightsChange = this.handleNightsChange.bind(this);
        this.handleHotelChange  = this.handleHotelChange.bind(this);
    }

    datePickerHandleChange(date) {
        this.props.onDatePickerChange(date);
    }

    handleHotelChange(event) {
        this.props.onHotelChange(event.target.value);
    }

    handleNightsChange(event) {
        const nights = (event.target.validity.valid) ? event.target.value : this.props.nights;
        this.props.onNightsChange(nights);
    }

    componentDidMount() {
        const hotels = [];
        hotels.push(<option key="-1" value="-1">Elije una opción</option>);
        hotels.push(<option key="44069509" value="44069509">Hotel Baqueira Val de Neu</option>);
        hotels.push(<option key="10030559" value="10030559">Hotel Moderno</option>);
        hotels.push(<option key="100376478" value="100376478">Hotel Grand Luxor</option>);
        this.setState({hotels: hotels});
    }

    render() {
        const startDate = this.props.date;
        return (
            <div className="form-inline">
                <div className="form-group mx-sm-3 mb-2">
                    <select className="form-control" value={this.props.hotel} onChange={this.handleHotelChange}>
                        {this.state.hotels}
                    </select>
                </div>
                <div className="form-group mx-sm-3 mb-2">
                <DatePicker 
                        selected={startDate} 
                        onChange={this.datePickerHandleChange}
                        minDate ={new Date()}
                />
                </div>

                <div className="form-group mx-sm-3 mb-2">
                    <input type="text" pattern="[0-9]*" value={this.props.nights} onChange={this.handleNightsChange} />
                </div>
            </div>
        );
    }
}

export default SearchFilterDataComponent;