(function () {

    angular
        .module('users')
        .controller('UserController', [
            'userService', '$mdSidenav', '$mdBottomSheet', '$log', '$q',
            UserController
        ]);

    /**
     * Controleur des users
     * @param userService
     * @param $mdSidenav
     * @param $mdBottomSheet
     * @param $log
     * @param $q
     * @constructor
     */
    function UserController(userService, $mdSidenav, $mdBottomSheet, $log, $q) {
        var self = this;

        self.users = [];
        self.selectedUser = null;
        self.selectUser = selectUser;

        self.showContactOptions = showContactOptions;

        // Load all registered users

        userService
            .loadAllUsers()
            .then(function (users) {
                self.users = [].concat(users);
                self.selectedUser = users[0];
            });

        // *********************************
        // Internal methods
        // *********************************


        /**
         * Selectionne le user passé en paramètre
         * @param user
         */
        function selectUser(user) {
            console.log("selectUser("+user+")");
            self.selectedUser = angular.isNumber(user) ? $scope.users[user] : user;
            console.log("selectedUser = ",self.selectedUser);
        }

        /**
         * Show the bottom sheet
         */
        function showContactOptions($event) {
            var user = self.selected;

            return $mdBottomSheet.show({
                parent: angular.element(document.getElementById('content')),
                templateUrl: './src/users/view/contactSheet.html',
                controller: ['$mdBottomSheet', ContactPanelController],
                controllerAs: "cp",
                bindToController: true,
                targetEvent: $event
            }).then(function (clickedItem) {
                clickedItem && $log.debug(clickedItem.name + ' clicked!');
            });

            /**
             * Bottom Sheet controller for the Avatar Actions
             */
            function ContactPanelController($mdBottomSheet) {
                this.user = user;
                this.actions = [
                    {name: 'Phone', icon: 'phone', icon_url: 'assets/svg/phone.svg'},
                    {name: 'Twitter', icon: 'twitter', icon_url: 'assets/svg/twitter.svg'},
                    {name: 'Google+', icon: 'google_plus', icon_url: 'assets/svg/google_plus.svg'},
                    {name: 'Hangout', icon: 'hangouts', icon_url: 'assets/svg/hangouts.svg'}
                ];
                this.submitContact = function (action) {
                    $mdBottomSheet.hide(action);
                };
            }
        }

    }

})();
