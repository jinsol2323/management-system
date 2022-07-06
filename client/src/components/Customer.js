import React from "react";
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CustomerDelete from "./CustomerDelete";



class Customer extends React.Component{
    render() {
        return(
            <TableRow>
                <TableCell align='center'>{this.props.id}</TableCell>
                <TableCell align='center'><img width='85rem' src={this.props.image} alt="profile"/></TableCell>
                <TableCell align='center'>{this.props.name}</TableCell>
                <TableCell align='center'>{this.props.birthday}</TableCell>
                <TableCell align='center'>{this.props.gender}</TableCell>
                <TableCell align='center'>{this.props.job}</TableCell>
                <TableCell align='center'><CustomerDelete stateRefresh={this.props.stateRefresh} id={this.props.id}/></TableCell>
            </TableRow>
        )
    }
}


// class CustomerPtofile extends React.Component{
//     render() {
//         return(
//             <div>
//                 <img src={this.props.image} alt="profile"/>
//                 <h2>{this.props.name}({this.props.id})</h2>
//             </div>
//         )
//     }
// }


// class CustomerInfo extends React.Component{
//     render() {
//         return(
//             <div>
//                 <p>{this.props.birthday}</p>
//                 <p>{this.props.gender}</p>    
//                 <p>{this.props.job}</p>
//             </div>
//         )
//     }
// }

export default Customer;