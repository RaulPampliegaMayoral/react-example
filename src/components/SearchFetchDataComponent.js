import React from 'react';
import SearchDataResultComponent from "./SearchDataResultComponent";
import {API,AUTH} from "../config";

class SearchFetchDataComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isFetching : false, data: []};

        //this.fetchData = this.fetchDataMocked;
        this.fetchData    = this.fetchRemoteData;
        this.handleClick  = this.handleClick.bind(this);
    }

    handleClick(event) {

        ///comprobamos que se ha elejido correctamente el hotel
        let error = [];
        if( !this.props.hotel || this.props.hotel == -1)
            error.push("Se debe elejir un hotel para poder realizar la búsqueda");

        ///comprobamos el número máximo de noches de hotel
        if( !this.props.nights || this.props.nights < 1 || this.props.nights > 30)
            error.push("El rango de estancia válido es entre 1-30 noches");

        ///comprobamos que la fecha sea correcta
        if( !this.props.date  )
            error.push("Fecha introducida no válida");

        ///Si los datos a procesar no son correctos, mostramos los errores
        if( error.length > 0 )
        {
            this.setState({ isFetching : false, data: []});
            alert(error.join("\n"));
            return; 
        }

        ///Si todo ha ido bien obtenemos los datos        
        this.setState({ isFetching : true, data: []});
        this.fetchData(this.props.hotel, this.props.date, this.props.nights);
    }

    render = () => {
        return (
            <div className="search-content"> 
                <button className="btn btn-primary mb-2" onClick={this.handleClick}>SEARCH</button>
                <SearchDataResultComponent result = {this.state} />
            </div>
        );
    };

    fetchDataMocked = (hotel, date, nights) =>  {

        this.setState({ isFetching : false, 
                        data : [
                        {
                            "hotelId": 10030559,
                            "rateCode": "19867|120570b0|0",
                            "roomTypeId": 19867,
                            "roomName": "Habitación Twin",
                            "boardCode": "RO",
                            "boardName": "Sólo alojamiento",
                            "occupancy": {
                                "numAdults": 2,
                                "numChilds": 0,
                                "numBabies": 0
                            },
                            "occupationDescription": "2 personas",
                            "currency": "EUR",
                            "netPrice": "205.46",
                            "tax": "20.54",
                            "cityTax": "0.00",
                            "creditCardRequired": true,
                            "promoRate": false,
                            "cancellable": true,
                            "cancellationDeadLine": "2019/12/30 12:00:00 CET",
                            "payment": {
                                "paymentType": "DIRECT_PAYMENT_AT_CHECKOUT",
                                "paymentMethods": [
                                    "CARD"
                                ]
                            }
                        },
                        {
                            "hotelId": 10030559,
                            "rateCode": "19867|120570b0|1|41836",
                            "roomTypeId": 19867,
                            "roomName": "Habitación Twin",
                            "offerId": "41836",
                            "offerName": "20% DESCUENTO EN EL DESAYUNO BUFFET",
                            "boardCode": "BB",
                            "boardName": "Desayuno incluido",
                            "occupancy": {
                                "numAdults": 2,
                                "numChilds": 0,
                                "numBabies": 0
                            },
                            "occupationDescription": "2 personas",
                            "currency": "EUR",
                            "netPrice": "243.28",
                            "tax": "24.32",
                            "cityTax": "0.00",
                            "creditCardRequired": true,
                            "promoRate": false,
                            "cancellable": true,
                            "cancellationDeadLine": "2019/12/30 12:00:00 CET",
                            "payment": {
                                "paymentType": "DIRECT_PAYMENT_AT_CHECKOUT",
                                "paymentMethods": [
                                    "CARD"
                                ]
                            }
                        }
                    ]
            });
    };

    fetchRemoteData = (hotel, date, nights) => {
        const parameters = `?hotelId=${hotel}&checkin=${date.toLocaleDateString('es-ES')}&nights=${nights}&lang=es`;
        fetch(API + parameters, {
            headers: new Headers({"Authorization": `Basic ${AUTH}`})
          }).then(response => {
            if (!response.ok) throw new Error(response.status);
            return response.json();
          }).then(data => {
              if( data.hasOwnProperty('availableRates') && data.availableRates.hasOwnProperty(hotel) )
                   this.setState({isFetching : false, data : data.availableRates[hotel]});
              else this.setState({isFetching : false, data : []});
          }).catch(error => {
              this.setState({isFetching : false, data : []});
              alert(error);
          });
    };
}

export default SearchFetchDataComponent;
