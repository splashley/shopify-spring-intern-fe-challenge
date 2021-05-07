import React, { useState, useCallback } from "react";
import { Icon, TextField, Autocomplete } from "@shopify/polaris";
import { SearchMinor } from "@shopify/polaris-icons";

// import SearchResults from "./SearchResults/index";
// import NominationList from "./SearchForm/NominationList/index";

export default function SearchForm() {
  const deselectedOptions = [
    { value: "rustic", label: "Rustic" },
    { value: "antique", label: "Antique" },
    { value: "vinyl", label: "Vinyl" },
    { value: "vintage", label: "Vintage" },
    { value: "refurbished", label: "Refurbished" },
  ];

  //  const currentValue = setInputValue(target.)

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState("");
  const [loading, setLoading] = useState(false);

  const updateText = useCallback(
    (value) => {
      setInputValue(value);

      if (!loading) {
        setLoading(true);
      }

      setTimeout(() => {
        if (value === "") {
          setOptions(deselectedOptions);
          setLoading(true);
          return;
        }
        const filterRegex = new RegExp(value, "i");
        const resultOptions = options.filter((option) =>
          option.label.match(filterRegex)
        );
        setOptions(resultOptions);
        setLoading(false);
      }, 300);
    },
    [options, loading]
  );

  const updateSelection = useCallback(
    (selected) => {
      const selectedText = selected.map((selectedItem) => {
        const matchedOption = options.find((option) => {
          return option.value.match(selectedItem);
        });
        return matchedOption && matchedOption.label;
      });
      setSelectedOptions(selected);
      setInputValue(selectedText);
    },
    [options]
  );

  const textField = (
    <Autocomplete.TextField
      onChange={updateText}
      label=""
      value={inputValue}
      prefix={<Icon source={SearchMinor} color="base" />}
      placeholder="Start typing to find movies"
    />
  );

  return (
    <div style={{ height: "225px" }}>
      <Autocomplete
        options={options}
        selected={selectedOptions}
        onSelect={updateSelection}
        loading={loading}
        textField={textField}
        name="movieLookup"
      />
    </div>
  );
}
