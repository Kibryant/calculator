import React, { Component } from 'react';
import './Calculator.css';
import Button from '../components/Button';
import Display from '../components/Display';

const initialState = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0
};

export default class Calculator extends Component {

    state = { ...initialState };

    constructor(props) {
        super(props);
        this.clearMemory = this.clearMemory.bind(this);
        this.setOperation = this.setOperation.bind(this);
        this.addDigit = this.addDigit.bind(this);
    };

    clearMemory() {
        console.log('clear...');
        this.setState({ ...initialState });
    };

    setOperation(operator) {
        if (this.state.current === 0) {
            this.setState({ operation: operator, current: 1, clearDisplay: true});
        } else {
            const equalsResolve = operator === '=';
            const currentOperator = this.state.operation;

            const values = [...this.state.values];
            try {
                switch (currentOperator) {
                    case '+': 
                        values[0] = values[0] + values[1];
                        break;
                    case '-': 
                        values[0] = values[0] - values[1];
                        break;
                    case '*': 
                        values[0] = values[0] * values[1];
                        break;  
                    case '/': 
                        values[0] = values[0] / values[1];
                        break;
                    default:
                        break;
                }
            } catch(e) {
                values[0] = this.state.values[0];
            };

            values[1] = 0;

            this.setState({
                displayValue: values[0],
                operation: equalsResolve ? null : operator,
                current: equalsResolve ? 0 : 1,
                clearDisplay: !equalsResolve,
                values
            });
        };
        console.log(operator);
    };
    
    addDigit(anyDigit) {
        if (anyDigit === '.' && this.state.displayValue.includes('.')) {
            return;
        };

        const clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay;
        const currentValue = clearDisplay ? '' : this.state.displayValue;
        const displayValue = currentValue + anyDigit;
        this.setState({ displayValue, clearDisplay: false });

        if (anyDigit !== '.') {
            const indice = this.state.current;
            const newValue = parseFloat(displayValue);
            const values = [...this.state.values];
            values[indice] = newValue;
            this.setState({ values });
            console.log(values);
        };
    };

    render() {
        return (
            <div className='calculator' >
                <Display value={this.state.displayValue} />
                <Button label='AC' click={this.clearMemory} triple />
                <Button label='/' click={this.setOperation} operation />
                <Button label='7' click={this.addDigit} />
                <Button label='8' click={this.addDigit} />
                <Button label='9' click={this.addDigit} />
                <Button label='*' click={this.setOperation} operation />
                <Button label='4' click={this.addDigit} />
                <Button label='5' click={this.addDigit} />
                <Button label='6' click={this.addDigit} />
                <Button label='-' click={this.setOperation} operation />
                <Button label='1' click={this.addDigit} />
                <Button label='2' click={this.addDigit} />
                <Button label='3' click={this.addDigit} />
                <Button label='+' click={this.setOperation} operation />
                <Button label='0' click={this.addDigit} double />
                <Button label='.' click={this.addDigit} />
                <Button label='=' click={this.setOperation} operation />
            </div>
        );
    };
};