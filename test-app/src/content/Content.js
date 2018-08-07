import React, { Component } from 'react';
import './Content.css';
import ReactDOM from 'react-dom';
import Counter from '../counter/Counter';
import connect from '../decorators/connect';

@connect((store) => {
   return {
       state: store.getState(),
       store: store
   }
})

class Content extends React.Component {
    constructor() {
        super();
        this.state = {
            data:
                [
                    {
                        "id":1,
                        "name":"Foo",
                        "age":"20"
                    },
                    {
                        "id":2,
                        "name":"Bar",
                        "age":"30"
                    },
                    {
                        "id":3,
                        "name":"Baz",
                        "age":"40"
                    }
                ],
            title: 'Input text '
        };

        this.forceUpdateHandler = this.forceHandler.bind(this);

        this.updateState = this.updateState.bind(this);
    }

    forceHandler() {
        this.forceUpdate();

        // Find Dom Handler
        var btn = document.getElementById('buttonForceUpdate');
        ReactDOM.findDOMNode(btn).style.backgroundColor = 'green';
    };

    updateState(e) {
        this.setState({title: e.target.value});
    }

    render() {
        return (
            <div>
                <input type = "text" value = {this.state.title}
                       onChange = {this.state.updateState} />
                <h3>{this.state.title}</h3>
                <button id="buttonForceUpdate" onClick = {this.forceUpdateHandler}>FORCE UPDATE</button>
                <table>
                    <tbody>
                    {this.state.data.map((person, i) => <TableRow key = {i}
                                                                  value = {person} />)}
                    </tbody>
                </table>

                <Counter
                    value={this.props.state}
                    onIncrement={() => this.props.store.dispatch({ type: 'INCREMENT' })}
                    onDecrement={() => this.props.store.dispatch({ type: 'DECREMENT' })}
                />,
            </div>
        );
    }
}

class TableRow extends Component {
    constructor() {
        super();

    };

    render() {
        return (
            <tr>
                <td>{this.props.value.id}</td>
                <td>{this.props.value.name}</td>
                <td>{this.props.value.age}</td>
                <td>{Math.random()}</td>
            </tr>
        );
    }
}

export default connect()(Content);