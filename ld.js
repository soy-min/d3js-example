(function () {
    // set the dimensions and margins of the graph
    var margin = { top: 10, right: 30, bottom: 30, left: 60 },
        width = 460 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#left-down")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    // initialize the chart with the first data file
    loadData("ld_data1.csv");

    // load the data and create the chart
    function loadData(filename) {
        d3.csv(filename, function (d) {
            return {
                date: d3.timeParse("%Y-%m-%d")(d.date),
                y: +d.y
            };
        }).then(function (data) {

            // X axis
            var x = d3.scaleTime()
                .domain(d3.extent(data, function (d) { return d.date; }))
                .range([0, width]);
            svg.append("g")
                .attr('transform', 'translate(0,' + height + ')') // Move the axis to the bottom
                .call(d3.axisBottom(x)).selectAll("text")
                .attr("y", 0)
                .attr("x", 9)
                .attr("dy", ".35em")
                .attr("transform", "rotate(-45)")
                .style("text-anchor", "start");

            // Y axis
            var y = d3.scaleLinear()
                .domain([0, d3.max(data, function (d) { return +d.y; })])
                .range([height, 0]);
            svg.append("g")
                .call(d3.axisLeft(y));

            // line
            svg.append("path")
                .datum(data)
                .attr("fill", "none")
                .attr("stroke", "steelblue")
                .attr("stroke-width", 1.5)
                .attr("d", d3.line()
                    .x(function (d) { return x(d.date) })
                    .y(function (d) { return y(d.y) })
                );

            // dots
            svg.selectAll("dot")
                .data(data)
                .enter()
                .append("circle")
                .attr("cx", function (d) { return x(d.date) })
                .attr("cy", function (d) { return y(d.y) })
                .attr("r", 3)
                .attr("fill", "steelblue");
        });
    }

    // listen for changes to the data selection and update the chart
    d3.select("#ld_dataSelect").on("change", function () {
        var filename = d3.select(this).property("value");
        svg.selectAll("*").remove(); // clear the chart
        loadData(filename); // load the new data and create the chart
    });


})();