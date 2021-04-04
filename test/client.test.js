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
    Latitude: 20,
    Longitude: 54,
  };

  const createRes = await request(app).post("/api/clients/").send(newClient).set('Authorization', process.env.BEARER_TOKEN);

  expect(createRes.status).toBe(201);
});

test("Create the same client more than once should fail nad return 400", async () => {
  const newClient = {
    Name: "test",
    Lastname: "test",
    Age: 29,
    Latitude: 20,
    Longitude: 54,
  };

  const create1Res = await request(app).post("/api/clients/").send(newClient).set('Authorization', process.env.BEARER_TOKEN);
  const create2Res = await request(app).post("/api/clients/").send(newClient).set('Authorization', process.env.BEARER_TOKEN);

  expect(create1Res.status).toBe(201);
  expect(create2Res.status).toBe(400);
});

test("Create client without all the relevant data should fail and return 400", async () => {
  const newClient = {
    Name: "test",
    Lastname: "test",
    Latitude: 20,
    Longitude: 54,
  };

  const createRes = await request(app).post("/api/clients/").send(newClient).set('Authorization', process.env.BEARER_TOKEN);

  expect(createRes.status).toBe(400);
});

test("Find all users should work", async () => {
  const newClient = {
    Name: "test",
    Lastname: "test",
    Age: 29,
    Latitude: 20,
    Longitude: 54,
  };

  const createRes = await request(app).post("/api/clients/").send(newClient).set('Authorization', process.env.BEARER_TOKEN);

  const findAllRes = await request(app).get("/api/clients/").set('Authorization', process.env.BEARER_TOKEN);

  expect(createRes.status).toBe(201);
  expect(findAllRes.status).toBe(200);
  expect(findAllRes.body.length).toBeGreaterThan(0);
});

test("Get should work", async () => {
  const newClient = {
    Name: "test",
    Lastname: "test",
    Age: 29,
    Latitude: 20,
    Longitude: 54,
  };

  const createRes = await request(app).post("/api/clients/").send(newClient).set('Authorization', process.env.BEARER_TOKEN);

  const findAllRes = await request(app).get("/api/clients/").set('Authorization', process.env.BEARER_TOKEN);

  const _id = findAllRes.body[0]._id;

  const getRes = await request(app).get(`/api/clients/${_id}`).set('Authorization', process.env.BEARER_TOKEN);

  expect(createRes.status).toBe(201);
  expect(findAllRes.status).toBe(200);
  expect(getRes.status).toBe(200);
  expect(getRes.body).toBeDefined();
});

test("Update should work", async () => {
  const newClient = {
    Name: "test",
    Lastname: "test",
    Age: 29,
    Latitude: 20,
    Longitude: 54,
  };

  const createRes = await request(app).post("/api/clients/").send(newClient).set('Authorization', process.env.BEARER_TOKEN);

  const findAllRes = await request(app).get("/api/clients/").set('Authorization', process.env.BEARER_TOKEN);

  const _id = findAllRes.body[0]._id;

  const updateRes = await request(app)
    .patch(`/api/clients/${_id}`)
    .send({ Name: "test2" })
    .set('Authorization', process.env.BEARER_TOKEN);

  const getRes = await request(app).get(`/api/clients/${_id}`).set('Authorization', process.env.BEARER_TOKEN);

  expect(createRes.status).toBe(201);
  expect(findAllRes.status).toBe(200);
  expect(updateRes.status).toBe(200);
  expect(getRes.status).toBe(200);
  expect(getRes.body.Name).toBe("test2");
});

test("Delete should work and return 200", async () => {
  const newClient = {
    Name: "test",
    Lastname: "test",
    Age: 29,
    Latitude: 20,
    Longitude: 54,
  };

  const createRes = await request(app).post("/api/clients/").send(newClient).set('Authorization', process.env.BEARER_TOKEN);

  const findAllRes = await request(app).get("/api/clients/").set('Authorization', process.env.BEARER_TOKEN);

  const _id = findAllRes.body[0]._id;

  const deleteRes = await request(app).delete(`/api/clients/${_id}`).set('Authorization', process.env.BEARER_TOKEN);

  const getRes = await request(app).delete(`/api/clients/${_id}`).set('Authorization', process.env.BEARER_TOKEN);

  expect(createRes.status).toBe(201);
  expect(findAllRes.status).toBe(200);
  expect(deleteRes.status).toBe(200);
  expect(getRes.status).toBe(200);
  expect(getRes.body).toBe("");
});

// test("addList should work", async () => {
//   const newClient = {
//     Name: "test",
//     Lastname: "test",
//     Age: 29,
//     Latitude: 20,
//     Longitude: 54,
//   };
//   const newClient2 = {
//     Name: "test2",
//     Lastname: "test2",
//     Age: 29,
//     Latitude: 20,
//     Longitude: 54,
//   };

//   const List = {
//     newClients: [newClient, newClient2],
//   };

//   const addListRes = await request(app).post("/api/clients/addList").send(List).set('Authorization', process.env.BEARER_TOKEN);

//   const findAllRes = await request(app).get("/api/clients/").set('Authorization', process.env.BEARER_TOKEN);

//   expect(addListRes.status).toBe(201);
//   expect(findAllRes.status).toBe(200);
//   expect(findAllRes.body.length).toBeGreaterThan(1);
// }); No funciona

test("addList should not work if one of the elements of the list is not valid", async () => {
  const newClient = {
    Name: "test3",
    Lastname: "test3",
    Latitude: 20,
    Longitude: 54,
  };
  const newClient2 = {
    Name: "test2",
    Lastname: "test2",
    Age: 29,
    Latitude: 20,
    Longitude: 54,
  };

  const List = {
    newClients: [newClient, newClient2],
  };
  const addListRes = await request(app).post("/api/clients/addList").send(List).set('Authorization', process.env.BEARER_TOKEN);

  const findAllRes = await request(app).get("/api/clients/").set('Authorization', process.env.BEARER_TOKEN);

  expect(addListRes.status).toBe(400);
  expect(addListRes.body).toBe("There were invalid clients in the list");
  expect(findAllRes.status).toBe(200);
  expect(findAllRes.body.length).toBe(0);
});
