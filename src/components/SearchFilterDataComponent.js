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
        hotels.push(<option selected value="-1">Elije una opción</option>);
        hotels.push(<option value="44069509">Hotel Baqueira Val de Neu</option>);
        hotels.push(<option value="10030559">Hotel Moderno</option>);
        hotels.push(<option value="100376478">Hotel Grand Luxor</option>);
        this.setState({hotels: hotels});
    }

    render() {
        const startDate = this.props.date;
        return (
            <div class="form-inline">
                <div class="form-group mx-sm-3 mb-2">
                    <select class="form-control" value={this.props.hotel} onChange={this.handleHotelChange}>
                        {this.state.hotels}
                    </select>
                </div>
                <div class="form-group mx-sm-3 mb-2">
                <DatePicker 
                        selected={startDate} 
                        onChange={this.datePickerHandleChange}
                        minDate ={new Date()}
                />
                </div>

                <div class="form-group mx-sm-3 mb-2">
                    <input type="text" pattern="[0-9]*" value={this.props.nights} onChange={this.handleNightsChange} />
                </div>
            </div>
        );
    }
}

export default SearchFilterDataComponent;