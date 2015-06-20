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
        <Table data={this.state.all_conditions}/>
      </div>
    );
  }
});

var Table = React.createClass({
  render: function() {
    var rows = this.props.data.map(function(condition, index) {
      return (
        <div>
          {index} | {condition.datetime} | {condition.energyLevel}
        </div>
      );
    });
    return (
      <div className="Table">
        {rows}
      </div>
    );
  }
});
