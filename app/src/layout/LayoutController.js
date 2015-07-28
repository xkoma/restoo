(function () {

    angular
        .module('layout')
        .controller('LayoutController', [
            '$mdSidenav', '$mdBottomSheet', '$log', '$q',
            LayoutController
        ]);

    /**
     * Controleur du layout
     * @param $mdSidenav
     * @param $mdBottomSheet
     * @param $log
     * @param $q
     * @constructor
     */
    function LayoutController($mdSidenav, $mdBottomSheet, $log, $q) {
        var self = this;

        self.selectedCategory = "propositions";
        self.selectCategory = selectCategory;
        self.toggleCategoriesList = toggleCategoriesList;

        self.toggleMenu = toggleMenu;


        // *********************************
        // Internal methods
        // *********************************

        /**
         * First hide the bottomsheet IF visible, then
         * hide or Show the 'left' sideNav area
         */
        function toggleCategoriesList() {

            var pending = $mdBottomSheet.hide() || $q.when(true);

            pending.then(function () {
                console.log("toggleCategoriesList()");
                $mdSidenav('left').toggle();
            });
        }

        /**
         * Build handler to open/close the menu; when animation finishes
         * report completion in console
         */
        function toggleMenu() {

            var debounceFn = $mdUtil.debounce(function () {
                console.log("toggleMenu()");
                $mdSidenav('menu')
                    .toggle()
                    .then(function () {
                        $log.debug("toggle menu is done");
                    });
            }, 300);
            return debounceFn;
        }

        /**
         * Selectionne la catégorie demandée (les propositions, les restaurants...)
         * @param categ
         */
        function selectCategory(categ) {
            console.log("selectCategory("+categ+")");
            self.selectedCategory = categ;
            self.toggleCategoriesList();
        }


    }

})();
