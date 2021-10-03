// Data File Path
const data_file = "../code/data/samples.json";

function optionChanged() {


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

  
    //let dataset_index = 0;
    // Use D3 to select the dropdown menu
    var dropdownMenu = d3.select("#selDataset"); 

    // Assign the value of the dropdown menu option to a variable
    var dataset_index = dropdownMenu.property("value");
    console.log(dataset_index) 
    x = data.samples[dataset_index].sample_values.slice(0,10).reverse();
    y = data.samples[dataset_index].otu_ids.slice(0,10).reverse();
    t = data.samples[dataset_index].otu_labels;
    for (i in y) {y[i] = "OTU "+y[i]};
    console.log(x)
    console.log(y)

  
  //individual's metadata object
  metadata = data.metadata[dataset_index]
  meta_keys = Object.keys(metadata)
  meta_values = Object.values(metadata)

  console.log(meta_keys)
  console.log(meta_values)
  
  d3.select("#sample-metadata").html("")
  for (i in meta_keys) {d3.select("#sample-metadata").append("p").append("span").text(`${meta_keys[i]}: ${meta_values[i]}`)}

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
      y: data.samples[dataset_index].sample_values,
      x: data.samples[dataset_index].otu_ids,
      mode: "markers",
      marker:{
        size: data.samples[dataset_index].sample_values,
        color: data.samples[dataset_index].otu_ids,
      },
      text: data.samples[dataset_index].otu_labels,
      };

    let bar_data = [bar_trace]
    let bubble_data = [bubble_trace]


    Plotly.newPlot("bar", bar_data);
    Plotly.newPlot("bubble", bubble_data);

  })



}





document.addEventListener("DOMContentLoaded", function() {
  optionChanged()
});



  

  