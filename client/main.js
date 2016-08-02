import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Messages } from '../api/messages';
import './main.html';

if (Meteor.isClient) {

Template.messages.helpers({
  messages: function() {
      return Messages.find({}, { sort: { time: -1, limit:10 }});
  }
});

Template.messages.events({
  'click #chatID': function (event){
      console.log('hehe', chatID);
     var chatID = event.target.getAttribute('data-id');
     
     Messages.remove(chatID);
  }
});

Template.input.events({

  'keydown input#message' : function (event) {
    if (event.which == 13) { // 13 is the enter key event
      
      var name = document.getElementById('name').value;
      var username = (name !== '') ? name : 'annomous';
      var message = document.getElementById('message');

      if (message.value != '') {
        Messages.insert({
          name: username,
          message: message.value,
          time: Date.now(),
        });

        document.getElementById('message').value = '';
        message.value = '';
      }
    }
  }

  });

}