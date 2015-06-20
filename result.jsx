var ResultPage = ReactMeteor.createClass({

  templateName: "ResultPage",

  startMeteorSubscriptions: function() {
    Meteor.subscribe("all-conditions");
  },

  getMeteorState: function() {
    return {
      all_conditions: Conditions.find().fetch()
    };
  },

  render: function() {
    return (
      <div>
        <h1>Hello world!</h1>
        <Board data={this.state.all_conditions}/>
      </div>
    );
  }
});

var Board = ReactMeteor.createClass({

	render: function() {
		var margin = {top: 20, right: 20, bottom: 30, left: 50},
				width = 960 - margin.left - margin.right,
				height = 500 - margin.top - margin.bottom;

		var xScale = d3.time.scale()
				.range([0, width]);

		var yScale = d3.scale.linear()
				.range([height, 0]);

		var xAxis = d3.svg.axis()
				.scale(xScale)
				.orient("bottom");

		var yAxis = d3.svg.axis()
				.scale(yScale)
				.orient("left");

		var line = d3.svg.line()
				.x(function(d) { return xScale(d.datetime); })
				.y(function(d) { return yScale(d.energyLevel); })
				.interpolate("linear");

		var svg = d3.select("#space").append("svg")
				.attr("width", width + margin.left + margin.right)
				.attr("height", height + margin.top + margin.bottom)
			.append("g")
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    data = this.props.data;
		xScale.domain(d3.extent(data, function(d) { return d.datetime; }));
		yScale.domain(d3.extent(data, function(d) { return d.energyLevel; }));

		svg.append("g")
				.attr("class", "x axis")
				.attr("transform", "translate(0," + height + ")")
				.call(xAxis);

		svg.append("g")
				.attr("class", "y axis")
				.call(yAxis);

		svg.append("path")
				.datum(data)
				.attr("class", "line")
				.attr("d", line);

		return (
      <div className="Board">
        <div id="space"></div>
      </div>
		);
	}
});
