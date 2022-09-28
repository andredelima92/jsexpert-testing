const { describe, it } = require("mocha");
const request = require("supertest");
const app = require("./api");
const assert = require("assert");

describe("Api Suit test", () => {
  describe("/contact", () => {
    it("Should request the contact page and return HTTP Status 200", async () => {
      const response = await request(app).get("/contact").expect(200);

      assert.deepStrictEqual(response.text, "contact us page\n");
    });
  });

  describe("/hello", () => {
    it("Should request an inexistent route /hi and redirect to /hello", async () => {
      const response = await request(app).get("/hi").expect(200);

      assert.deepStrictEqual(response.text, "Hello world!\n");
    });
  });

  describe("/login", () => {
    it("Should login succefully on the login route and return HTTP status 200", async () => {
      const response = await request(app)
        .post("/login")
        .send({ username: "AndreLima", password: "123" })
        .expect(200);

      assert.deepStrictEqual(response.text, "Logging has succeeded\n");
    });
    it("Should unauthorize a request when requesting it using wrong credentials and return HTTP Status 401", async () => {
      const response = await request(app)
        .post("/login")
        .send({ username: "MrAnderson", password: "123" })
        .expect(401);

      assert.ok(response.unauthorized);
      assert.deepStrictEqual(response.text, "Logging failed");
    });
  });
});
