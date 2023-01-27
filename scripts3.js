let width3 = 750;
let height3 = 500;

let colors = d3.scaleOrdinal(d3.schemeSet1);

let svgNew3 = d3.select("#bc3-container")
	.append("svg")
	.attr("width", width3)
	.attr("height", height3)
	.style("background-color", "white");
	
let results = [ {grade: "A+", numOfStudents: 8}, {grade: "A", numOfStudents: 26},
				{grade: "B", numOfStudents: 12}, {grade: "C", numOfStudents: 19}, 
				{grade: "D", numOfStudents: 6}, {grade: "F", numOfStudents: 3} ];
				
let dataset3 = d3.pie().sort(null).value(function(d){return d.numOfStudents;})(results);

let segments = d3.arc()
				.innerRadius(0)
				.outerRadius(200)
				.padAngle(0.05)
				.padRadius(50);
				
let sections = svgNew3.append("g")
				.attr("transform", "translate(250, 250)")
				.selectAll("path")
				.data(dataset3);
				
sections.enter()
		.append("path")
		.attr("d", segments)
		.attr("fill", function(d){return colors(d.data.numOfStudents);});
		
/*----------------------------------------------*/
		
let content = svgNew3.select("g")
				.selectAll("text")
				.data(dataset3);
				
content.enter().append("text").classed("inside", true).each(function(d){
			let center = segments.centroid(d);
			d3.select(this)
				.attr("x", center[0])
				.attr("y", center[1])
				.text(d.data.numOfStudents)
				.style("font-size", "20px")
				.style("font-weight", "bold")
				.style("fill", "white")
				.attr('text-anchor', 'middle');
		});

/*----------------------------------------------------*/
		
let legends = svgNew3.append("g").attr("transform", "translate(500, 115)")
				.selectAll(".legends")
				.data(dataset3);
				
		let legend = legends.enter().append("g").classed("legends", true)
						.attr("transform", function(d,i){return "translate(0," + (i+1)*30 + ")";});
						
				legend.append("rect")
						.attr("width", 20)
						.attr("height", 20)
						.attr("fill", function(d){return colors(d.data.numOfStudents);});
						
				legend.append("text").classed("label", true).text(function(d){return d.data.grade;})
						.attr("fill", function(d){return colors(d.data.numOfStudents);})
						.attr("x", 30)
						.attr("y", 20);
				
				
				