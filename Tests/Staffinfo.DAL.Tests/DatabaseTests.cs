﻿using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Staffinfo.API;
using Staffinfo.DAL.Context;
using Staffinfo.DAL.Models;
using Staffinfo.DAL.Repositories;
using Staffinfo.DAL.Repositories.Interfaces;
using Staffinfo.API.Models;

namespace Staffinfo.DAL.Tests
{
    /// <summary>
    /// Includes unit-tests for Unit repository
    /// </summary>
    [TestClass]
    public class DatabaseTests
    {
        private readonly IUnitRepository _staffUnitRepository = new StaffUnitRepository(
            new Repository<Address>(new StaffContext()), 
            new Repository<Employee>(new StaffContext()), 
            new Repository<Location>(new StaffContext()),
            new Repository<MesAchievement>(new StaffContext()),
            new Repository<MilitaryService>(new StaffContext()),
            new Repository<Passport>(new StaffContext()),
            new Repository<Post>(new StaffContext()),
            new Repository<Rank>(new StaffContext()),
            new Repository<Service>(new StaffContext()), 
            new Repository<WorkTerm>(new StaffContext()),
            new Repository<Dismissed>(new StaffContext()),
            new Repository<DisciplineItem>(new StaffContext()),
            new Repository<OutFromOffice>(new StaffContext()),
            new Repository<Sertification>(new StaffContext()));

        //[TestMethod]
        //public void Select_GetAllAddresses()
        //{
        //    IEnumerable<Address> addresses;

        //    addresses = _staffUnitRepository.AddressRepository.Select();

        //    Assert.IsTrue(addresses.Any());
        //}

        //[TestMethod]
        //public void Add_And_RemoveAddress()
        //{
        //    Address address = new Address()
        //    {
        //        City = "Test_city",
        //        Street = "Test_street",
        //        House = "test_h",
        //        Flat = "t_f"
        //    };
        //    int addressId;

        //    address = _staffUnitRepository.AddressRepository.Create(address);
        //    _staffUnitRepository.AddressRepository.Save();

        //    addressId = address.Id;
        //    _staffUnitRepository.AddressRepository.Delete(addressId);
        //    _staffUnitRepository.AddressRepository.Save();
        //    Address removed = _staffUnitRepository.AddressRepository.Select(addressId);


        //    Assert.IsTrue(addressId > 0);
        //    Assert.IsNull(removed);
        //}

        [TestMethod]
        public void Select_Employees()
        {
            var t = _staffUnitRepository.EmployeeRepository.SelectAsync().Result;
            _staffUnitRepository.EmployeeRepository.Delete(2);
            Task.WaitAll(_staffUnitRepository.EmployeeRepository.SaveAsync());
            var t2 = _staffUnitRepository.EmployeeRepository.SelectAsync().Result;
        }

        [TestMethod]
        public async Task TransferToDismissed()
        {
            await _staffUnitRepository.EmployeeRepository.Database.ExecuteSqlCommandAsync(
                "dbo.pr_TransferEmployeeToDismissed @employeeId, @dismissalDate, @clause, @clauseDescription",
                new SqlParameter("@employeeId", 2),
                new SqlParameter("@dismissalDate", DateTime.Now),
                new SqlParameter("@clause", "333"),
                new SqlParameter("@clauseDescription", "azaza"));
        }

        [TestMethod]
        public void Get_Expirience()
        {
            //var days = _staffUnitRepository.EmployeeRepository.GetExpirience(1, EmployeeRepositoryHelper.Expirience.Common).Result;
            var tt = _staffUnitRepository.EmployeeRepository.GetServicesStructure().Result;
        }

        [TestMethod]
        public async Task Get_Seniority_Statistic()
        {
            var tt = await _staffUnitRepository.EmployeeRepository.GetSeniorityStatistic(5, 0, 32, EmployeeRepositoryHelper.Seniority.Total);
        }

        [TestMethod]
        public async Task Get_Notifications()
        {
            var tt = await _staffUnitRepository.EmployeeRepository.GetNotifications(true, true, true);
        }

        [TestMethod]
        public async Task Manipulate_Notification()
        {
            //await _staffUnitRepository.EmployeeRepository.AddNotification(new Notification()
            //{
            //    Author = "aaa",
            //    Title = "bbb",
            //    Details = "ccc",
            //    DueDate = new DateTime(2016, 12, 13)
            //});
            await _staffUnitRepository.EmployeeRepository.DeleteNotification(6);
        }

        [TestMethod]
        public void Add_User()
        {
            AuthRepository authRepository = new AuthRepository();
            IdentityResult identityResult = authRepository.RegisterUser(new UserModel()
            {
                UserName = "dshevchuk",
                Password = "qwerty123456",
                ConfirmPassword = "qwerty123456"
            }).Result;
        }

        [TestMethod]
        public void Get_All_Discipline_Items()
        {
            var t = _staffUnitRepository.DisciplineItemRepository.SelectAsync().Result;
        }

        [TestMethod]
        public void Delete_Employee()
        {
            _staffUnitRepository.EmployeeRepository.Delete(2);
            _staffUnitRepository.EmployeeRepository.SaveAsync();
        }

        [TestMethod]
        public void Get_OutFromOffice()
        {
            var t = _staffUnitRepository.OutFromOfficeRepository.SelectAsync().Result;
        }

        [TestMethod]
        public void Get_Sertifications()
        {
            var t = _staffUnitRepository.SertificationRepository.SelectAsync().Result;
        }

        [TestMethod]
        public void Add_Employee()
        {
            EmployeeViewModel e = new EmployeeViewModel
            {
                EmployeeLastname = "aaa",
                EmployeeFirstname = "bbb",
                EmployeeMiddlename = "ccc",
                BirthDate = DateTime.Now
            };
            var t = EmployeeViewModelMin.GetEmployeeFromModel(e);
            t.Id = 0;
            t.AddressId = 1;
            t.PassportId = 1;
            t.RetirementDate = null;
            var l1 = _staffUnitRepository.EmployeeRepository;

            Employee newEmpl =
                _staffUnitRepository.EmployeeRepository.Create(t);


            var l2 = _staffUnitRepository.EmployeeRepository;
            Task.WaitAll(_staffUnitRepository.EmployeeRepository.SaveAsync());
            var t2 = _staffUnitRepository.EmployeeRepository.SelectAsync().Result;
        }

    }
}