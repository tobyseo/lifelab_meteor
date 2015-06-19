var ConditionPage = ReactMeteor.createClass({

  templateName: "ConditionPage",

  getInitialState: function() {
    return { energyLevel: 0 };
  },

  setEnergyLevel: function(level) {
    this.setState({
      energyLevel: level
    });
    Session.set('energyLevel', level);
  },

  render: function() {
    var self = this;
    doSomething = function(){
      energyLevel = Session.get("energyLevel");
      Conditions.insert({
        'datetime': new Date(),
        'energyLevel': energyLevel
      });
      e.preventDefault();
    };

    return (
      <form className="conditionPage" onSubmit={doSomething}>
        <LevelButtons setLevel={self.setEnergyLevel} />
        <input type="submit" value="Post"/>
        <div>{this.state.energyLevel}</div>
      </form>
    );
  }
});

var LevelButtons = React.createClass({

  getInitialState: function() {
    return { focused: 0 };
  },

  clicked: function(index) {
    this.setState({focused: index});
    this.props.setLevel(index);
  },

  render: function() {
    var self = this;

    return (
      <div className="levelButtons">
        <ul>{ _.range(1,6).map(function(m, index) {
            var style = '';
            if(self.state.focused == m) {
              style = 'focused';
            }
            return (
              <li className={style} onClick={self.clicked.bind(self, m)}>{m}</li>
            );
          })}
        </ul>
      </div>
    );
  }
});

Meteor.startup(function() {
  console.log('Server started');
  if(Conditions.find().count() === 0) {
    console.log('Created dummy conditions');
    var dummyConditions = [ { datetime: new Date(), energyLevel: 3 } ];
  }
});
