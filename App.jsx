import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const name = 'App';
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(''); // State for the filter text

  useEffect(() => {
    async function fetchPublicApis() {
      try {
        const response = await axios.get('https://api.publicapis.org/entries');
        console.log("Public APIs:", response.data);
      } catch (error) {
        console.log("Error fetching Public APIs:", error.message);
      }
    }
    
    async function fetchCatFact() {
      try {
        const response = await axios.get('https://catfact.ninja/fact');
        console.log("Cat Fact:", response.data);
      } catch (error) {
        console.log("Error fetching Cat Fact:", error.message);
      }
    }
    
    async function fetchBitcoinPrice() {
      try {
        const response = await axios.get('https://api.coindesk.com/v1/bpi/currentprice.json');
        console.log("Bitcoin Price Index:", response.data);
      } catch (error) {
        console.log("Error fetching Bitcoin Price Index:", error.message);
      }
    }
    
    async function fetchRandomActivity() {
      try {
        const response = await axios.get('https://www.boredapi.com/api/activity');
        console.log("Random Activity:", response.data);
      } catch (error) {
        console.log("Error fetching Random Activity:", error.message);
      }
    }
    
    async function fetchPredictedAge(name) {
      try {
        const response = await axios.get(`https://api.agify.io?name=${name}`);
        console.log(`Predicted Age for ${name}:`, response.data);
      } catch (error) {
        console.log("Error fetching Predicted Age:", error.message);
      }
    }
    
    async function fetchPredictedGender(name) {
      try {
        const response = await axios.get(`https://api.genderize.io?name=${name}`);
        console.log(`Predicted Gender for ${name}:`, response.data);
      } catch (error) {
        console.log("Error fetching Predicted Gender:", error.message);
      }
    }
    
    async function fetchPredictedNationality(name) {
      try {
        const response = await axios.get(`https://api.nationalize.io?name=${name}`);
        console.log(`Predicted Nationality for ${name}:`, response.data);
      } catch (error) {
        console.log("Error fetching Predicted Nationality:", error.message);
      }
    }
    
    async function fetchUSPopulationData() {
      try {
        const response = await axios.get('https://datausa.io/api/data?drilldowns=Nation&measures=Population');
        console.log("US Population Data:", response.data);
      } catch (error) {
        console.log("Error fetching US Population Data:", error.message);
      }
    }
    
    async function fetchRandomDogImage() {
      try {
        const response = await axios.get('https://dog.ceo/api/breeds/image/random');
        console.log("Random Dog Image:", response.data);
      } catch (error) {
        console.log("Error fetching Random Dog Image:", error.message);
      }
    }
    
    async function fetchIpAddress() {
      try {
        const response = await axios.get('https://api.ipify.org?format=json');
        console.log("IP Address:", response.data);
      } catch (error) {
        console.log("Error fetching IP Address:", error.message);
      }
    }
    
    async function fetchIpInfo(ip) {
      try {
        const response = await axios.get(`https://ipinfo.io/${ip}/geo`);
        console.log(`IP Info for ${ip}:`, response.data);
      } catch (error) {
        console.log("Error fetching IP Info:", error.message);
      }
    }
    
    async function fetchRandomJoke() {
      try {
        const response = await axios.get('https://official-joke-api.appspot.com/random_joke');
        console.log("Random Joke:", response.data);
      } catch (error) {
        console.log("Error fetching Random Joke:", error.message);
      }
    }
    
    async function fetchRandomUser() {
      try {
        const response = await axios.get('https://randomuser.me/api/');
        console.log("Random User:", response.data);
      } catch (error) {
        console.log("Error fetching Random User:", error.message);
      }
    }
    
    async function fetchUniversitiesByCountry(country) {
      try {
        const response = await axios.get(`http://universities.hipolabs.com/search?country=${country}`);
        console.log(`Universities in ${country}:`, response.data);
      } catch (error) {
        console.log("Error fetching Universities:", error.message);
      }
    }
    
    async function fetchZipCodeInfo(zipCode) {
      try {
        const response = await axios.get(`https://api.zippopotam.us/us/${zipCode}`);
        console.log(`ZIP Code Info for ${zipCode}:`, response.data);
      } catch (error) {
        console.log("Error fetching ZIP Code Info:", error.message);
      }
    }
    
    // Example calls
    fetchPublicApis();
    fetchCatFact();
    fetchBitcoinPrice();
    fetchRandomActivity();
    fetchPredictedAge('John');
    fetchPredictedGender('Alice');
    fetchPredictedNationality('Nathaniel');
    fetchUSPopulationData();
    fetchRandomDogImage();
    fetchIpAddress();
    fetchIpInfo('161.185.160.93');
    fetchRandomJoke();
    fetchRandomUser();
    fetchUniversitiesByCountry('United States');
    fetchZipCodeInfo('33162');
    
  }, []);

  // Filter the data based on the input value
  const filteredData = data.filter((item) =>
    item.name?.toLowerCase().includes(filter.toLowerCase()) // Filter by 'name'
  );

  return (
    <div>
      {/* Input field for filtering */}
      <input
        type="text"
        placeholder="Filter by name..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />

      {/* Filtered table */}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Alpha Two Code</th>
            <th>Country</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.alpha_two_code}</td>
              <td>{item.country}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
