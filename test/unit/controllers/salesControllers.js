const sinon = require('sinon');
const { expect } = require('chai');
const e = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');

salesController = require('../../../controllers/salesController');
salesService = require('../../../services/salesService');

const getAllReturn = [
  {
      "saleId": 1,
      "date": "2022-03-02T15:24:54.000Z",
      "productId": 1,
      "quantity": 5
  },
  {
      "saleId": 1,
      "date": "2022-03-02T15:24:54.000Z",
      "productId": 2,
      "quantity": 10
  },
  {
      "saleId": 2,
      "date": "2022-03-02T15:24:54.000Z",
      "productId": 3,
      "quantity": 15
  }
];

const findByIdReturn = [
  {
      "date": "2022-03-02T15:24:54.000Z",
      "productId": 1,
      "quantity": 5
  },
  {
      "date": "2022-03-02T15:24:54.000Z",
      "productId": 2,
      "quantity": 10
  }
];

const createReturn = {
  "id": 3,
  "itemsSold": [
      {
          "productId": 1,
          "quantity": 150
      }
  ]
}

const updateReturn = {
  "saleId": "3",
  "itemUpdated": [
      {
          "productId": 1,
          "quantity": 100
      }
  ]
};

describe('Testa as funções de salesController', () => {
  const request = {};
  const response = {};

  describe('função getAll', () => {
    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(salesService, 'getAll').returns(getAllReturn);
    });

    after(() => {
      salesService.getAll.restore();
    })

    it('verifica se getAll tem o status esperado', async () => {
      await salesController.getAll(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('verifica se o retorno de getAll é o esperado', async () => {
      await salesController.getAll(request, response);

      expect(response.json.calledWith(getAllReturn)).to.be.equal(true);
    })
  });

  describe('função findById', () => {
    before(() => {
      request.params = sinon.stub().returns({ id: 1 });
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(salesService, 'findById').returns(findByIdReturn);
    });

    after(() => {
      salesService.findById.restore();
    });

    it('verifica se findById tem o status esperado', async () => {
      await salesController.findById(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('verifica se o retorno de findById é o esperado', async() => {
      await salesController.findById(request, response);

      expect(response.json.calledWith(findByIdReturn)).to.be.equal(true);
    });
  });

  describe('função create', () => {
    before(() => {
      request.body = sinon.stub().returns([{ "productId": 1, "quantity": 150 }])
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(salesService, 'create').returns(createReturn);
    });

    after(() => {
      salesService.create.restore();
    });

    it('verifica se create tem o status esperado', async () => {
      await salesController.create(request, response);

      expect(response.status.calledWith(201)).to.be.equal(true);
    });

    it('verifica se o retorno de create é o esperado', async () => {
      await salesController.create(request, response);

      expect(response.json.calledWith(createReturn)).to.be.equal(true);
    });
  });

  describe('função update', () => {
    before(() => {
      request.params = sinon.stub().returns({ id: 1 });
      request.body[0] = sinon.stub().returns([{ "productId": 1, "quantity": 100 }]);
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(salesService, 'update').returns(updateReturn);
    });

    after(() => {
      salesService.update.restore();
    });

    it('verifica se update tem o status esperado', async () => {
      await salesController.update(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('verifica se update tem o retorno esperado', async () => {
      await salesController.update(request, response);

      expect(response.json.calledWith(updateReturn)).to.be.equal(true);
    });
  });

  describe('função deleteSale', () => {
    before(() => {
      request.params = sinon.stub().returns({ id: 1 });
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(salesService, 'deleteSale').returns({});
    });

    after(() => {
      salesService.deleteSale.restore();
    });

    it('verifica se deleteSale tem o status esperado', async () => {
      await salesController.deleteSale(request, response);

      expect(response.status.calledWith(204)).to.be.equal(true);
    });

    it('verifica se deleteSale tem o retorno esperado', async () => {
      await salesController.deleteSale(request, response);

      expect(response.json.calledWith()).to.be.equal(true);
    });
  });
});
