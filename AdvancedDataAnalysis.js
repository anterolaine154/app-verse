// Filename: AdvancedDataAnalysis.js

// This code performs advanced data analysis on a dataset of movie ratings.

// Imports the necessary libraries
const fs = require('fs');
const math = require('mathjs');
const regression = require('regression');

// Loads the dataset into memory
const rawData = fs.readFileSync('movie_ratings.csv', 'utf8');
const data = rawData.split('\n').map(row => row.split(','));

// Extracts the necessary columns from the dataset
const movieTitles = data.map(row => row[0]);
const ratings = data.map(row => row.slice(1).map(parseFloat));

// Calculates the average rating for each movie
const averageRatings = ratings.map(rating => math.mean(rating));

// Calculates the overall average rating across all movies
const overallAverageRating = math.mean(averageRatings);

// Calculates the standard deviation of ratings for each movie
const ratingStdDevs = ratings.map(rating => math.std(rating));

// Finds the top 10 movies with the highest average ratings
const topMovies = averageRatings
  .map((rating, index) => ({ rating, index }))
  .sort((a, b) => b.rating - a.rating)
  .slice(0, 10);

// Calculates the correlation between pairs of movies
const correlationCoefficients = [];
for (let i = 0; i < ratings.length - 1; i++) {
  for (let j = i + 1; j < ratings.length; j++) {
    const correlationCoefficient = math.correlation(ratings[i], ratings[j]);
    correlationCoefficients.push({
      moviePair: [movieTitles[i], movieTitles[j]],
      correlationCoefficient,
    });
  }
}

// Fits a linear regression model to predict ratings based on other features
const regressionInputs = ratings.map((rating, index) => [
  averageRatings[index],
  ratingStdDevs[index],
]);
const regressionTargets = averageRatings.slice();
const result = regression.linear(regressionInputs, regressionTargets);

// Saves the results to a file
const resultData = {
  movieTitles,
  averageRatings,
  overallAverageRating,
  ratingStdDevs,
  topMovies,
  correlationCoefficients,
  regression: {
    equation: result.equation,
    rSquared: result.rSquared,
  },
};
fs.writeFileSync('analysis_results.json', JSON.stringify(resultData));

console.log('Data analysis completed and results saved to analysis_results.json.');
