
// Global objects go here (outside of any functions)

let data, scatterplot, barchart;

let difficultyFilter = [];

const dispatcher = d3.dispatch('filterCategories');

/**
 * Load data from CSV file asynchronously and render charts
 */ 

d3.csv('data/vancouver_trails.csv')
   .then(_data => {
     data = _data; // for safety, so that we use a local copy of data.

     // ... data preprocessing etc. ... 
      _data.forEach(d => {
        d.time = +d.time,
        d.distance = +d.distance;
        })

     // Be sure to examine your data to fully understand the code

     console.log(_data);

     // Initialize scale

     const colorScale = d3.scaleOrdinal()
 	      .domain(["Easy", "Intermediate", "Difficult"]) //TODO: What should our domain be? 
        .range(['#97d198','#4fa150', '#124a12']);

     // See Lab 4 for help
     scatterplot = new Scatterplot({parentElement: '#scatterplot', colorScale: colorScale}, data); //we will update config soon
     scatterplot.updateVis();

     barchart = new Barchart({parentElement: '#barchart', colorScale: colorScale}, dispatcher, data);
     barchart.updateVis();
   })
  .catch(error => console.error(error));


/**
 * Use bar chart as filter and update scatter plot accordingly
 */

 // Call global function to update scatter plot
          dispatcher.on('filterCategories', selectedCategories => {
              if (selectedCategories.length == 0) {
                    scatterplot.data = data;
              }  else {
                    scatterplot.data = data.filter(d => 
                    selectedCategories.includes(d.difficulty));
          }
          scatterplot.updateVis();
        })



