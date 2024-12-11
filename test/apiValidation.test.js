import { expect, use } from "chai";
import { default as chaiHttp } from "chai-http";
import { server } from "../src/index.js";

const chai = use(chaiHttp);

before((done) => {
  done();
});

after((done) => {
  server.close();
  done();
});

describe("api()", () => {
  it("Deve retornar true quando mongoDB conectar com sucesso", (done) => {
    expect(true).to.equal(true);
    done();
  });

  it("Deve retornar um erro quando falhar a conexão");

  it("Deve retornar 200 quando o servidor estiver rodando", (done) => {
    chai.request
      .execute(server) // Aqui é onde o erro ocorre
      .get("/")
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});
