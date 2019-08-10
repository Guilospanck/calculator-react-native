/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
  StatusBar
} from 'react-native';

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      resulText: "",
      calculationText: "",
      fadeAnim: new Animated.Value(1) // the opacity of the elements begin with 1
    };
    this.operations = ["DEL", "/", "*", "-", "+"];
  }

  constructNumberButtons() {
    let rows = [];
    let nums = [[7, 8, 9], [4, 5, 6], [1, 2, 3], [".", 0, "="]];
    for (let i = 0; i < 4; i++) {
      let row = [];
      for (let j = 0; j < 3; j++) {
        row.push(
          <TouchableOpacity key={nums[i][j]} onPress={() => this.onButtonPressed(nums[i][j])} style={styles.btn}>
            <Text style={styles.btnText}>{nums[i][j]}</Text>
          </TouchableOpacity>
        );
      }
      rows.push(
        <View key={i} style={styles.row}>{row}</View>
      );
    }
    return rows;
  }

  constructOperationsButtons() {
    let columns = []
    for (let i = 0; i < 5; i++) {
      let column = [];
      column.push(
        <TouchableOpacity key={this.operations[i]} onPress={() => this.onOperationsPress(this.operations[i])} style={styles.btn}
          delayLongPress={1000} onLongPress={() => this.onLongPressButton(this.operations[i])} >
          <Text style={[styles.btnText, styles.white]}>{this.operations[i] == '*' ? 'x' : this.operations[i]}</Text>
        </TouchableOpacity>
      );
      columns.push(
        <View key={i} style={styles.row}>{column}</View>
      );
    }
    return columns;
  }

  onLongPressButton(operation){
    if(operation == "DEL"){   
      Animated.timing(this.state.fadeAnim, {
        toValue: 0,
        duration: 1500,
        easing: Easing.linear
      }).start();

      this.setState({
        resulText: "",
        calculationText: ""
      });
    }
  }

  onOperationsPress(operation) {
    switch (operation) {
      case "DEL":
        let text = this.state.resulText.split('');
        text.pop();
        this.setState({
          resulText: text.join('')
        });
        break;
      case "+":
      case "-":
      case "*":
      case "/":
        const lastChar = this.state.resulText.split('').pop();

        if (this.operations.indexOf(lastChar) > 0 || lastChar == ".") return

        if (this.state.resulText == "") return
        this.setState({
          resulText: this.state.resulText + operation
        });
    }
  }

  maxIndexOfOperation(hello) {
    let maxIndex = Math.max(hello.lastIndexOf("x"), hello.lastIndexOf("/"), hello.lastIndexOf("+"), hello.lastIndexOf("-"));
    switch (maxIndex) {
      case hello.lastIndexOf("x"):
        return hello.lastIndexOf("x")
      case hello.lastIndexOf("+"):
        return hello.lastIndexOf("+")
      case hello.lastIndexOf("/"):
        return hello.lastIndexOf("/")
      case hello.lastIndexOf("-"):
        return hello.lastIndexOf("-")
    }
  }

  validatingPointSign() {
    let hello = this.state.resulText;
    if (hello.indexOf(".") != -1) { // is there a point? 
      helloSplit = hello.split('');
      let notOperationChar = 0;
      let check = false;
      helloSplit.forEach(element => {
        if (this.operations.indexOf(element) >= 0) { // is there a operation signal?  
          if ((hello.lastIndexOf(".")) > (this.maxIndexOfOperation(hello))) {
            check = true;
            return false;
          }
        }
        if (this.operations.indexOf(element) == -1) notOperationChar++;
      });
      if (notOperationChar == helloSplit.length || check == true) return false;
    }
    return true;
  }


  calculateResult() {
    let text = this.state.resulText;
    this.setState({
      calculationText: eval(text)
    });
  }

  validateEqualSign() {
    let text = this.state.resulText;
    if (text == null) return false;

    let lastChar = text.split('').pop();
    if (this.operations.indexOf(lastChar) != -1) return false;

    return true;
  }

  onButtonPressed(text) {
    if (text == ".") {
      if (!this.validatingPointSign()) return
    }

    if (text == "=") {
      return this.validateEqualSign() && this.calculateResult();
    }

    this.setState({
      resulText: this.state.resulText + text
    });
  }

  componentDidUpdate(){
    this.state.fadeAnim.setValue(1);
  }

  render() {

    let rows = this.constructNumberButtons();
    let columns = this.constructOperationsButtons();

    return (
      <View style={styles.container}>
        <StatusBar barStyle='light-content' backgroundColor='#dadddd'></StatusBar>
        <Animated.View style={[styles.result, {opacity: this.state.fadeAnim}]}>
          <Text style={styles.resulText}>{this.state.resulText}</Text>
        </Animated.View>
        <Animated.View style={[styles.calculation, {opacity: this.state.fadeAnim}]}>
          <Text style={styles.calculationText}>{this.state.calculationText}</Text>
        </Animated.View>
        <View style={styles.buttons}>
          <View style={styles.numbers}>
            {rows}
          </View>
          <View style={styles.operations}>
            {columns}
          </View>
        </View>
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  btn: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  btnText: {
    fontSize: 28,
    color: 'white'
  },
  white: {
    color: 'white'
  },
  result: {
    flex: 2,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  calculation: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  buttons: {
    flex: 7,
    flexDirection: 'row'
  },
  numbers: {
    flex: 3,
    backgroundColor: '#434343',
    color: 'white'
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  operations: {
    flex: 1,
    backgroundColor: '#636363',
    justifyContent: 'space-around',
    alignItems: 'stretch',
    color: 'white'
  },
  resulText: {
    fontSize: 30,
    color: 'black'
  },
  calculationText: {
    fontSize: 24,
    color: 'black'
  }
});
