/*
Filename: ComplexCode.js
Content: Complex and Elaborate JavaScript Code Example
*/

// Importing required modules
const fs = require('fs');
const http = require('http');
const path = require('path');
const { promisify } = require('util');

// Creating a custom class
class ComplexCode {
  constructor() {
    this.data = [];
  }

  // Method to fetch data from an API
  async fetchDataFromAPI() {
    try {
      const response = await fetch('https://api.example.com/data');
      const data = await response.json();
      this.data = data;
      console.log('Data fetched from API:', this.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  // Method to manipulate and process the data
  processData() {
    if (this.data.length === 0) {
      console.warn('No data available to process');
      return;
    }

    // Perform complex data processing operations
    const processedData = this.data.map((item) => item.value.toUpperCase());

    // Save processed data to a file
    this.saveDataToFile(processedData);
  }

  // Method to save processed data to a file
  async saveDataToFile(processedData) {
    try {
      const filePath = path.join(__dirname, 'processedData.txt');
      await promisify(fs.writeFile)(filePath, processedData.join('\n'));
      console.log('Processed data saved to file:', filePath);
    } catch (error) {
      console.error('Error saving data to file:', error);
    }
  }

  // Method to start the HTTP server
  startServer() {
    const server = http.createServer((req, res) => {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Hello, welcome to the ComplexCode server!');
    });

    const port = process.env.PORT || 3000;
    server.listen(port, () => {
      console.log(`Server started and listening on port ${port}`);
    });
  }
}

// Instantiate and use the class
const complexCode = new ComplexCode();
complexCode.fetchDataFromAPI();
complexCode.processData();
complexCode.startServer();

// Export the class for external usage
module.exports = ComplexCode;