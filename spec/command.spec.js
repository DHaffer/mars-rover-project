const assert = require('assert');
const Command = require('../command.js');


describe("Command class", () => {

  it("throws an error if command type is NOT passed into constructor as the first parameter", function() {
    assert.throws(
      function() {
        new Command();
      },
      {
        message: 'Command type required.'
      }
    );
  });

  it("constructor sets command type", () => {
    let obj = new Command('commandString')
    assert.strictEqual(obj.commandType, 'commandString')
  });

  it("constructor sets a value passed in as the 2nd argument", () => {
    let obj = new Command('commandString', 'value')
    assert.strictEqual(obj.value, 'value')
  });

});