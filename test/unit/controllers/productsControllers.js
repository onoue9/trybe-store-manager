const sinon = require('sinon');
const { expect } = require('chai');

const ProductControllers = require('../../../controllers/productsController');

describe('Ao chamar o controller getAll', () => {
  describe('quando não existem produtos no banco de dados', async () => {
    const response = {};
    const request = {};

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(ProductControllers, 'getAll').resolves({});
    });

    after(() => {
      ProductControllers.getAll.restore();
    });

    if('é chamado o status com código 404', async () => {
      await ProductControllers.getAll(request, response);

      expect(response.status.calledWith(404)).to.be.equal(true);
    });

    if('é chamado o json com um array vazio', async () => {
      await ProductControllers.getAll(request, response);

      expect(response.json.calledWith([])).to.be.equal(true);
    });
  });

  describe('quando existem produtos no banco de dados', async () => {
    const response = {};
    const request = {};

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(ProductControllers, 'getAll').resolves([
        {
          "id": 1,
          "name": "produto A",
          "quantity": 10
        },
        {
          "id": 2,
          "name": "produto B",
          "quantity": 20
        }
      ]);
    });

    after(() => {
      ProductControllers.getAll.restore();
    });

    if('é chamado o status com código 200', async () => {
      await ProductControllers.getAll(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    if('é chamado o json com o array de produtos', async () => {
      await ProductControllers.getAll(request, response);

      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    });
  });
});

describe('Ao chamar o controller findById', () => {
  describe('quando não existem produtos no banco de dados', async () => {
    const response = {};
    const request = {};

    before(() => {
      request.params = {
        id: 1
      };

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(ProductControllers, 'findById').resolves(null);
    });

    after(() => {
      ProductControllers.findById.restore();
    });

    if('é chamado o status com código 404', async () => {
      await ProductControllers.findById(request, response);

      expect(response.status.calledWith(404)).to.be.equal(true);
    });

    if('é chamado o json passando a mensagem "Product not found"', async () => {
      await ProductControllers.findById(request, response);

      expect(response.json.calledWith({ message: 'Product not found'})).to.be.equal(true);
    });
  });

  describe('quando existem produtos no banco de dados', async () => {
    const response = {};
    const request = {};

    before(() => {
      request.params = {
        id: 1,
      };

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(ProductControllers, 'findById').resolves({
        id: 1,
        name: 'produto A',
        quantity: 20,
      });
    });

    after(() => {
      ProductControllers.findById.restore();
    });

    if('é chamado o status com código 200', async () => {
      await ProductControllers.findById(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    if('é chamado o json passando um objeto', async () => {
      await ProductControllers.findById(request, response);

      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    });
  });
});
