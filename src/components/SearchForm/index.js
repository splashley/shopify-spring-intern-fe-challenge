import React, { useState, useCallback } from "react";
import {
  Icon,
  TextField,
  Autocomplete,
  Card,
  List,
  Layout,
} from "@shopify/polaris";
import { SearchMinor } from "@shopify/polaris-icons";
import axios from "axios";

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
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState(deselectedOptions);
  const [loading, setLoading] = useState(false);
  const [movieList, setMovieList] = useState([]);
  const [nominatedMovieList, setNominatedMovieList] = useState([]);

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
    [deselectedOptions, options, loading]
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

  function searchAPI() {
    const searchURL = "http://localhost:3001/api/search";
    axios.post(searchURL, { search: inputValue }).then(function (response) {
      setMovieList(response.data);
    });
  }

  function addNomination(movie) {
    // get movie details, add them to nominatedMovieList, including isNominated property
    if (nominatedMovieList.length === 10) {
      alert("You've reach the limit of nominations");
    } else {
      let i = 0;
      for (i = 0; i < 1; i++) {
        nominatedMovieList.push({
          movie,
          isNominated: true,
          key: nominatedMovieList.length,
        });
        setNominatedMovieList([...nominatedMovieList]);
      }
    }
    console.log(nominatedMovieList);
  }

  function removeNomination(movieDetails) {
    // take moviedetails.movie.key, find same info in nominatedMovieList, remove object all together
    let i = 0;
    let newList;
    for (i = 0; i < nominatedMovieList.length; i++) {
      // Button clicked matches list being iterated
      if (movieDetails.key === nominatedMovieList[i].key) {
        //Copy to new array to not modify the existing arrray while looping /shrugs don't know if real issue
        newList = nominatedMovieList;
        //remove the element the loop is on and only just that element
        newList.splice(i, 1);
        //List should be unique; We know to not search for any others.
        break;
      }
    }
    //Update state with newList which has the movie removed
    setNominatedMovieList([...newList]);
  }

  const textField = (
    <Autocomplete.TextField
      onChange={updateText}
      label="Tags"
      value={inputValue}
      prefix={<Icon source={SearchMinor} color="base" />}
      placeholder="Search"
    />
  );

  return (
    <div>
      <Autocomplete
        options={options}
        selected={selectedOptions}
        onSelect={updateSelection}
        loading={loading}
        textField={textField}
      />
      <button onClick={searchAPI}>Test Search</button>
      <Layout>
        <Layout.Section>
          <Card title="Movie Results" sectioned>
            <List>
              {movieList.map((movie) => {
                return (
                  <List.Item key={movie.imdbID}>
                    {movie.Title}
                    {movie.Year}
                    <button
                      onClick={() => addNomination(movie)}
                      disabled={movie.isNominated}
                    >
                      Nominate
                    </button>
                  </List.Item>
                );
              })}
            </List>
          </Card>
        </Layout.Section>
        <Layout.Section secondary>
          <Card title="Nominated Films" sectioned>
            <List>
              {nominatedMovieList.map((movieDetails) => {
                return (
                  <>
                    <List.Item key={movieDetails.movie.key}>
                      {movieDetails.movie.Title}
                      {movieDetails.movie.Year}
                    </List.Item>
                    <button onClick={() => removeNomination(movieDetails)}>
                      Unnominate
                    </button>
                  </>
                );
              })}
            </List>
          </Card>
        </Layout.Section>
      </Layout>
    </div>
  );
}
