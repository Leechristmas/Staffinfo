﻿'use strict';

app.controller('employeesController', [
    '$scope', 'employeesService', '$mdToast', 'messageService', '$mdDialog', '$state', function ($scope, employeesService, $mdToast, messageService, $mdDialog, $state) {

        //options for queries to API and pagination
        $scope.query = {
            order: 'employeeLastname',
            limit: 10,
            page: 1,
            label: {
                of: "из",
                page: 'Текущая',
                rowsPerPage: 'Кол-во на странице'
            },
            filter: ''  //it would be better to refresh the list when filter has 3 chars at least.
        };



        //gets employees with pagination
        $scope.getEmployees = function () {
            $scope.promise = employeesService.getEmployees($scope.query).then(function (response) {
                $scope.employees = response.data;
                $scope.total = response.headers('X-Total-Count');
            }, function (data) {
                messageService.setError({ errorText: data.data, errorTitle: 'Статус - ' + data.status + ': ' + data.statusText });
                $mdToast.show(messageService.errorViewConfig);
            });
        }

        //returns $promise with employee by id
        $scope.getEmployeeById = function (id) {
            return employeesService.getEmployeeById(id);
        };

        //opens the dialog window with detailed information about specified employee
        $scope.showDetails = function (ev, id) {
            $scope.getEmployeeById(id).then(function (response) {

                //TODO: set JSON parser for data - date is parsed not correct
                var employee = response.data;
                employee.birthDate = new Date(employee.birthDate);

                employeesService.setActualEmployee(employee);

                $state.go('details');
            }, function (data) {
                messageService.setError({ errorText: data.data, errorTitle: 'Статус - ' + data.status + ': ' + data.statusText });
                $mdToast.show(messageService.errorViewConfig);
            });
        };

        //returns date from string
        $scope.getDate = function (date) {
            var t = new Date(date);
            return new Date(t.getFullYear(), t.getMonth(), t.getDate(), 3);
        }

        //shows the window with form for adding new employee
        $scope.showAddingView = function (ev) {
            $mdDialog.show({
                controller: 'addEmployeeController',
                templateUrl: 'app/views/addEmployeeView.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true
            }).then(function (answer) {
                $scope.refreshEmployees();
                console.log('new employee has been added.');
            }, function () {
                console.log('adding view has been closed.');
            });
        }

        //deletes the specified employee
        var _deleteEmployee = function (id) {
            //TODO: deleting
            $scope.promise = employeesService.deleteEmployeeById(id).then(function (response) {
                $scope.refreshEmployees();//refresh
                $mdToast.show({
                    hideDelay: 3000,
                    position: 'top right',
                    controller: 'toastController',
                    template: '<md-toast class="md-toast-success">' +
                                    '<div class="md-toast-content">' +
                                      'Информация о сотруднике была удалена.' +
                                    '</div>' +
                                '</md-toast>'
                });
            }, function (data) {
                messageService.setError({ errorText: data.data, errorTitle: 'Статус - ' + data.status + ': ' + data.statusText });
                $mdToast.show(messageService.errorViewConfig);
            });
        }

        //shows confirmation of employee deletion 
        $scope.confirmDeleting = function (ev, id) {
            var confirm = $mdDialog.confirm()
                    .title('Удаление')
                    .textContent('Вы уверены, что хотите удалить информацию о сотруднике? \nВосстановить утерянную информацию будет невозможно!')
                    .ariaLabel('Deleting')
                    .targetEvent(ev)
                    .ok('Удалить')
                    .cancel('Отмена');
            $mdDialog.show(confirm).then(function () {
                //delete the employee
                _deleteEmployee(id);
            }, function () {
                //cancel
            });
        }

        $scope.refreshEmployees = function () {
            $scope.promise = $scope.getEmployees();
        }

        $scope.employees = $scope.getEmployees();

    }]).controller('toastController', ['$scope', '$mdDialog', 'messageService', '$mdToast', function ($scope, $mdDialog, messageService, $mdToast) {

        var isDlgOpen = false;

        $scope.closeToast = function () {
            if (isDlgOpen) return;

            $mdToast
                .hide()
                .then(function () {
                    isDlgOpen = false;
                });
        };

        $scope.openMoreInfo = function (e) {
            if (isDlgOpen) return;
            isDlgOpen = true;

            $mdDialog
                .show($mdDialog
                    .alert()
                    .title('Ошибка! ' + messageService.getError().errorTitle)
                    .textContent(messageService.getError().errorText)
                    .ariaLabel('More info')
                    .ok('OK')
                    .targetEvent(e)
                )
                .then(function () {
                    isDlgOpen = false;
                });
        };

    }]).controller('detailsController', ['$scope', '$mdDialog', 'employeesService', 'messageService', '$timeout', '$mdToast', '$state', function ($scope, $mdDialog, employeesService, messageService, $timeout, $mdToast, $state) {
        $scope.hide = function () {
            $mdDialog.hide();
        };

        $scope.cancel = function () {
            $mdDialog.cancel();
        };

        $scope.maxDate = employeesService.maxDate;

        //shows the window for adding new mes achievement
        $scope.showAddMesView = function (ev) {
            $mdDialog.show({
                controller: 'addEmployeeItemsController',
                templateUrl: 'app/views/addMesView.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true
            }).then(function (answer) {
                $scope.getMesAchievements(); //refresh the list
                console.log('new achievement has been added.');
            }, function () {
                console.log('adding view has been closed.');
            });
        };

        $scope.showAddMilitaryView = function (ev) {
            $mdDialog.show({
                controller: 'addEmployeeItemsController',
                templateUrl: 'app/views/addMilitaryView.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true
            }).then(function (answer) {
                $scope.getMilitary(); //refresh the list
                console.log('new military has been added.');
            }, function () {
                console.log('adding view has been closed.');
            });
        };

        $scope.showAddWorkView = function (ev) {
            $mdDialog.show({
                controller: 'addEmployeeItemsController',
                templateUrl: 'app/views/addWorkView.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true
            }).then(function (answer) {
                $scope.getWorks(); //refresh the list
                console.log('new work has been added.');
            }, function () {
                console.log('adding view has been closed.');
            });
        };

        //shows confirmation for transferring employee
        $scope.askForTransfer = function (type, ev) {
            var confirm = {};
            if (type === 'P') {
                confirm = {
                    controller: 'transferController',
                    templateUrl: 'app/views/retiredTransferView.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true
                };
                $mdDialog.show(confirm).then(function (response) {
                    console.log('');
                    //success
                }, function (error) {
                    //cancel
                });
            } else if (type === 'F') {
                confirm = {
                    controller: 'transferController',
                    templateUrl: 'app/views/dismissalView.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true
                }
                $mdDialog.show(confirm).then(function () {
                    //transfer to fired
                }, function () {
                    //cancel
                });
            }
        };

        //deletes work by id
        var _deleteWork = function (id) {
            $scope.promise = employeesService.deleteWork(id).then(function (response) {
                $scope.getWorks(); //refresh
                $mdToast.show({
                    hideDelay: 3000,
                    position: 'top right',
                    controller: 'toastController',
                    template: '<md-toast class="md-toast-success">' +
                        '<div class="md-toast-content">' +
                        'Запись была успешно удалена.' +
                        '</div>' +
                        '</md-toast>'
                });
            }, function (data) {
                messageService.setError({ errorText: data.data, errorTitle: 'Статус - ' + data.status + ': ' + data.statusText });
                $mdToast.show(messageService.errorViewConfig);
            });
        }

        //deletes military by id
        var _deleteMilitary = function (id) {
            $scope.promise = employeesService.deleteMilitary(id).then(function (response) {
                $scope.getMilitary(); //refresh
                $mdToast.show({
                    hideDelay: 3000,
                    position: 'top right',
                    controller: 'toastController',
                    template: '<md-toast class="md-toast-success">' +
                        '<div class="md-toast-content">' +
                        'Запись была успешно удалена.' +
                        '</div>' +
                        '</md-toast>'
                });
            }, function (data) {
                messageService.setError({ errorText: data.data, errorTitle: 'Статус - ' + data.status + ': ' + data.statusText });
                $mdToast.show(messageService.errorViewConfig);
            });
        }

        //deletes mes achievemnt by id
        var _deleteMesAchievement = function (id) {
            $scope.promise = employeesService.deleteMesAchievement(id).then(function (response) {
                $scope.getMesAchievements(); //refresh
                $mdToast.show({
                    hideDelay: 3000,
                    position: 'top right',
                    controller: 'toastController',
                    template: '<md-toast class="md-toast-success">' +
                        '<div class="md-toast-content">' +
                        'Запись была успешно удалена.' +
                        '</div>' +
                        '</md-toast>'
                });
            }, function (data) {
                messageService.setError({ errorText: data.data, errorTitle: 'Статус - ' + data.status + ': ' + data.statusText });
                $mdToast.show(messageService.errorViewConfig);
            });
        }

        //confirmation deleting
        $scope.confirmDeleting = function (ev, id, type) { //type: W - works; M - military; A - achievements; D - discipline items

            var confirm = $mdDialog.confirm()
                .title('Удаление')
                .textContent('Вы уверены, что хотите удалить запись? \nВосстановить утерянную информацию будет невозможно!')
                .ariaLabel('Deleting')
                .targetEvent(ev)
                .ok('Удалить')
                .cancel('Отмена');
            $mdDialog.show(confirm).then(function () {
                //delete the item
                switch (type) {
                    case "W":
                        _deleteWork(id);
                        break;
                    case "M":
                        _deleteMilitary(id);
                        break;
                    case "A":
                        _deleteMesAchievement(id);
                        break;
                    case "D":
                        _deleteDisciplineItem(id);
                    default:
                        break;
                }
            }, function () {
                //cancel
            });
        }

        //Discipline--------------

        $scope.disciplineItems = [];
        $scope.discType = 'G';  //gratitudes by default

        var _deleteDisciplineItem = function (id) {
            $scope.promise = employeesService.deleteDisciplineItem(id).then(function (response) {
                $scope.getDisciplineItems(); //refresh
                $mdToast.show({
                    hideDelay: 3000,
                    position: 'top right',
                    controller: 'toastController',
                    template: '<md-toast class="md-toast-success">' +
                        '<div class="md-toast-content">' +
                        'Запись была успешно удалена.' +
                        '</div>' +
                        '</md-toast>'
                });
            }, function (data) {
                messageService.setError({ errorText: data.data, errorTitle: 'Статус - ' + data.status + ': ' + data.statusText });
                $mdToast.show(messageService.errorViewConfig);
            });
        }

        $scope.getDisciplineItems = function () {
            $scope.promise = employeesService.getDisciplineItems($scope.employee.id).then(function (response) { //success
                $scope.disciplineItems = response.data.filter(function (item) { return item.itemType === $scope.discType });
            }, function (data) { //if error
                messageService.setError({ errorText: data.data, errorTitle: 'Статус - ' + data.status + ': ' + data.statusText });
                $mdToast.show(messageService.errorViewConfig);
            });
        }

        //--------------------------

        //save specified changes for the employee
        $scope.saveChanges = function () {
            //save the changes
            employeesService.saveChanges($scope.changeable).then(function (response) {
                if ($scope.isPensioner())
                    $state.go('retirees');
                else
                    $state.go('employees');

                $mdToast.show({
                    hideDelay: 5000,
                    position: 'top right',
                    controller: 'toastController',
                    template: '<md-toast class="md-toast-success">' +
                        '<div class="md-toast-content text-center">' +
                        'Изменения приняты.' +
                        '</div>' +
                        '</md-toast>'
                });
            }, function (data) {
                messageService.setError({ errorText: data.data, errorTitle: 'Статус - ' + data.status + ': ' + data.statusText });
                $mdToast.show(messageService.errorViewConfig);
            });
        }

        $scope.uploadFile = function (input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.onload = function (e) {

                    //Sets the Old Image to new New Image
                    document.getElementById('photo-id').setAttribute('src', e.target.result);

                    //Create a canvas and draw image on Client Side to get the byte[] equivalent
                    var canvas = document.createElement("canvas");
                    var imageElement = document.createElement("img");

                    imageElement.setAttribute('src', e.target.result);
                    canvas.width = imageElement.width;
                    canvas.height = imageElement.height;
                    var context = canvas.getContext("2d");
                    context.drawImage(imageElement, 0, 0);
                    var base64Image = canvas.toDataURL("image/jpeg");

                    //Removes the Data Type Prefix 
                    //And set the view model to the new value
                    $scope.changeable.employeePhoto = base64Image.replace(/data:image\/jpeg;base64,/g, '');
                }

                //Renders Image on Page
                reader.readAsDataURL(input.files[0]);
            }
        }

        $scope.upload = function () {
            angular.element(document.getElementById('photo-id')).click();
        };

        //reset all changes
        $scope.resetChanges = function () {
            $scope.changeable = employeesService.getClone($scope.employee);
        }

        $scope.isPensioner = function () {
            if ($scope.employee.retirementDate) return true;
            return false;
        }

        $scope.mesAchievements = [];
        $scope.works = [];
        $scope.military = [];

        //returns MES achievements for employee
        $scope.getMesAchievements = function () {
            $scope.promise = employeesService.getMesAchievements().then(function (response) {
                $scope.mesAchievements = response.data;
            }, function (data) {
                messageService.setError({ errorText: data.data, errorTitle: 'Статус - ' + data.status + ': ' + data.statusText });
                $mdToast.show(messageService.errorViewConfig);
            });
        }

        //returns works for employee
        $scope.getWorks = function () {
            $scope.promise = employeesService.getWorks().then(function (response) {
                $scope.works = response.data;
            }, function (data) {
                messageService.setError({ errorText: data.data, errorTitle: 'Статус - ' + data.status + ': ' + data.statusText });
                $mdToast.show(messageService.errorViewConfig);
            });
        }

        //returns works for employee
        $scope.getMilitary = function () {
            $scope.promise = employeesService.getMilitary().then(function (response) {
                $scope.military = response.data;
            }, function (data) {
                messageService.setError({ errorText: data.data, errorTitle: 'Статус - ' + data.status + ': ' + data.statusText });
                $mdToast.show(messageService.errorViewConfig);
            });
        }

        $scope.employee = employeesService.getActualEmployee();
        $scope.changeable = employeesService.getClone($scope.employee);

        $scope.getSeniority = function () {
            $scope.promise = employeesService.getSeniorityById($scope.employee.id).then(function (response) {
                console.log(response.data);
                $scope.seniority = response.data;
            }, function (data) {
                messageService.setError({ errorText: data.data, errorTitle: 'Статус - ' + data.status + ': ' + data.statusText });
                $mdToast.show(messageService.errorViewConfig);
            });
        }

        //returns date from string
        $scope.getDate = function (date) {
            if (date) {
                var t = new Date(date);
                return new Date(t.getFullYear(), t.getMonth(), t.getDate(), 3);
            } else
                return null;
        }

    }]).controller('addEmployeeItemsController', ['$scope', '$mdDialog', 'employeesService', 'messageService', '$mdToast', function ($scope, $mdDialog, employeesService, messageService, $mdToast) {
        $scope.hide = function () {
            $mdDialog.hide();
        };

        $scope.cancel = function () {
            $mdDialog.cancel();
        };

        $scope.mesAchItem = { employeeId: employeesService.getActualEmployee().id };
        $scope.military = { employeeId: employeesService.getActualEmployee().id };
        $scope.work = { employeeId: employeesService.getActualEmployee().id };


        $scope.setPosts = function (serviceId) {
            //posts init
            employeesService.getPosts(serviceId).then(function (response) {
                $scope.posts = response.data;
            }, function (data) {
                messageService.setError({ errorText: data.data, errorTitle: 'Статус - ' + data.status + ': ' + data.statusText });
                $mdToast.show(messageService.errorViewConfig);
            });
        }

        //ranks init
        employeesService.getRanks().then(function (response) {
            $scope.ranks = response.data;
        }, function (data) {
            messageService.setError({ errorText: data.data, errorTitle: 'Статус - ' + data.status + ': ' + data.statusText });
            $mdToast.show(messageService.errorViewConfig);
        });

        //locations init
        employeesService.getLocations().then(function (response) {
            $scope.locations = response.data;
        }, function (data) {
            messageService.setError({ errorText: data.data, errorTitle: 'Статус - ' + data.status + ': ' + data.statusText });
            $mdToast.show(messageService.errorViewConfig);
        });

        //services
        employeesService.getServices().then(function (response) {
            $scope.services = response.data;
        }, function (data) {
            messageService.setError({ errorText: data.data, errorTitle: 'Статус - ' + data.status + ': ' + data.statusText });
            $mdToast.show(messageService.errorViewConfig);
        });

        //saves new mes achievement
        $scope.saveNewMesAchievement = function () {
            $scope.promise = employeesService.saveMesAchievement($scope.mesAchItem).then(function (response) {
                $mdToast.show({
                    hideDelay: 3000,
                    position: 'top right',
                    controller: 'toastController',
                    template: '<md-toast class="md-toast-success">' +
                                    '<div class="md-toast-content">' +
                                      'Запись успешно добавлена.' +
                                    '</div>' +
                                '</md-toast>'
                });
                $mdDialog.hide('save'); //throw the 'answer' to the main controller to refresh or do not the list
            }, function (data) {
                $mdDialog.hide('cancel');
                messageService.setError({ errorText: data.data, errorTitle: 'Статус - ' + data.status + ': ' + data.statusText });
                $mdToast.show(messageService.errorViewConfig);
            });
        }

        //saves new military
        $scope.saveNewMilitary = function () {
            $scope.promise = employeesService.saveMilitary($scope.military).then(function (response) {
                $mdToast.show({
                    hideDelay: 3000,
                    position: 'top right',
                    controller: 'toastController',
                    template: '<md-toast class="md-toast-success">' +
                                    '<div class="md-toast-content">' +
                                      'Запись успешно добавлена.' +
                                    '</div>' +
                                '</md-toast>'
                });
                $mdDialog.hide('save'); //throw the 'answer' to the main controller to refresh or do not the list
            }, function (data) {
                $mdDialog.hide('cancel');
                messageService.setError({ errorText: data.data, errorTitle: 'Статус - ' + data.status + ': ' + data.statusText });
                $mdToast.show(messageService.errorViewConfig);
            });
        }

        //saves new work
        $scope.saveNewWork = function () {
            $scope.promise = employeesService.saveWork($scope.work).then(function (response) {
                $mdToast.show({
                    hideDelay: 3000,
                    position: 'top right',
                    controller: 'toastController',
                    template: '<md-toast class="md-toast-success">' +
                                    '<div class="md-toast-content">' +
                                      'Запись успешно добавлена.' +
                                    '</div>' +
                                '</md-toast>'
                });
                $mdDialog.hide('save'); //throw the 'answer' to the main controller to refresh or do not the list
            }, function (data) {
                $mdDialog.hide('cancel');
                messageService.setError({ errorText: data.data, errorTitle: 'Статус - ' + data.status + ': ' + data.statusText });
                $mdToast.show(messageService.errorViewConfig);
            });
        }

    }]).controller('addEmployeeController', ['$scope', '$mdDialog', 'employeesService', 'messageService', '$mdToast', function ($scope, $mdDialog, employeesService, messageService, $mdToast) {

        $scope.hide = function () {
            $mdDialog.hide();
        };

        $scope.cancel = function () {
            $mdDialog.cancel();
        };

        $scope.answer = function (answer) {
            $mdDialog.hide(answer);
        };

        $scope.maxDate = employeesService.maxDate;

        var employee = {    //testing
            employeeLastname: "Тестовый",
            employeeFirstname: "Тест",
            employeeMiddlename: "Тестович",
            birthDate: new Date(1989, 11, 1),
            description: 'тестовое описание',
            detailedAddress: 'тестовый точный адрес',
            city: 'тестовый город',
            area: 'тестовая область',
            zipCode: '123456',
            passportNumber: 'HB1234567',
            passportOrganization: 'тестовая организация',
            firstPhone: 'первый номер',
            secondPhone: 'второй номер'
        }

        $scope.newEmployee = employee;

        $scope.saveNewEmployee = function () {
            //ToDo: 
            $scope.promise = employeesService.addNewEmployee($scope.newEmployee).then(function (response) {
                $mdToast.show({
                    hideDelay: 3000,
                    position: 'top right',
                    controller: 'toastController',
                    template: '<md-toast class="md-toast-success">' +
                                    '<div class="md-toast-content">' +
                                      'Сотрудник успешно зарегистрирован.' +
                                    '</div>' +
                                '</md-toast>'
                });
                $mdDialog.hide('save'); //throw the 'answer' to the main employee controller to refresh or do not the employee list
            }, function (data) {
                $mdDialog.hide('cancel');
                messageService.setError({ errorText: data.data, errorTitle: 'Статус - ' + data.status + ': ' + data.statusText });
                $mdToast.show(messageService.errorViewConfig);
            });
        };
    }]);