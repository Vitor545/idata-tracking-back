import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;
let chaiHttpResponse: Response;

describe('Testa rota de tracking', () => {
  it('Quando não passar o prefixo retorna erro', async () => {
    chaiHttpResponse = await chai.request(app).post('/search').send();

    expect(chaiHttpResponse.status).to.be.equal(400);
    expect(chaiHttpResponse.body.message).to.be.equal(
      'Preencha todos os campos',
    );
  });

  it('Quando não passar o numero retorna erro', async () => {
    chaiHttpResponse = await chai.request(app).post('/search').send();

    expect(chaiHttpResponse.status).to.be.equal(400);
    expect(chaiHttpResponse.body.message).to.be.equal(
      'Preencha todos os campos',
    );
  });

  it('Quando passar o numero é o prefixo correto realiza a requisição', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/search')
      .send({ number: '29614550', prefix: '549' });

    expect(chaiHttpResponse.status).to.be.equal(201);
    expect(chaiHttpResponse.body).to.be.not.equal({
      message: 'Dados inválidos, AWB incorreto',
    });
  });

  it('Quando passar o numero ou o prefixo incorreto retorna erro', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/search')
      .send({ number: '296140', prefix: '549' });

    expect(chaiHttpResponse.status).to.be.equal(404);
    expect(chaiHttpResponse.body.message).to.be.equal(
      'Dados inválidos, AWB incorreto',
    );
  });
  it('Quando passar o awb correto nos params realiza a requisição get', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/search/549296145550')

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(
      []
    );
  });

  it('Realiza get corretamente', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/search')

    expect(chaiHttpResponse.status).to.be.equal(200);
  });
});
