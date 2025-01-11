const events = require('events');


const event = new events.EventEmitter;

event.on('greet', (name)=>{
    console.log(`Привіт, ${name}!`)
})

event.emit('greet', 'Vlad')