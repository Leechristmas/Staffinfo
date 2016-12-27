﻿'use strict';

app.factory('employeesService', [
    "$http", 'ngAuthSettings', function ($http, ngAuthSettings) {
        var employeesServiceFactory = {};

        //base address to API
        var serviceBase = ngAuthSettings.apiServiceBaseUri;

        //retirees properties and methods
        var _retirees = {
            //returns promise for getting retirees
            getRetirees: function (query) {
                return $http.get(serviceBase + 'api/retirees?offset=' + (query.page - 1) * query.limit + '&limit=' + query.limit + '&query=' + (query.filter ? query.filter : ''));
            }
        }

        //dismissed properties and methods
        var _dismissed = {
            //returns promise for getting dismissed
            getDismissed: function (query) {
                return $http.get(serviceBase + 'api/dismissed?offset=' + (query.page - 1) * query.limit + '&limit=' + query.limit + '&query=' + (query.filter ? query.filter : ''));
            },
            //deletes dismissed by id
            deleteDismissedById: function (id) {
                return $http.delete(serviceBase + 'api/dismissed/' + id);
            },
        }

        //employee properties and methods
        var _employees = {
            //actual selected employee
            actualEmployee: {},
            //returns actual employees with pagination 
            getEmployees: function (query) {
                return $http.get(serviceBase + 'api/employees?offset=' + (query.page - 1) * query.limit + '&limit=' + query.limit + '&query=' + (query.filter ? query.filter : ''));
            },
            //deletes employee by id
            deleteEmployeeById: function (id) {
                return $http.delete(serviceBase + 'api/employees/' + id);
            },
            //returns employee by id
            getEmployeeById: function (id) {
                return $http.get(serviceBase + 'api/employees/' + id).then(function (response) {
                    return response;
                });
            },
            //adds new employee
            addNewEmployee: function (employee) {
                return $http.post(serviceBase + 'api/employees', employee, {});
            },
            //edit employee
            saveChanges: function (employee) {
                return $http.put(serviceBase + 'api/employees/' + employee.id, employee, {});
            },
            //returns actual(selected) employee
            getActualEmployee: function () {
                return this.actualEmployee;
            },
            setActualEmployee: function (employee) {
                this.actualEmployee = employee;
            },
            transferToRetirees: function(employee) {
                return $http.post(serviceBase + 'api/employees/retiredtransfer', employee, {});
            },
            transferToDismissed: function(dismissal) {
                return $http.post(serviceBase + 'api/employees/dismissedtransfer', dismissal, {});
            },
            //getting seniority by employee id
            getSeniorityById: function(employeeId) {
                return $http.get(serviceBase + 'api/employees/seniority/' + employeeId);
            }
        }
        
        //common properties and methods
        var _common = {
            //returns clone of the specified object
            getClone: function clone(obj) {
                if (null == obj || "object" != typeof obj) return obj;
                var copy = obj.constructor();
                for (var attr in obj) {
                    if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
                }
                return copy;
            },
            //max birthDate
            maxBirthDate: new Date(new Date(Date.now()).getFullYear() - 18, new Date(Date.now()).getMonth(), new Date(Date.now()).getDate())
        }

        //activity items (locations, ranks, posts, works, etc.) properties and methods
        var _activityItems = {
            getWorks: function () {
                return $http.get(serviceBase + 'api/employees/works/' + _employees.actualEmployee.id);
            },
            saveWork: function(item) {
                return $http.post(serviceBase + 'api/employees/works', item, {});
            },
            deleteWork: function(id) {
                return $http.delete(serviceBase + 'api/employees/works/' + id);
            },
            getMilitary: function() {
                return $http.get(serviceBase + 'api/employees/military/' + _employees.actualEmployee.id);
            },
            saveMilitary: function(item) {
                return $http.post(serviceBase + 'api/employees/military', item, {});
            },
            deleteMilitary: function (id) {
                return $http.delete(serviceBase + 'api/employees/military/' + id);
            },
            getMesAchievements: function() {
                return $http.get(serviceBase + 'api/employees/mesachievements/' + _employees.actualEmployee.id);
            },
            saveMesAchievement: function(item) {
                return $http.post(serviceBase + 'api/employees/mesachievements', item, {});
            },
            deleteMesAchievement: function (id) {
                return $http.delete(serviceBase + 'api/employees/mesachievements/' + id);
            },
            getRanks: function() {
                return $http.get(serviceBase + 'api/employees/ranks');
            },
            getPosts: function (serviceId) {
                if (serviceId)
                    return $http.get(serviceBase + 'api/employees/postsforservice/' + serviceId);
                else
                    return $http.get(serviceBase + 'api/employees/posts');
            },
            getServices: function() {
                return $http.get(serviceBase + 'api/employees/services');
            },
            getLocations: function() {
                return $http.get(serviceBase + 'api/employees/locations');
            },
            //properties and methods of discipline items
            disciplineItems: {
                actualDisciplineItemsType: '',
                getDisciplineItems: function(employeeId) {
                    return $http.get(serviceBase + 'api/employees/discipline/' + employeeId);
                },
                deleteDisciplineItem: function(id) {
                    return $http.delete(serviceBase + 'api/employees/discipline/' + id);
                },
                saveNewDisciplineItem: function (disciplineItem) {
                    return $http.post(serviceBase + 'api/employees/discipline', disciplineItem, {});
                }
            }
        }

        employeesServiceFactory.retirees = _retirees;
        employeesServiceFactory.dismissed = _dismissed;
        employeesServiceFactory.employees = _employees;
        employeesServiceFactory.common = _common;
        employeesServiceFactory.activityItems = _activityItems;

        return employeesServiceFactory;
    }
]);