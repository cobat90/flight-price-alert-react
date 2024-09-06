import React, { useState, useEffect, useRef } from 'react';
import Fuse from 'fuse.js';
import 'components/AutoCompleteAirports/style/style.css'; // Adjust the path if necessary
import currencies from "components/AutoCompleteCurrencies/data/currencies.json"; // Update the path to your currencies JSON file
import FormField from "components/FormField"; // Adjust the path if necessary

const AutoCompleteCurrencies = React.forwardRef(({ ...otherProps }, ref) => {
  const options = {
    shouldSort: true,
    threshold: 0.4,
    keys: [
      { name: 'code', weight: 0.4 },
      { name: 'name', weight: 0.3 },
    ],
  };

  const fuse = new Fuse(currencies, options);

  const [results, setResults] = useState([]);
  const [numResults, setNumResults] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const clearResults = () => {
    setResults([]);
    setNumResults(0);
  };

  const handleSelectIndex = (index) => {
    if (results.length >= index + 1) {
      ref.current.value = results[index].item['code'];
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
      if (e.which === 38 || e.which === 13 || e.which === 40) {
        return;
      }

      if (ref.current.value.length > 0) {
        const searchResults = fuse.search(ref.current.value);
        setResults(searchResults.slice(0, 7));
        setNumResults(searchResults.length);
        setSelectedIndex(-1);
      } else {
        setNumResults(0);
        setResults([]);
      }
    };

    ref.current.addEventListener('keydown', handleKeyDown);
    ref.current.addEventListener('keyup', handleSearch);

    return () => {
      if (ref.current) {
        ref.current.removeEventListener('keydown', handleKeyDown);
        ref.current.removeEventListener('keyup', handleSearch);
      }
    };
  }, [fuse, results, numResults, selectedIndex]);

  return (
    <div className="autocomplete-wrapper">
      <FormField
        type="text"
        onClick={(e) => e.stopPropagation()}
        onFocus={clearResults}
        inputRef={ref}
        {...otherProps}
      />

      <div className="autocomplete-results">
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
              <b>{result.item.name}</b> - {result.item.code}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

export default AutoCompleteCurrencies;