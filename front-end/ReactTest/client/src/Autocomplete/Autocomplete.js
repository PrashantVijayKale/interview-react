import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { throttle } from "lodash";
import {
  SelectedSuggestion,
  NoSuggestionList,
  SuggestionList
} from "./AutoComplteComponents";

class Autocomplete extends Component {
  static propTypes = {
    suggestions: PropTypes.instanceOf(Array)
  };

  static defaultProps = {
    suggestions: []
  };

  constructor(props) {
    super(props);

    this.state = {
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: ""
    };
    //this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onchange = throttle(this.onChange, 100); //throttle for performance
  }

  //   handleInputThrottled = () => {
  //     console.log('PK---in debounce')
  //     debounce(this.onChange, 10);
  //   }
  // Event fired when the input value is changed
  onChange = e => {
    const userInput = e.currentTarget.value;

    fetch(`/api/countries`)
      .then(res => res.json())
      .then(response => {
        const filteredSuggestions = response.filter(
          suggestion =>
            suggestion.name.toLowerCase().indexOf(userInput.toLowerCase()) > -1
        );

        this.setState({
          activeSuggestion: 0,
          filteredSuggestions,
          showSuggestions: true,
          userInput: userInput
        });
      })
      .catch(() => {
        alert("error fetching data");
      });
  };

  // Event fired when the user clicks on a suggestion
  onClick = e => {
    const selectedCountry = e.currentTarget.innerText;
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      selectedSuggestion: selectedCountry,
      userInput: selectedCountry
    });
  };

  // Event fired when the user presses a key down
  onKeyDown = e => {
    const { activeSuggestion, filteredSuggestions } = this.state;
    if (e.keyCode === 13) {
      this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
        userInput: filteredSuggestions[activeSuggestion].name,
        selectedSuggestion: filteredSuggestions[activeSuggestion].name
      });
    } else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }
      this.setState({ activeSuggestion: activeSuggestion - 1 });
    } else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }
      this.setState({ activeSuggestion: activeSuggestion + 1 });
    }
  };

  render() {
    const {
      state: {
        activeSuggestion,
        filteredSuggestions,
        showSuggestions,
        selectedSuggestion,
        userInput
      }
    } = this;

    return (
      <Fragment>
        <input
          type="text"
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
          value={userInput}
        />
        {showSuggestions && userInput && filteredSuggestions.length > 0 ? (
          <SuggestionList
            filteredSuggestions={filteredSuggestions}
            activeSuggestion={activeSuggestion}
            onClick={this.onClick}
          />
        ) : selectedSuggestion && userInput ? (
          <SelectedSuggestion selectedSuggestion={selectedSuggestion} />
        ) : (
          <NoSuggestionList />
        )}
      </Fragment>
    );
  }
}

export default Autocomplete;
