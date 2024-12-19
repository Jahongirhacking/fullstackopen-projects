const test = require("node:test");
const assert = require("node:assert");
const helper = require('../utils/list_helper');

test("dummy returns one", () => {
    assert.strictEqual(helper.dummy([]), 1);
})