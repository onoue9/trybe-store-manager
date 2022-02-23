const sinon = require('sinon');
const { expect } = require('chai');

const SaleControllers = require('../../../controllers/salesController');

describe('Ao chamar o controller getAll', () => {
  describe('quando não existem vendas no banco de dados', async () => {
    const response = {};
    const request = {};

    before(() => {
      response.status = sinon.stub().returns(response);
      response.send = sinon.stub().returns();

      sinon.stub(SaleControllers, 'getAll').resolves({});
    });

    after(() => {
      SaleControllers.getAll.restore();
    });

    if('é chamado o status com código 404', async () => {
      await SaleControllers.getAll(request, response);

      expect(response.status.calledWith(404)).to.be.equal(true);
    });

    if('é chamado o json com um array vazio', async () => {
      await SaleControllers.getAll(request, response);

      expect(response.json.calledWith([])).to.be.equal(true);
    });
  });

  describe('quando existem vendas no banco de dados', async () => {
    const response = {};
    const request = {};

    before(() => {
      response.status = sinon.stub().returns(response);
      response.send = sinon.stub().returns();

      sinon.stub(SaleControllers, 'getAll').resolves([{ a }, { b }, { c }]);
    });

    after(() => {
      SaleControllers.getAll.restore();
    });

    if('é chamado o status com código 200', async () => {
      await SaleControllers.getAll(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    if('é chamado o json com o array de produtos', async () => {
      await SaleControllers.getAll(request, response);

      expect(response.send.calledWith(sinon.match.array)).to.be.equal(true);
    });
  });
});

describe('Ao chamar o controller findById', () => {
  describe('quando não existem vendas no banco de dados', async () => {
    const response = {};
    const request = {};

    before(() => {
      request.params = {
        id: 1
      };

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(SaleControllers, 'findById').resolves(null);
    });

    after(() => {
      SaleControllers.findById.restore();
    });

    if('é chamado o status com código 404', async () => {
      await SaleControllers.findById(request, response);

      expect(response.status.calledWith(404)).to.be.equal(true);
    });

    if('é chamado o json passando a mensagem "Sales not found"', async () => {
      await SaleControllers.findById(request, response);

      expect(response.json.calledWith({ message: 'Sales not found'})).to.be.equal(true);
    });
  });

  describe('quando existem vendas no banco de dados', async () => {
    const response = {};
    const request = {};

    before(() => {
      request.params = {
        id: 1,
      };

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(SaleControllers, 'findById').resolves({
        id: 1,
        a,
        b,
        c,
      });
    });

    after(() => {
      SaleControllers.findById.restore();
    });

    if('é chamado o status com código 200', async () => {
      await SaleControllers.findById(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    if('é chamado o json passando um objeto', async () => {
      await SaleControllers.findById(request, response);

      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    });
  });
});
