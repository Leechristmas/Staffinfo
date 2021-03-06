﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using Staffinfo.API.Models;
using Staffinfo.DAL.Models;
using Staffinfo.DAL.Repositories.Interfaces;

namespace Staffinfo.API.Controllers
{
    [Route("api/employees/activity")]
    [Authorize]
    public class ActivityItemsController : ApiController
    {
        private readonly IUnitRepository _repository;

        public ActivityItemsController(IUnitRepository repository)
        {
            _repository = repository;
        }


        #region WorkItems

        [HttpGet]
        [Route("api/employees/activity/work/{emplId:int}")]
        public async Task<IEnumerable<WorkTermViewModel>> GetWorks(int emplId)
        {
            IEnumerable<WorkTerm> works = await _repository.WorkTermRepository.WhereAsync(i => i.EmployeeId == emplId);
            return works.Select(i => new WorkTermViewModel(i));
        }


        [HttpPut]
        [Route("api/employees/activity/work/{id:int}")]
        public async Task EditWork(int id, [FromBody] WorkTermViewModel value)
        {
            WorkTerm original = await _repository.WorkTermRepository.SelectAsync(id);
            if (original != null)
            {
                original.EmployeeId = value.EmployeeId;
                original.StartDate = value.StartDate;
                original.FinishDate = value.FinishDate.Value;
                original.LocationId = value.LocationId;
                original.Post = value.Post;
                original.Description = value.Description;

                _repository.WorkTermRepository.Update(original);
                await _repository.WorkTermRepository.SaveAsync();
            }
        }

        [HttpDelete]
        [Route("api/employees/activity/work/{id:int}")]
        public async Task DeleteWork(int id)
        {
            await _repository.WorkTermRepository.Delete(id);
            await _repository.WorkTermRepository.SaveAsync();
        }

        [Route("api/employees/activity/work")]
        public async Task PostWork([FromBody] WorkTerm value)
        {
            WorkTerm workTerm = new WorkTerm
            {
                Id = 0,
                EmployeeId = value.EmployeeId,
                Description = value.Description,
                LocationId = value.LocationId,
                StartDate = value.StartDate,
                FinishDate = value.FinishDate,
                Post = value.Post
            };
            _repository.WorkTermRepository.Create(workTerm);
            await _repository.WorkTermRepository.SaveAsync();
        }

        #endregion

        #region Military

        [HttpPost]
        [Route("api/employees/activity/military")]
        public async Task PostMilitary([FromBody] MilitaryService value)
        {
            MilitaryService militaryService = new MilitaryService
            {
                Id = 0,
                StartDate = value.StartDate,
                FinishDate = value.FinishDate,
                EmployeeId = value.EmployeeId,
                Description = value.Description,
                LocationId = value.LocationId,
                Rank = value.Rank
            };
            _repository.MilitaryServiceRepository.Create(militaryService);
            await _repository.MilitaryServiceRepository.SaveAsync();
        }

        [HttpPut]
        [Route("api/employees/activity/military/{id:int}")]
        public async Task PutMilitary(int id, [FromBody] MilitaryServiceViewModel model)
        {
            MilitaryService original = await _repository.MilitaryServiceRepository.SelectAsync(id);
            if (original != null)
            {
                original.StartDate = model.StartDate;
                original.FinishDate = model.FinishDate;
                original.EmployeeId = model.EmployeeId;
                original.LocationId = model.LocationId;
                original.Rank = model.Rank;
                original.Description = model.Description;

                _repository.MilitaryServiceRepository.Update(original);
                await _repository.MilitaryServiceRepository.SaveAsync();
            }
        }

        [HttpGet]
        [Route("api/employees/activity/military/{emplId:int}")]
        public async Task<IEnumerable<MilitaryServiceViewModel>> GetMilitary(int emplId)
        {
            IEnumerable<MilitaryService> military =
                await _repository.MilitaryServiceRepository.WhereAsync(i => i.EmployeeId == emplId);
            return military.Select(i => new MilitaryServiceViewModel(i));
        }

        [HttpDelete]
        [Route("api/employees/activity/military/{id:int}")]
        public async Task DeleteMilitary(int id)
        {
            await _repository.MilitaryServiceRepository.Delete(id);
            await _repository.MilitaryServiceRepository.SaveAsync();
        }

        #endregion

        #region Sertifications

        [HttpGet]
        [Route("api/employees/activity/sertification/{employeeId:int}")]
        public async Task<IEnumerable<SertificationViewModel>> GetSertifications(int employeeId)
        {
            IEnumerable<Sertification> sertifications =
                await _repository.SertificationRepository.WhereAsync(i => i.EmployeeId == employeeId);
            return sertifications.Select(i => new SertificationViewModel(i));
        }

        [HttpPut]
        [Route("api/employees/activity/sertification/{id:int}")]
        public async Task EditSertification(int id, [FromBody] SertificationViewModel value)
        {
            Sertification original = await _repository.SertificationRepository.SelectAsync(id);
            if (original != null)
            {
                original.EmployeeId = value.EmployeeId;
                original.DueDate = value.DueDate;
                original.Description = value.Description;

                _repository.SertificationRepository.Update(original);
                await _repository.SertificationRepository.SaveAsync();
            }
        }

        [HttpPost]
        [Route("api/employees/activity/sertification")]
        public async Task PostSertification([FromBody] SertificationViewModel model)
        {
            Sertification sertification = new Sertification
            {
                Id = 0,
                EmployeeId = model.EmployeeId,
                DueDate = model.DueDate,
                Description = model.Description
            };
            _repository.SertificationRepository.Create(sertification);
            await _repository.SertificationRepository.SaveAsync();
        }

        [HttpDelete]
        [Route("api/employees/activity/sertification/{id:int}")]
        public async Task DeleteSertification(int id)
        {
            await _repository.SertificationRepository.Delete(id);
            await _repository.SertificationRepository.SaveAsync();
        }

        #endregion

        #region OutFromOffice

        [HttpPost]
        [Route("api/employees/activity/out-from-office")]
        public async Task PostOutFromOffice([FromBody] OutFromOfficeViewModel model)
        {
            OutFromOffice outFromOffice = new OutFromOffice
            {
                Id = 0,
                EmployeeId = model.EmployeeId,
                StartDate = model.StartDate,
                FinishDate = model.FinishDate,
                Cause = model.Cause,
                Description = model.Description
            };
            _repository.OutFromOfficeRepository.Create(outFromOffice);
            await _repository.OutFromOfficeRepository.SaveAsync();
        }

        [HttpPut]
        [Route("api/employees/activity/out-from-office/{id:int}")]
        public async Task EditOutFromOffice(int id, [FromBody] OutFromOfficeViewModel value)
        {
            OutFromOffice original = await _repository.OutFromOfficeRepository.SelectAsync(id);
            if (original != null)
            {
                original.StartDate = value.StartDate;
                original.FinishDate = value.FinishDate;
                original.EmployeeId = value.EmployeeId;
                original.Cause = value.Cause;
                original.Description = value.Description;

                _repository.OutFromOfficeRepository.Update(original);
                await _repository.OutFromOfficeRepository.SaveAsync();
            }
        }

        [HttpGet]
        [Route("api/employees/activity/out-from-office/{employeeId:int}")]
        public async Task<IEnumerable<OutFromOfficeViewModel>> GetOutFromOffice(int employeeId)
        {
            IEnumerable<OutFromOffice> outFromOffice =
                await _repository.OutFromOfficeRepository.WhereAsync(i => i.EmployeeId == employeeId);
            return outFromOffice.Select(i => new OutFromOfficeViewModel(i));
        }

        [HttpDelete]
        [Route("api/employees/activity/out-from-office/{id:int}")]
        public async Task DeleteOutFromOfice(int id)
        {
            await _repository.OutFromOfficeRepository.Delete(id);
            await _repository.OutFromOfficeRepository.SaveAsync();
        }

        #endregion

        #region Discipline

        [HttpPost]
        [Route("api/employees/activity/discipline")]
        public async Task PostDisciplineItem([FromBody] DisciplineItemViewModel model)
        {
            DisciplineItem disciplineItem = new DisciplineItem
            {
                Id = 0,
                EmployeeId = model.EmployeeId,
                Title = model.Title,
                ItemType = model.ItemType,
                Date = model.Date,
                AwardOrFine = model.AwardOrFine,
                Description = model.Description
            };
            _repository.DisciplineItemRepository.Create(disciplineItem);
            await _repository.DisciplineItemRepository.SaveAsync();
        }

        [HttpGet]
        [Route("api/employees/activity/discipline/{emplId:int}")]
        public async Task<IEnumerable<DisciplineItemViewModel>> GetDisciplineItems(int emplId)
        {
            IEnumerable<DisciplineItem> disciplineItems =
                await _repository.DisciplineItemRepository.WhereAsync(i => i.EmployeeId == emplId);
            return disciplineItems.Select(i => new DisciplineItemViewModel(i));
        }

        [HttpPut]
        [Route("api/employees/activity/discipline/{id:int}")]
        public async Task EditDisciplineItem(int id, [FromBody] DisciplineItemViewModel value)
        {
            DisciplineItem original = await _repository.DisciplineItemRepository.SelectAsync(id);
            if (original != null)
            {
                original.Date = value.Date;
                original.EmployeeId = value.EmployeeId;
                original.AwardOrFine = value.AwardOrFine;
                original.Title = value.Title;
                original.Description = value.Description;
                original.ItemType = value.ItemType;

                _repository.DisciplineItemRepository.Update(original);
                await _repository.DisciplineItemRepository.SaveAsync();
            }
        }

        [HttpDelete]
        [Route("api/employees/activity/discipline/{id:int}")]
        public async Task DeleteDisciplineItem(int id)
        {
            await _repository.DisciplineItemRepository.Delete(id);
            await _repository.DisciplineItemRepository.SaveAsync();
        }

        #endregion

        #region MesAchievements

        [HttpPost]
        [Route("api/employees/activity/mesachievements")]
        public async Task PostMesAchievement([FromBody] MesAchievement value)
        {
            MesAchievement mesAchievement = new MesAchievement
            {
                Id = 0,
                StartDate = value.StartDate,
                FinishDate = value.FinishDate,
                LocationId = value.LocationId,
                PostId = value.PostId,
                RankId = value.RankId,
                EmployeeId = value.EmployeeId,
                Description = value.Description
            };
            _repository.MesAchievementRepository.Create(mesAchievement);
            await _repository.MesAchievementRepository.SaveAsync();
        }

        [HttpGet]
        [Route("api/employees/activity/mesachievements/{emplId:int}")]
        public async Task<IEnumerable<MesAchievementViewModel>> GetMesAchiements(int emplId)
        {
            IEnumerable<MesAchievement> mesAchievements =
                await _repository.MesAchievementRepository.WhereAsync(i => i.EmployeeId == emplId);
            return mesAchievements.Select(i => new MesAchievementViewModel(i));
        }

        [HttpDelete]
        [Route("api/employees/activity/mesachievements/{id:int}")]
        public async Task DeleteMesAchievement(int id)
        {
            await _repository.MesAchievementRepository.Delete(id);
            await _repository.MesAchievementRepository.SaveAsync();
        }

        [HttpPut]
        [Route("api/employees/activity/mesachievements/{id:int}")]
        public async Task EditMesAchievement(int id, [FromBody] MesAchievementViewModel value)
        {
            MesAchievement original = await _repository.MesAchievementRepository.SelectAsync(id);
            if (original != null)
            {
                original.StartDate = value.StartDate;
                original.FinishDate = value.FinishDate;
                original.PostId = value.PostId;
                original.EmployeeId = value.EmployeeId;
                original.Description = value.Description;
                original.LocationId = value.LocationId;
                original.RankId = value.RankId;

                _repository.MesAchievementRepository.Update(original);
                await _repository.MesAchievementRepository.SaveAsync();
            }
        }

        #endregion

    }
}
