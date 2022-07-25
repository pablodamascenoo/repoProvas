import supertest from "supertest";
import app from "../src/app.js";
import client from "../src/config/database.js";
import validTestBody from "./factories/testsFactory.js";
import validUserBody from "./factories/userFactory.js";

const authHeader = { authorization: "" };

beforeAll(async () => {
  await client.$queryRaw`TRUNCATE TABLE tests;`;
  const result = await supertest(app).post("/sign-in").send(validUserBody());
  authHeader.authorization = result.body.token;
});
afterAll(async () => {
  await client.$disconnect();
});

describe("POST /tests", () => {
  it("401 on missing or invalid token", async () => {
    const body = validTestBody();
    const result = await supertest(app).post("/tests").send(body);
    expect(result.status).toEqual(401);
  });
  it("422 on invalid input", async () => {
    const body = validTestBody();
    delete body.categoryId;
    const result = await supertest(app)
      .post("/tests")
      .set(authHeader)
      .send(body);
    expect(result.status).toEqual(422);
  });
  it("401 on category not registered", async () => {
    const body = validTestBody();
    body.categoryId = 10;
    const result = await supertest(app)
      .post("/tests")
      .set(authHeader)
      .send(body);
    expect(result.status).toEqual(401);
  });
  it("401 on teacherDiscipline not registered", async () => {
    const body = validTestBody();
    body.disciplineId = 14;
    const result = await supertest(app)
      .post("/tests")
      .set(authHeader)
      .send(body);
    expect(result.status).toEqual(401);
  });
  it("201 on valid input", async () => {
    const body = validTestBody();
    const result = await supertest(app)
      .post("/tests")
      .set(authHeader)
      .send(body);
    expect(result.status).toEqual(201);
  });
});

describe("GET /tests", () => {
  it("422 on invalid query param", async () => {
    const result = await supertest(app).get("/tests").set(authHeader);
    expect(result.status).toEqual(422);
  });
  it("200 on valid disciplines query param", async () => {
    const result = await supertest(app)
      .get("/tests?groupBy=disciplines")
      .set(authHeader);
    expect(result.status).toEqual(200);
    expect(result.body.tests).not.toBeNull();
  });
  it("200 on valid teachers query param", async () => {
    const result = await supertest(app)
      .get("/tests?groupBy=teachers")
      .set(authHeader);
    expect(result.status).toEqual(200);
    expect(result.body.tests).not.toBeNull();
  });
});
