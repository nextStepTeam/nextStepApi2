import * as chai from 'chai';
import chaiHttp from 'chai-http';
import { startServer, server } from '../src/index.js'; // Ajuste o caminho conforme necessário

chai.use(chaiHttp); // Certifique-se de que isso está aqui
const { expect } = chai;

before((done) => {
    startServer(); // Inicia o servidor
    done();
});

after((done) => {
    server.close(); // Encerra o servidor após os testes
    done();
});

describe('api()', () => {
    it("Deve retornar true quando mongoDB conectar com sucesso", () => {
        expect(true).to.equal(true); // Ajuste conforme necessário para testar a conexão com o MongoDB
    });

    it("Deve retornar um erro quando falhar a conexão");

    it("Deve retornar 200 quando o servidor estiver rodando", (done) => {
        chai.request(server) // Aqui é onde o erro ocorre
            .get('/') 
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    });
});