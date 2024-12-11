import mongoose from "mongoose";
import { expect, use } from "chai";
import { default as chaiHttp } from "chai-http";
import { server } from "../src/index.js";

const chai = use(chaiHttp);
chai.should();

before((done) => {
  done();
});

after(async (done) => {
  mongoose.connection.db.dropDatabase();
  if (server) {
    server.close();
  }
  done();
});

const userSchema = {
  username: "string",
  email: "string",
};

describe("Users", () => {
  it("Deve retornar 200 para rota users", (done) => {
    chai.request
      .execute(server)
      .get("/users")
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it("Deve retornar 201 quando enviar os dados corretos para o registro do usuário", (done) => {
    chai.request
      .execute(server)
      .post("/users/register")
      .send({
        username: "teste 1",
        email: "testecertoA@teste.com",
        password: "12345",
      })
      .end((err, res) => {
        chai.expect(res).to.have.status(201);
        done();
      });
  });

  it("Deve retornar 409 para usuário que já existe", (done) => {
    chai.request
      .execute(server)
      .post("/users/register")
      .send({
        username: "teste 1",
        email: "testecertoA@teste.com",
        password: "12345",
      })
      .end((err, res) => {
        chai.expect(res).to.have.status(409);
        done();
      });
  });
});
