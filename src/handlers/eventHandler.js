const fs = require('fs');

module.exports = client => {

fs.readdir('./src/events', (error, files) => {
  
  if(error) return console.log(`Failed to loaded event`);
  
  files.filter((f) => f.endsWith('.js')).forEach((file) => {
    
    let prop = require(`../events/${file}`);
    
    if(!prop.conf) return console.log(`Failed to loaded event`);
    
    client.on(prop.conf.event, prop);
    
    console.log(`Event Loaded: ${prop.conf.event}`);

  });
});
}