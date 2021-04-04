const request = require("supertest");
const { setupMongo } = require("./test.setup");
const { app } = require("../src/server");
const { expect, test } = require("@jest/globals");

setupMongo("phaTest");

test("add pha should work and return 201", async () => {
  const newPHA = {
    full_name: "asteroide1",
    a: "0.2",
    e: "0.5",
    i: "10",
    om: "31",
    w: "31",
    ma: "50",
  }

  const addRes = await request(app).post("/api/phas/add").send(newPHA).set('Authorization', process.env.BEARER_TOKEN);

  expect(addRes.status).toBe(201);
});

test("add the same pha more than once should fail and return 400", async () => {
  const newPHA = {
    full_name: "asteroide1",
    a: "0.2",
    e: "0.5",
    i: "10",
    om: "31",
    w: "31",
    ma: "50",
  }

  const add1Res = await request(app).post("/api/phas/add").send(newPHA).set('Authorization', process.env.BEARER_TOKEN);
  const add2Res = await request(app).post("/api/phas/add").send(newPHA).set('Authorization', process.env.BEARER_TOKEN);

  expect(add1Res.status).toBe(201);
  expect(add2Res.status).toBe(400);

});

test("Create PHA without all the relevant data should fail and return 400",
  async () => {
    const newPHA = {
      full_name: "asteroide1",
      a: "0.2",
      w: "31",
      ma: "50",
    }

    const addResp = await request(app)
      .post('/api/phas/add')
      .send(newPHA)
      .set('Authorization', process.env.BEARER_TOKEN);

      expect(addResp.status).toBe(400);
  });

  test("Find all PHAs should work", async ()=> {
    
    const newPHA = {
      full_name: "asteroide1",
      a: "0.2",
      e: "0.5",
      i: "10",
      om: "31",
      w: "31",
      ma: "50",
    }

    const addRes = await request(app).post('/api/phas/add').send(newPHA).set('Authorization', process.env.BEARER_TOKEN);

    const findAllRes = await request(app).get('/api/phas/findAll').set('Authorization', process.env.BEARER_TOKEN);

    expect(addRes.status).toBe(201);
    expect(findAllRes.status).toBe(200);
    expect(findAllRes.body.length).toBeGreaterThan(0);

  });

  test("Find PHA by full name should work", async()=> {
    
    const newFullName = "asteroide5"
    const newPHA = {
      full_name: newFullName,
      a: "0.2",
      e: "0.5",
      i: "10",
      om: "31",
      w: "31",
      ma: "50",
    }

    const addRes = await request(app).post("/api/phas/add").send(newPHA).set('Authorization', process.env.BEARER_TOKEN);

    const findRes = await request(app).get(`/api/phas/find/${newFullName}`).set('Authorization', process.env.BEARER_TOKEN);

    expect(addRes.status).toBe(201);
    expect(findRes.status).toBe(200);
    expect(findRes.body).toBeDefined();

  });

  test("Update PHA should work", async() => {

    const newPHA = {
      full_name: "asteroide1",
      a: "0.2",
      e: "0.5",
      i: "10",
      om: "31",
      w: "31",
      ma: "50",
    }

    const addRes = await request(app).post('/api/phas/add').send(newPHA)
    .set('Authorization', process.env.BEARER_TOKEN);

    const findAllRes = await request(app).get('/api/phas/findAll')
    .set('Authorization', process.env.BEARER_TOKEN);

    const _id = findAllRes.body[0]._id;
    
    const newName = "asteroide2"
    const updateRes = await request(app).patch(`/api/phas/update/${_id}`)
    .send({full_name: newName}).set('Authorization', process.env.BEARER_TOKEN);

    const findRes = await request(app).get(`/api/phas/find/${newName}`)
    .set('Authorization', process.env.BEARER_TOKEN);

    expect(addRes.status).toBe(201);
    expect(findAllRes.status).toBe(200);
    expect(updateRes.status).toBe(200);
    expect(findRes.status).toBe(200);
    expect(findRes.body.full_name).toBe(newName);

  });

  test("Delete should work and return 200", async () => {

    const newName = 'asteroide1'
    const newPHA = {
      full_name: newName,
      a: "0.2",
      e: "0.5",
      i: "10",
      om: "31",
      w: "31",
      ma: "50",
    }

    const addRes = await request(app).post('/api/phas/add').send(newPHA)
    .set('Authorization', process.env.BEARER_TOKEN);

    const findAllRes = await request(app).get('/api/phas/findAll')
    .set('Authorization', process.env.BEARER_TOKEN);

    const _id = findAllRes.body[0]._id;

    const deleteRes = await request(app).delete(`/api/phas/remove/${_id}`)
    .set('Authorization', process.env.BEARER_TOKEN);

    const findRes = await request(app).get(`/api/phas/find/${newName}`)
    .set('Authorization', process.env.BEARER_TOKEN);
    
    expect(addRes.status).toBe(201);
    expect(findAllRes.status).toBe(200);
    expect(deleteRes.status).toBe(200);
    expect(findRes.status).toBe(500);

  });

//   test("addList should work and return 200", async () => {

//     const newPHA = {
//       full_name: "asteroide1",
//       a: "0.2",
//       e: "0.5",
//       i: "10",
//       om: "31",
//       w: "31",
//       ma: "50",
//     }
//     const newPHA2 = {
//       full_name: "asteroide2",
//       a: "0.2",
//       e: "0.5",
//       i: "10",
//       om: "31",
//       w: "31",
//       ma: "50",
//     }

//     const List = {
//       newPHAs: [newPHA, newPHA2]
//     };

//     const addListRes = await request(app).post('/api/pha/addList').send(List);

//     const findAllRes = await request(app).get('/api/pha/findAll');

//     expect(addListRes.status).toBe(201);
//     expect(findAllRes.status).toBe(200);
//     expect(findAllRes.body.length).toBeGreaterThan(1);

//   });

//   test("addList should not work if one of the elements of the list is not valid",
//   async () => {

//     const newPHA = {
//       full_name: "asteroide1",
//       a: "0.2",
//       e: "0.5",
//       i: "10",
//       om: "31",
//       w: "31",
//       ma: "50",
//     }
//     const newPHA2 = {
//       full_name: "asteroide2",
//       a: "0.2",
//       e: "0.5",
//       i: "10",
//       om: "31",
//       w: "31",
//     }

//     const List = {
//       newClients: [newPHA, newPHA2]
//     };

//     const addListRes = await request(app).post('/api/pha/addList').send(List);

//     const findAllRes = await request(app).get('/api/pha/findAll');

//     expect(addListRes.status).toBe(400);
//     expect(addListRes.body).toBe("There were invalid clients in the list")
//     expect(findAllRes.status).toBe(200);
//     expect(findAllRes.body.length).toBe(0);

//   });

