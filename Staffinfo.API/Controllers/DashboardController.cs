﻿using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http;
using Staffinfo.DAL.Infrastructure;
using Staffinfo.DAL.Models;
using Staffinfo.DAL.Repositories;
using Staffinfo.DAL.Repositories.Interfaces;

namespace Staffinfo.API.Controllers
{
    [Authorize]
    [Route("api/dashboard")]
    public class DashboardController: ApiController
    {

        private readonly IUnitRepository _repository;

        public DashboardController(IUnitRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        [Route("api/dashboard/notifications")]
        public async Task<List<Notification>> GetNotifications(bool includeCustomNotifications = false, bool includeSertification = false, bool includeBirthDates = false, bool includeRanks = false, bool includeContracts = false)
        {
            return
                await
                    _repository.EmployeeRepository.GetNotifications(includeCustomNotifications, includeSertification,
                        includeBirthDates, includeRanks, includeContracts);
        }

        [HttpPost]
        [Route("api/dashboard/notifications")]
        public async Task<Notification> SaveNotification([FromBody] Notification notification)
        {
            return await _repository.EmployeeRepository.AddNotification(notification);
        }

        [HttpDelete]
        [Route("api/dashboard/notifications")]
        public async Task DeleteNotifications(int notificationId)
        {
            await _repository.EmployeeRepository.DeleteNotification(notificationId);
        }
    }
}