import { Meteor } from 'meteor/meteor';
import { Messages } from '../api/messages';
import { Game } from '../api/messages';

Meteor.startup(() => {
  // code to run on server at startup
    if(Meteor.isServer){
        console.log("Meteor.isServer", Meteor.isServer);
    }

    // Meteor.publish('users', function(){
    //    return Meteor.users.find({}, {username:1, profile:1});
    // });
});
