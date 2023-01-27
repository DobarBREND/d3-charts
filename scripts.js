let width = 600;
let height = 300;

let dataset = [ 5, 10, 15, 20, 25, 30, 35, 40, 45, 50,
                43, 40, 32, 29, 22, 18, 13, 11, 8, 6 ];

//ordinal scale

let xScale = d3.scaleBand()
    .domain(d3.range(dataset.length))
    .rangeRound([0, width])
    .paddingInner(0.06);
	

let yScale = d3.scaleLinear()
    .domain([0, d3.max(dataset)])
    .range([0, height - 35]);

//svg canvas

let svg = d3.select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

//bars

svg.selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("x", function(d,i) {
        return xScale(i);
    })
    .attr("y", function(d) {
        return height - yScale(d);
    })
    .attr("width", xScale.bandwidth())
    .attr("height", function(d) {
        return yScale(d);
    })
    .attr("fill", "orange");
    
//labels

svg.selectAll("text")
    .data(dataset)
    .enter()
    .append("text")
    .text(function(d) {
        return d;
    })
    .attr("x", function(d,i) {
        return xScale(i) + xScale.bandwidth() / 2;
    })
    .attr("y", function(d) {
        return height - yScale(d) - 16;
    })
    .attr("font-family", "Arial")
    .attr("font-size", "18px")
    .attr("fill", "lightgreen")
    .attr("text-anchor", "middle");

    d3.selectAll("text").style("fill", function(d, i) {
        return i % 2 ? "lightgreen" : "lightgray";
      });

 
//transition

d3.select("body").transition()
    .style("background-color", "white")
    .delay(1000)
    .duration(5500);

d3.select("h1").transition()
    .style("color", "orange")
    .delay(1000)
    .duration(5500);

//sidebar

