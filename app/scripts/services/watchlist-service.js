'use strict';

/**
 * @ngdoc service
 * @name stockDogApp.WatchlistService
 * @description
 * # WatchlistService
 * Service in the stockDogApp.
 */
angular.module('stockDogApp')
  .service('WatchlistService', function WatchlistService() {
    // AngularJS will instantiate a singleton by calling "new" on this function

    // [1] Helper: Load watchlist from localStorage
    var loadModel = function () {
      return {
        watchlists: localStorage['StockDog.watchlists'] ? JSON.parse(localStorage['StockDog.watchlists']) : [],
        nextId: localStorage['StockDog.nextId'] ? parseInt(localStorage['StockDog.nextId']) : 0
      };
    };

    // [2] Helper: Save watchlists to localStorage
    var saveModel = function () {
      localStorage['StockDog.watchlists'] = JSON.stringify(Model.watchlists);
      localStorage['StockDog.nextId'] = Model.nextId;
    };

    // [3] Helper: Use lodash to find a watchlist with given ID
    var findById = function (listId) {
      return _.find(Model.watchlists, function (watchlist) {
        return watchlist.id === parseInt(listId);
      })
    };

    // [4] Return all watchers or find by given ID
    this.query = function (listId) {
      if (listId) {
        return findById(listId);
      } else {
        return Model.watchlists;
      }
    };

    // [5] Save new watchlist to model
    this.save = function (watchlist) {
      watchlist.id = Model.nextId++;
      Model.watchlists.push(watchlist);
      saveModel();
    };

    // [6] Remove watchlist from model
    this.remove = function (watchlist) {
      _.remove(Model.watchlists, function (list) {
        return list.id === watchlist.id;
      });
      saveModel();
    };

    // [7] Initialize Model for this singletone service
    var Model = loadModel();
  });
