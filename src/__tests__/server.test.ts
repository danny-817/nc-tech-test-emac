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
        expect(body.length).toEqual(3);
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

/*
title from cards.json( as "title")

imageUrl from templates.json ( pages[0].templateId then find that template in tempaltes.json)

card_id from cards.json (as "id")
*/

// test("returns matching card title", async () => {
//   const response = await request(app).get("/cards/card001");

//   expect(response.status).toBe(200);
//   expect(response.body).toEqual(
//     expect.objectContaining({
//       title: "card 1 title",
//     })
//   );
// });
