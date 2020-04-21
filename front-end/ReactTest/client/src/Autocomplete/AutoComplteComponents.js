import React from "react";

const SuggestionList = props => {
  return (
    <div className="suggestions-div">
      <ul className="suggestions">
        {props.filteredSuggestions.map((suggestion, index) => {
          let className;

          // Flag the active suggestion with a class
          if (index === props.activeSuggestion) {
            className = "suggestion-active";
          }
          return (
            <li
              className={className}
              key={suggestion.name}
              onClick={props.onClick}
            >
              {suggestion.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const NoSuggestionList = () => {
  return (
    <div className="no-suggestions">
      <em>No suggestions</em>
    </div>
  );
};

const SelectedSuggestion = props => {
  return (
    <div className="selected-suggestion">
      <em>
        selected value is <b>{props.selectedSuggestion}</b>
      </em>
    </div>
  );
};

export { SelectedSuggestion, NoSuggestionList, SuggestionList };
