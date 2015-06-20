Meteor.publish('all-conditions', function() {
  console.log('published');
  return Conditions.find();
});
