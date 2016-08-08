let lastUpdated;
let framesPerSecond = 10;
let millisecondsPerFrame = 1000 / framesPerSecond;


Meteor.startup(() => {
    if(Meteor.isServer){
        //Players.remove({});
        Meteor.publish('Players', function(){
            return Players.find().fetch();
        });
    }
});
