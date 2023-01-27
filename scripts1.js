const data = [
	{ name: "Vladimir", age: 56},
	{ name: "Gorcin", age: 19 },
	{ name: "Fedor", age: 17 },
	{ name: "Selena", age: 13 },
	{ name: "Senka", age: 47 },
];

const w = 800;
const h = 400;
const margin = { top: 50, bottom: 50, left: 50, right: 50 };

const svgNew = d3.select("#bc1-container")
	.append("svg")
	.attr("height", h - margin.top - margin.bottom)
	.attr("width", w - margin.left - margin.right)
	.attr("viewBox", [0, 0, w, h]);
   
const x = d3.scaleBand()
	.domain(d3.range(data.length))
	.range([margin.left, w - margin.right])
	.padding(0.1);
	
const y = d3.scaleLinear()
	.domain([0, 80])
	.range([h - margin.bottom, margin.top]);

svgNew
	.append("g")
	.attr("fill", "royalblue")
	.selectAll("rect")
	.data(data.sort((a, b) => d3.descending(a.age, b.age)))
	.join("rect")
		.attr("x", (d, i) => x(i))
		.attr("y", (d) => y(d.age))
		.attr("height", (d) => y(0) - y(d.age))
		.attr("width", x.bandwidth())
		.attr("class", "rectangle");
 
//axes 

function xAxis(g) {
	g.attr("transform", `translate(0, ${h - margin.bottom + 10})`)
	.call(d3.axisBottom(x).tickFormat(i => data[i].name))
	.attr("font-size", "20px")
}

function yAxis(g) {
	g.attr("transform", `translate(${margin.left}, 0)`)
	.call(d3.axisLeft(y).tickFormat(null, data.age))
	.attr("font-size", "20px")
}
	

 
svgNew.append("g").call(xAxis);
svgNew.append("g").call(yAxis);
svgNew.node();

