// Data File Path
const data_file = "../code/data/samples.json";

// Fetch the JSON data and console log it
  main_data = d3.json(data_file).then(function(data) {
    console.log(data);

    var samples = data.samples
    console.log(samples)

    let x = [];
    let y = [];

    for (i in samples) {
      d3.select("select").append("option").attr("value", i).text(samples[i]["id"]);
    };

    x = data.samples[0].sample_values.slice(0,10).reverse();
    y = data.samples[0].otu_ids.slice(0,10).reverse();
    t = data.samples[0].otu_labels;
   // for (i in y) {y[i] = "OTU "+y[i]};
    console.log(x)
    console.log(y)

    // Display the default plot
    var bar_trace = {
      x: x,
      y: y,
      name:"Bar",
      text: t,
      type: "bar",
      orientation:"h"
    };

    var bubble_trace = {
      x: y,
      y: x,
      mode: "markers",
      marker:{
      size: x,
      color: y
      },
      text: t,
      };

    let bar_data = [bar_trace]
    let bubble_data = [bubble_trace]


    Plotly.newPlot("bar", bar_data);
    Plotly.newPlot("bubble", bubble_data);

  })

  function optionChanged() {
    
    // Use D3 to select the dropdown menu
    var dropdownMenu = d3.select("#selDataset"); 
  
    // Assign the value of the dropdown menu option to a variable
    var dataset = dropdownMenu.property("value");
    console.log(dataset)

  

  }