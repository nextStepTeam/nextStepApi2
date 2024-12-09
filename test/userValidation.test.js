import * as chai from "chai";
import chaiHttp from "chai-http";
import { startServer, server } from "../src/index.js";

chai.use(chaiHttp);
const { expect } = chai;

before((done) => {
  startServer();
  done();
});

after(async () => {
  if (server) {
    server.close(); // Fecha o servidor
  }
  done();
  // if (mongoose.connection) {
  //   await mongoose.connection.close(); // Fecha a conexão do MongoDB
  // }
});

const userSchema = {
  username: "string",
  email: "string",
  password: "string",
};

describe("Users", () => {
  it("Deve retornar 200 para rota users", () => {
    chai
      .request(server)
      .get("/users")
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
    done();
  });

  it("Deve retornar 201 quando enviar os dados corretos para o registro do usuário", (done) => {
    chai
      .request(server)
      .post("/users/register")
      .send({ username: "teste", email: "teste@teste.com", password: "12345" })
      .end((err, res) => {
        chai.expect(res.body).to.containSubset([userSchema]);
        done();
      });
    done();
  });
});
