const sinon = require('sinon');
const { expect } = require('chai');
const e = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');

productController = require('../../../controllers/productsController');
productService = require('../../../services/productsService');

const getAllReturn = [
  {
      "id": 1,
      "name": "Martelo de Thor",
      "quantity": 9
  },
  {
      "id": 2,
      "name": "Traje de encolhimento",
      "quantity": 20
  },
  {
      "id": 3,
      "name": "Escudo do Capitão América",
      "quantity": 30
  }
];

const findByIdReturn = {
  "id": "1",
  "name": "Martelo de Thor",
  "quantity": 9
};

const createReturn = {
  "id": 4,
  "name": "produto",
  "quantity": 100
};

const updateReturn = {
  "id": "4",
  "name": "produto",
  "quantity": 150
};

describe('Testa as funções de productsController', () => {
  const request = {};
  const response = {};

  describe('função getAll', () => {
    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(productService, 'getAll').returns(getAllReturn);
    });

    after(() => {
      productService.getAll.restore();
    })

    it('verifica se getAll tem o status esperado', async () => {
      await productController.getAll(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('verifica se o retorno de getAll é o esperado', async () => {
      await productController.getAll(request, response);

      expect(response.json.calledWith(getAllReturn)).to.be.equal(true);
    })
  });

  describe('função findById', () => {
    before(() => {
      request.params = sinon.stub().returns({ id: 1 });
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(productService, 'findById').returns(findByIdReturn);
    });

    after(() => {
      productService.findById.restore();
    });

    it('verifica se findById tem o status esperado', async () => {
      await productController.findById(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('verifica se o retorno de findById é o esperado', async() => {
      await productController.findById(request, response);

      expect(response.json.calledWith(findByIdReturn)).to.be.equal(true);
    });
  });

  describe('função create', () => {
    before(() => {
      request.body = sinon.stub().returns({ "name": "produto", "quantity": 100 })
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(productService, 'create').returns(createReturn);
    });

    after(() => {
      productService.create.restore();
    });

    it('verifica se create tem o status esperado', async () => {
      await productController.create(request, response);

      expect(response.status.calledWith(201)).to.be.equal(true);
    });

    it('verifica se o retorno de create é o esperado', async () => {
      await productController.create(request, response);

      expect(response.json.calledWith(createReturn)).to.be.equal(true);
    });
  });

  describe('função update', () => {
    before(() => {
      request.params = sinon.stub().returns({ id: 4 });
      request.body = sinon.stub().returns({ "name": "produto", "quantity": 150 });
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(productService, 'update').returns(updateReturn);
    });

    after(() => {
      productService.update.restore();
    });

    it('verifica se update tem o status esperado', async () => {
      await productController.update(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('verifica se update tem o retorno esperado', async () => {
      await productController.update(request, response);

      expect(response.json.calledWith(updateReturn)).to.be.equal(true);
    });
  });

  describe('função deleteProduct', () => {
    before(() => {
      request.params = sinon.stub().returns({ id: 1 });
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(productService, 'deleteProduct').returns({});
    });

    after(() => {
      productService.deleteProduct.restore();
    });

    it('verifica se deleteProduct tem o status esperado', async () => {
      await productController.deleteProduct(request, response);

      expect(response.status.calledWith(204)).to.be.equal(true);
    });

    it('verifica se deleteProduct tem o retorno esperado', async () => {
      await productController.deleteProduct(request, response);

      expect(response.json.calledWith()).to.be.equal(true);
    });
  });
});
