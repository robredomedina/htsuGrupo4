const request = require("supertest");
const { setupMongo } = require("./test.setup");
const { app } = require("../src/server");
const { expect } = require("@jest/globals");

setupMongo("ClientTest");

test("Create client should work", async () => {
  const newClient = {
    Name: "test",
    Lastname: "test",
    Age: 29,
    Latitude: 180,
    Longitude: 54,
  };

  const createRes = await request(app).post("/api/clients/").send(newClient);

  expect(createRes.status).toBe(201);
});

test("Create the same user more than once should fail", async () => {
  const newClient = {
    Name: "test",
    Lastname: "test",
    Age: 29,
    Latitude: 180,
    Longitude: 54,
  };

  const create1Res = await request(app).post("/api/clients/").send(newClient);
  const create2Res = await request(app).post("/api/clients/").send(newClient);

  expect(create1Res.status).toBe(201);
  expect(create2Res.status).toBe(400);

})
