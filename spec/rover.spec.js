const assert = require('assert');
const Message = require('../message.js');
const Command = require('../command.js');
const Rover = require('../rover.js');

describe("Rover class", () => {

  it("constructor sets position and default values for mode and generatorWatts", () => {
    let obj = new Rover(12345)
    assert.strictEqual(obj.position, 12345)
    assert.strictEqual(obj.mode, 'NORMAL')
    assert.strictEqual(obj.generatorWatts, 110)
  });

  it("response returned by receiveMessage contains name of message", () => {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(98382);    
    let response = rover.receiveMessage(message);
    assert.strictEqual(response.message, 'Test message with two commands')
  });

  it("response returned by receiveMessage includes two results if two commands are sent in the message", () => {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(98382);    
    let response = rover.receiveMessage(message);
    assert.strictEqual(response.results.length, 2)
  });

  it("responds correctly to status check command", () => {
    let commands = [new Command('STATUS_CHECK')];
    let message = new Message('Test message with one command', commands);
    let rover = new Rover(98382);    
    let response = rover.receiveMessage(message).results[0].roverStatus;
    assert.strictEqual(response.mode, "NORMAL")
    assert.strictEqual(response.generatorWatts, 110)
    assert.strictEqual(response.position, 98382)
  });

  it("responds correctly to mode change command", () => {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER')];
    let message = new Message('Test message with one command', commands);
    let rover = new Rover(98382);    
    let response1 = rover.receiveMessage(message).results[0].completed;
    assert.strictEqual(response1, true)
    assert.strictEqual(rover.mode, "LOW_POWER")
    commands = [new Command('MODE_CHANGE', 'NORMAL')];
    message = new Message('Test message with one command', commands);
    let response2 = rover.receiveMessage(message).results[0].completed
    assert.strictEqual(response2, true)
    assert.strictEqual(rover.mode, "NORMAL")
  });

  it("responds with false completed value when attempting to move in LOW_POWER mode", () => {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE', 12000)];
    let message = new Message('Test message with one command', commands);
    let rover = new Rover(98382);    
  });

  it("responds with position for move command", () => {
    let commands = [new Command('MOVE', 15000)];
    let message = new Message('Test message with one command', commands);
    let rover = new Rover();  
    let response = rover.receiveMessage(message)
    assert.strictEqual(rover.position, 15000)
  });

  it("completed false and a message for an unknown command", () => {
    let commands = [new Command('SLIDE', 15000)];
    let message = new Message('This is an unknown command test', commands);
    let rover = new Rover();  
    let response = rover.receiveMessage(message)
    assert.strictEqual(response.results[0].completed, false)
    assert.strictEqual(response.message, 'This is an unknown command test')
  });

});