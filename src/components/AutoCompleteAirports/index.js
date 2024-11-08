import React, { useState, useEffect, useRef } from 'react';
import Fuse from 'fuse.js';
import 'components/AutoCompleteAirports/style/style.css';
import airports from "components/AutoCompleteAirports/data/airports.json";
import FormField from "components/FormField";

const AutoCompleteAirports = React.forwardRef(({ ...otherProps }, ref) => {
  const options = {
    shouldSort: true,
    threshold: 0.4,
    maxPatternLength: 32,
    keys: [
      { name: 'IATA', weight: 0.5 },
      { name: 'name', weight: 0.3 },
      { name: 'city', weight: 0.2 },
    ],
  };

  const fuse = new Fuse(airports, options);

  const [results, setResults] = useState([]);
  const [numResults, setNumResults] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const clearResults = () => {
    setResults([]);
    setNumResults(0);
  };

  const handleSelectIndex = (index) => {
    if (results.length >= index + 1 && ref?.current) {
      ref.current.value = results[index].item.IATA;
      clearResults();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.which) {
        case 38: // up
          setSelectedIndex((prevIndex) => (prevIndex <= -1 ? -1 : prevIndex - 1));
          break;
        case 13: // enter
          handleSelectIndex(selectedIndex);
          break;
        case 9: // tab
          handleSelectIndex(selectedIndex);
          e.stopPropagation();
          return;
        case 40: // down
          setSelectedIndex((prevIndex) => (prevIndex >= numResults - 1 ? numResults - 1 : prevIndex + 1));
          break;
        default:
          return; // exit this handler for other keys
      }
      e.stopPropagation();
      e.preventDefault(); // prevent the default action (scroll / move caret)
    };

    const handleSearch = (e) => {
      if ([38, 13, 40].includes(e.which)) {
        return;
      }

      if (ref?.current?.value?.length > 0) {
        const searchResults = fuse.search(ref.current.value);
        setResults(searchResults.slice(0, 7));
        setNumResults(searchResults.length);
        setSelectedIndex(-1);
      } else {
        setNumResults(0);
        setResults([]);
      }
    };

    if (ref?.current) {
      ref.current.addEventListener('keydown', handleKeyDown);
      ref.current.addEventListener('keyup', handleSearch);
    }

    return () => {
      if (ref?.current) {
        ref.current.removeEventListener('keydown', handleKeyDown);
        ref.current.removeEventListener('keyup', handleSearch);
      }
    };
  }, [fuse, numResults, selectedIndex, ref]);

  return (
    <div className="autocomplete-wrapper">
      <FormField
        type="text"
        onClick={(e) => e.stopPropagation()}
        onFocus={clearResults}
        inputRef={ref} // Pass ref here
        {...otherProps}
      />

      <div className="autocomplete-results" translate="no">
        {results.map((result, i) => (
          <div
            key={i}
            className={`autocomplete-result ${i === selectedIndex ? 'highlighted' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleSelectIndex(i);
            }}
          >
            <div>
              <b>{result.item.iata}</b> - {result.item.name}
            </div>
            <div className="autocomplete-location">
              {result.item.city}, {result.item.country}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

export default AutoCompleteAirports;

