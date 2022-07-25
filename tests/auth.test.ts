import app from "../src/app.js";
import supertest from "supertest";
import client from "../src/config/database.js";
import validUserBody from "./factories/userFactory.js";

beforeAll(async () => {
  await client.$executeRaw`TRUNCATE TABLE users`;
});

afterAll(async () => {
  await client.$disconnect();
});

describe("POST /sign-up", () => {
  it("201 on valid input", async () => {
    const body = validUserBody();
    body.confirmPassword = "1234567890";
    const response = await supertest(app).post("/sign-up").send(body);
    const status = response.status;

    expect(status).toEqual(201);
  });
  it("409 on email already registered", async () => {
    const body = validUserBody();
    body.confirmPassword = "1234567890";
    const response = await supertest(app).post("/sign-up").send(body);
    const status = response.status;

    expect(status).toEqual(409);
  });
  it("422 on password no matching", async () => {
    const body = validUserBody();
    body.confirmPassword = "102938019238";
    const response = await supertest(app).post("/sign-up").send(body);
    const status = response.status;

    expect(status).toEqual(422);
  });
});

describe("POST /sign-in", () => {
  it("422 on empty body", async () => {
    const response = await supertest(app).post("/sign-in").send({});
    const status = response.status;

    expect(status).toEqual(422);
  });
  it("401 on wrong password", async () => {
    const body = validUserBody();
    body.password = "019283091283";
    const response = await supertest(app).post("/sign-in").send(body);
    const status = response.status;

    expect(status).toEqual(401);
  });
  it("token on valid input", async () => {
    const body = validUserBody();
    const response = await supertest(app).post("/sign-in").send(body);
    const token = response.body.token;

    expect(response.status).toEqual(200);
    expect(typeof token).toEqual("string");
  });
});
