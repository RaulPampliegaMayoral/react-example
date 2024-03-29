import React from 'react';
import BootstratTable from 'react-bootstrap-table-next';

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

function occupancyFormatter(cell, row) {
  return (
    <label>
      <span>{cell.numAdults} adultos</span>
      <span data-visible="accommodation">&nbsp;·&nbsp;</span>
      <span>{cell.numChilds} niños</span>
      <span data-visible="accommodation">&nbsp;·&nbsp;</span>
      <span>{cell.numChilds} bebes</span>
    </label>
  )
}

const columns = [
  {
    dataField: 'roomName',
    text: 'Habitación'
  },
  {
    dataField: 'offerName',
    text: 'Oferta'
  },
  {
    dataField: 'boardName',
    text: 'Régimen'
  },
  {
    dataField: 'occupancy',
    text: 'Ocupación',
    formatter : occupancyFormatter,    
  }, 
  {
    dataField: 'netPrice',
    text: 'Precio',
    sort: true
  },
  {
    dataField: 'currency',
    text: ''
  }];

  const sortOption = {
    // No need to configure sortFunc per column
    sortFunc: (a, b, order, dataField) => {
      ///Quitamos la ',' al valor para poder hacer una ordenación correcta
      const valueA = Number(a.replace(/(,)/g,""));
      const valueB = Number(b.replace(/(,)/g,""));

      if (order === 'asc') {
        return valueA- valueB; // asc
      }

      return valueB- valueA; // asc
    }
  };

  const defaultSorted = [
    { dataField: "netPrice", order: "asc" }
  ];

const SearchDataResultComponent = (props) => {
    if( props.result.isFetching )
      return (<div id="search-results">Loading....</div>);
      

    return(
        <div id="search-results">
            <BootstratTable 
                keyField='rateCode'
                data={props.result.data}
                columns={columns}
                bordered={ false }
                defaultSorted={defaultSorted}
                sort={ sortOption }
                striped
                hover
                condensed
                noDataIndication="Lo sentimos, no hay tarifas disponibles"
            />
        </div>

    );
}

export default SearchDataResultComponent;