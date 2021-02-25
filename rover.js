class Command {
  constructor(commandType, value) {
    this.commandType = commandType;
    if (!commandType) {
      throw Error("Command type required.");
    }
    this.value = value;
  }

}

class Message {
  constructor(name, commands) {
    this.name = name;
    if (!name) {
      throw Error("Name is required.");
    }
    this.commands = commands;
  }
}


class Rover {
  constructor (position, mode, generatorWatts) {
    this.position = position;
    this.mode = 'NORMAL';
    this.generatorWatts = 110;
  }

  receiveMessage(message) {
   let resultsArray = []
   for (let i = 0; i < message.commands.length; i++){
      if (message.commands[i].commandType === "STATUS_CHECK"){
       let statusResult = {
           completed: true,
           roverStatus: {
           mode: this.mode,
           generatorWatts: this.generatorWatts,
           position: this.position
         }
       } 
      resultsArray.push(statusResult)
     } 
     
     else if (message.commands[i].commandType === "MOVE") {
       this.position = message.commands[i].value
       let moveResult;
       if(this.mode === "NORMAL") {
          moveResult = {completed: true}
       } else {moveResult = {completed: false}}
       resultsArray.push(moveResult)
     }
     
     else if (message.commands[i].commandType === "MODE_CHANGE") {
       this.mode = message.commands[i].value
       let modeChangeResults = {completed: true}
       resultsArray.push(modeChangeResults)
     } 
     
     else {let unknownResult = {completed: false}
              resultsArray.push(unknownResult)}
  }
    return {
      message: message.name,
      results: resultsArray
    }
  }
}

module.exports = Rover;