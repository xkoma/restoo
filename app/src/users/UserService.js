(function(){
  'use strict';

  angular.module('users')
         .service('userService', ['$q', UserService]);

  /**
   * Service de données Users
   * Pour l'instant les données sont en dur : à remplacer avec un appel à l'API côté serveur
   * Le retour est asynchrone pour simuler un appel serveur
   *
   * @returns {{loadAll: Function}}
   * @constructor
   */
  function UserService($q){
    var users = [
      {
        id:'123',
        firstName: 'Vivien',
        lastName: 'Zoonekynd',
        email:'vzoonekynd@nextoo.fr',
        birthday:new Date(1991, 3, 2),
        aboutMe: 'Je suis ton père',
        nbRestaurants:'0',
        nbAvis:'0'
      },
      {
        id:'124',
        firstName: 'Xavier',
        lastName: 'Koma',
        email:'xkoma@nextoo.fr',
        birthday:new Date(1991, 8, 29),
        aboutMe: 'Je suis ton Scrum-Master',
        nbRestaurants:'0',
        nbAvis:'0'
      },
      {
        id:'125',
        firstName: 'Nicolas',
        lastName: 'Averlant',
        email:'naverlant@nextoo.fr',
        birthday:new Date(1992, 11, 31),
        aboutMe: 'Je suis ton Maître',
        nbRestaurants:'0',
        nbAvis:'0'
      }
    ];

    var returnedUserService = {
      loadAllUsers : function() {
        // Simulate async nature of real remote calls
        return $q.when(users);
      }
    };

    // Promise-based API
    return returnedUserService;
  }

})();
