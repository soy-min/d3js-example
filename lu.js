(function () {
    // set the dimensions and margins of the graph
    var margin = { top: 10, right: 30, bottom: 30, left: 100 },
        width = 460 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#left-up")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    // Parse the Data
    d3.csv("lu_data.csv").then(function (data) {

        // X axis
        var x = d3.scaleLinear()
            .domain([0, d3.max(data, function (d) { return +d.value; })])
            .range([0, width]);
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        // Add Y axis
        var y = d3.scaleBand()
            .range([height, 0])
            .domain(data.map(function (d) { return d.name; }))
            .padding(1);
        svg.append("g")
            .call(d3.axisLeft(y));

        // Add the lollipops
        svg.selectAll("myline")
            .data(data)
            .enter()
            .append("line")
            .attr("x1", x(0))
            .attr("x2", function (d) { return x(d.value); })
            .attr("y1", function (d) { return y(d.name); })
            .attr("y2", function (d) { return y(d.name); })
            .attr("stroke", "grey")
            .style("width", 40)

        // Add the circles
        svg.selectAll("mycircle")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", function (d) { return x(d.value); })
            .attr("cy", function (d) { return y(d.name); })
            .attr("r", "7")
            .style("fill", "#69b3a2")
            .attr("stroke", "black")
    });



})();