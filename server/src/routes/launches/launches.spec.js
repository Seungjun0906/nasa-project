const request = require("supertest");
const app = require("../../app");

describe("Test GET /v1/launches", () => {
  test("It should respond with 200 success", async () => {
    const res = await request(app)
      .get("/launches")
      .expect("Content-Type", /json/)
      .expect(200);
  });
});

describe("Test POST /v1/launch", () => {
  const completeLaunchData = {
    mission: "USS Enterprise",
    rocket: "NCC 1701-D",
    target: "Kepler-186-f",
    launchDate: "January 4, 2028",
  };

  const launchDataWithoutDate = {
    mission: "USS Enterprise",
    rocket: "NCC 1701-D",
    target: "Kepler-186-f",
  };

  test("It should respond with 201 created", async () => {
    const res = await request(app)
      .post("/launches")
      .send(completeLaunchData)
      .expect("Content-Type", /json/)
      .expect(201);

    const resquestDate = new Date(completeLaunchData.launchDate).valueOf();
    const responseDate = new Date(res.body.launchDate).valueOf();
    expect(responseDate).toBe(resquestDate);

    expect(res.body).toMatchObject(launchDataWithoutDate);
  });

  test("It should catch missing required properties", async () => {
    const res = await request(app)
      .post("/launches")
      .send(launchDataWithoutDate)
      .expect("Content-Type", /json/)
      .expect(400);
  });
  test("It should catch invalid dates", () => {});
});
