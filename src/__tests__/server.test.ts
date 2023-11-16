import * as request from "supertest";
import { app } from "../server";

describe("non existant/misspelt path", () => {
  test("return a 404 error code and 'url not found' when given a non-existant url", () => {
    return request(app)
      .get("/badpath")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("url not found");
      });
  });
  test("return a 404 error code and 'url not found' when the url is misspelt", () => {
    return request(app)
      .get("/card")
      .expect(404)
      .expect(({ body }) => {
        expect(body.msg).toBe("url not found");
      });
  });
});

describe("/cards", () => {
  test("GET: responds with an array of all cards on file", () => {
    return request(app)
      .get("/cards")
      .expect(200)
      .then(({ body }) => {
        expect(typeof body).toBe("object");
        expect(body).toHaveLength(3);
      });
  });
  test("GET: all items in the returned array have the expected keys", () => {
    return request(app)
      .get("/cards")
      .expect(200)
      .then(({ body }) => {
        body.forEach((card) => {
          expect(card).toHaveProperty("title", expect.any(String));
          expect(card).toHaveProperty("imageUrl", expect.any(String));
          expect(card).toHaveProperty("card_id", expect.any(String));
        });
      });
  });
});

describe("/cards/:cardId", () => {
  test("GET: responds with a single card object ", () => {
    return request(app)
      .get("/cards/card001")
      .expect(200)
      .then(({ body }) => {
        expect(typeof body).toBe("object");
      });
  });
  test("GET: the id on the returned object matches the given ID", () => {
    return request(app)
      .get("/cards/card002")
      .expect(200)
      .then(({ body }) => {
        expect(body).toHaveProperty("id", "card002");
      });
  });
  test("GET: the returned object has the correct keys", () => {
    return request(app)
      .get("/cards/card003")
      .expect(200)
      .then(({ body }) => {
        expect(body).toHaveProperty("title", expect.any(String));
        expect(body).toHaveProperty("imageUrl", expect.any(String));
        expect(body).toHaveProperty("card_id", expect.any(String));
        expect(body).toHaveProperty("base_price", expect.any(Number));
        expect(body).toHaveProperty("availableSizes", expect.any(Array));
        expect(body).toHaveProperty("pages", expect.any(Array));
      });
  });
});
