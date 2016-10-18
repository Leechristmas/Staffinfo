﻿using System;
using Ninject;
using Staffinfo.DAL.Context;
using Staffinfo.DAL.Models;
using Staffinfo.DAL.Repositories.Interfaces;

namespace Staffinfo.DAL.Repositories
{
    /// <summary>
    /// Unit repository (Unit Of Work pattern)
    /// </summary>
    public class StaffUnitRepository: IUnitRepository, IStaffRepository
    {
        [Inject]
        public StaffContext StaffContext { get; set; }
        
        public StaffUnitRepository(IRepository<Address> addressRepository, IRepository<Employee> employeeRepository, IRepository<Location> locationRepository, IRepository<MesAchievement> mesAchievementRepository, IRepository<MilitaryService> militaryServiceRepository, IRepository<Passport> passportRepository, IRepository<Post> postRepository, IRepository<Rank> rankRepository, IRepository<Service> serviceRepository, IRepository<WorkTerm> workTermRepository)
        {
            AddressRepository = addressRepository;
            EmployeeRepository = employeeRepository;
            LocationRepository = locationRepository;
            MesAchievementRepository = mesAchievementRepository;
            MilitaryServiceRepository = militaryServiceRepository;
            PassportRepository = passportRepository;
            PostRepository = postRepository;
            RankRepository = rankRepository;
            ServiceRepository = serviceRepository;
            WorkTermRepository = workTermRepository;
        }

        public IRepository<Address> AddressRepository { get; }

        public IRepository<Employee> EmployeeRepository { get; }

        public IRepository<Location> LocationRepository { get; }

        public IRepository<MesAchievement> MesAchievementRepository { get; }

        public IRepository<MilitaryService> MilitaryServiceRepository { get; }

        public IRepository<Passport> PassportRepository { get; }

        public IRepository<Post> PostRepository { get; }

        public IRepository<Rank> RankRepository { get; }

        public IRepository<Service> ServiceRepository { get; }

        public IRepository<WorkTerm> WorkTermRepository { get; }

        #region Implementing interface IDisposable

        // Flag: Убит ли объект?
        private bool disposed;

        /// <summary>
        /// Осуществляет освобождение ресурсов по запросу пользователя.
        /// </summary>
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (disposed)
                return;

            if (disposing)
            {
                // Освобождение управляемых ресурсов.
            }

            // Освобождение неуправляемых ресурсов.

            disposed = true;
        }

        #endregion Implementing interface IDisposable
    }
}