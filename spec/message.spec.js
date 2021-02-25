const assert = require('assert');
const Message = require('../message.js');
const Command = require('../command.js');

describe("Message class", () => {
  it("throws an error if a name is NOT passed into the constructor as the first parameter",  () => {
    assert.throws(
      function() {
        new Message();
      },
      {
        message: 'Name is required.'
      }
    );
  });

  it("constructor sets name", () => {
    let obj = new Message('nameString')
    assert.strictEqual(obj.name, 'nameString')
  });

  it("contains a commands array passed into the constructor as 2nd argument", () => {
    let commandsArray = new Array(5).fill(null).map(() => {return new Command('nameString', 'value')});
    let obj = new Message('nameString', commandsArray)
    assert.strictEqual(obj.commands, commandsArray)
  });

});