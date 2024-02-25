import React from "react";
import { useState, useEffect } from "react";
import "./filter.css";

const Filter = ({chooseFilter, scroll}) =>{
      const [filters, setFilters] = useState({
        category: '',
        value: ''
      });
      const [values, setValues] = useState();
      const [error, setError] = useState(null);

      const handleCategoryChange = (event) => {
        setFilters({ ...filters, category: event.target.value });
        chooseFilter(event.target.value);
      };
    
      const handleValueChange = (event) => {
        setFilters({ ...filters, value: event.target.value });
      };

      useEffect(() => {
        fetchValues();
      }, [filters.category]);

      const fetchValues = async () => {
        try {
          const flag = filters.category.toLowerCase(); // Or any other value you want to pass
          const response = await fetch(`/filter/${flag}`);
          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
          const jsonData = await response.json();
          setValues(jsonData);
        } catch (error) {
          setError('Failed to fetch data');
          console.error('Error fetching data:', error);
        }
      };

    return(
        <div className="filter">
            <h2>VDashboard</h2>
            <div className="sidebar-content">
        <h3>Filters</h3>
        <div className="filter-section">
          <label htmlFor="category">Category:</label>
          <input list="categories" id="category" onChange={handleCategoryChange} value={filters.category} />
          <datalist id="categories">
            <option value="Country"></option>
            <option value="Sector"></option>
            <option value="Topic"></option>
          </datalist>
        </div>
        <div className="filter-section">
          <label htmlFor="value">Value:</label>
          <input list="values" id="value" onChange={handleValueChange} value={filters.value}/>
          <datalist id="values">
            <option value="">Select</option>
                {values && values.map((option, index) => (
                  <option key={index} value={option[(filters.category).toLowerCase()]}>{option[(filters.category).toLowerCase()]}</option>
                ))}
          </datalist>
          {/* <select id="price" onChange={handleValueChange}>
            <option value="">Select</option>
              {values && values.map((option, index) => (
                <option key={index} value={option[filters.category]}>{option[filters.category]}</option>
              ))}
          </select> */}
        </div>
      </div>
        </div>
    )
}

export default Filter;