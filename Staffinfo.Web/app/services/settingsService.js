﻿'use strict';
app.factory('settingsService', ['$userSettings', function ($userSettings) {

    var settingsServiceFactory = {};

    var _calendarSettings =
    {
        calendarNotificationTypes: [
        {
            key: 'Birthdays',
            title: 'Дни рождения'
        },
        {
            key: 'Sertifications',
            title: 'Аттестация'
        },
        {
            key: 'Custom',
            title: 'Пользовательские'
        }],
        loadIncludedNotificatoinTypes: function () {
            return this.calendarNotificationTypes.filter(function (item) {
                if ($userSettings.get(item.key))
                    return true;
                else
                    return false;
            });
        },
        includedNotificatoinTypes: [],
        customAreIncluded: function () {
            if (this.includedNotificatoinTypes.find(x => x.key === 'Custom')) return true;
            else return false;
        },
        birthdaysAreIncluded: function () {
            if (this.includedNotificatoinTypes.find(x => x.key === 'Birthdays')) return true;
            else return false;
        },
        sertificationsAreIncluded: function () {
            if (this.includedNotificatoinTypes.find(x => x.key === 'Sertifications')) return true;
            else return false;
        }
    }

    settingsServiceFactory.calendarSettings = _calendarSettings;

    return settingsServiceFactory;
}]);