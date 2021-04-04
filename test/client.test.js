const request = require("supertest");
const { setupMongo } = require("./test.setup");
const { app } = require("../src/server");
const { expect, test } = require("@jest/globals");

setupMongo("ClientTest");

test("Create client should work and return 201", async () => {
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

test("Create the same client more than once should fail nad return 400", async () => {
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

});

test("Create client without all the relevant data should fail and return 400",
  async () => {
    const newClient = {
      Name: "test",
      Lastname: "test",
      Latitude: 180,
      Longitude: 54,
    };

    const createRes = await request(app)
      .post('/api/clients/')
      .send(newClient);


      expect(createRes.status).toBe(400);
  });

  test("Find all users should work", async ()=> {
    
    const newClient = {
      Name: "test",
      Lastname: "test",
      Age: 29,
      Latitude: 180,
      Longitude: 54,
    };

    const createRes = await request(app).post('/api/clients/').send(newClient);

    const findAllRes = await request(app).get('/api/clients/');

    expect(createRes.status).toBe(201);
    expect(findAllRes.status).toBe(200);
    expect(findAllRes.body.length).toBeGreaterThan(0);

  });

  test("Get should work", async()=> {
    
    const newClient = {
      Name: "test",
      Lastname: "test",
      Age: 29,
      Latitude: 180,
      Longitude: 54,
    };

    const createRes = await request(app).post('/api/clients/').send(newClient);

    const findAllRes = await request(app).get('/api/clients/');

    const _id = findAllRes.body[0]._id;

    const getRes = await request(app).get(`/api/clients/${_id}`);

    expect(createRes.status).toBe(201);
    expect(findAllRes.status).toBe(200);
    expect(getRes.status).toBe(200);
    expect(getRes.body).toBeDefined();

  });

  test("Update should work", async() => {
    
  })
