Router.configure({
  layoutTemplate: 'layout'
});

Router.map(function() {
  this.route('Home', {
    path: '/',
    template: 'home'
  });

  this.route('Result', {
    path: '/result',
    template: 'result'
  });
});
