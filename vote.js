Players = new Mongo.Collection('players'); //minimongo
if (Meteor.isClient) {
  // counter starts at 0
  // Session.setDefault('counter', 0);

  Template.showPlayer.helpers({
    members: function () {
      return Players.find({}, {sort: {score: -1}});
    },
    member: function () {
      return Players.findOne();
    }
  });

  Template.showPlayer.events({
    'click li': function () {
      // increment the counter when button is clicked
      Session.set("playId", this._id);
      $('.player-name').text(this.name);
    },
    'click button': function() {
      var playerId = Session.get("playId");
      Players.update(playerId, {$inc: {score: +5}});
    }
  });
}

// On server startup, create some players if the database is empty.
if (Meteor.isServer) {
  Meteor.startup(function () {
    if (Players.find().count() === 0) {
      var names = ["Ada Lovelace", "Grace Hopper", "Marie Curie",
      "Carl Friedrich Gauss", "Nikola Tesla", "Claude Shannon"];
      _.each(names, function (name) {
        Players.insert({
          name: name,
          score: Math.floor(Random.fraction() * 10) * 5
        });
      });
    }
  });
}
