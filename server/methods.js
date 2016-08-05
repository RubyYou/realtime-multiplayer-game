Meteor.methods({
    'signedUp': (username) => {
        console.log('from server', username);
        if(username){
            return true;
        } else{
            return false;
        }
    }
});