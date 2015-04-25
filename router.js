Router.configure({
  // we use the  appBody template to define the layout for the entire app
  layoutTemplate: 'appLayout'
});

Router.route('/signup', function () {
  this.render('signup');
  this.layout("loginLayout");
});

Router.route('/', function () {
  this.render('showPlayer');
});
