using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AttendanceSystem.CustomModels;
using AttendanceSystem.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AttendanceSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AttendanceController : ControllerBase
    {
        AttendanceSystemContext _Context;

        public AttendanceController(AttendanceSystemContext context)
        {
            _Context = context;
        }

        // GET: api/Attendance
        [HttpGet]
        //[Authorize]
        /*public IActionResult GetUserByToken()
        {
            var student
        }*/

        // GET: api/Attendance/5
        [HttpGet("{id}/{value}")]
        //[Authorize]
        public IActionResult GetByToken(int id, string value)
        {
            if (value == "Approved")
            {
                var Entries = (from days in _Context.DaysEntry
                               join Emp in _Context.Employee on days.EmpId equals Emp.EmpId
                               where Emp.EmpId == id && days.Status == value
                               orderby days.CurrDate descending
                               select new
                               {
                                   Emp.EmpName,
                                   days.CurrDate,
                                   days.Project,
                                   days.Duration,
                                   days.LeaveReason,
                                   days.Status,
                                   days.IsHoliday
                               }).Take(30).ToList();
                return Ok(Entries);
            }

            else
            {
                var Entries = (from days in _Context.DaysEntry
                               join Emp in _Context.Employee on days.EmpId equals Emp.EmpId
                               where Emp.EmpId == id && days.Status == value
                               orderby days.CurrDate ascending
                               select new
                               {
                                   Emp.EmpName,
                                   days.CurrDate,
                                   days.Project,
                                   days.Duration,
                                   days.LeaveReason,
                                   days.Status,
                                   days.IsHoliday
                               }).ToList();
                return Ok(Entries);
            }
           
        }


        // POST: api/Attendance
        [HttpPost]
        public IActionResult Post([FromBody] DaysEntryRequest value)
        {
            var days = _Context.DaysEntry.Where(x => x.CurrDate == value.CurrDate && x.EmpId == value.EmpId).FirstOrDefault();
            if (days != null)
            {
                return StatusCode(409);
            }
            else
            {
                DaysEntry Entry = new DaysEntry();
                Entry.EmpId = value.EmpId;
                Entry.ProjectId = value.ProjectId;
                Entry.Duration = value.Duration;
                Entry.LeaveReason = value.LeaveReason;
                Entry.CurrDate = value.CurrDate;
                Entry.CurrWeek = value.CurrWeek;
                Entry.IsHoliday = value.IsHoliday;
                Entry.Status = value.Status;
                _Context.DaysEntry.Add(Entry);
                _Context.SaveChanges();
                return Ok(Entry);
            }
        }

        // PUT: api/Attendance/5/pending/2021-5-4
        [HttpPut("{id}/{request}/{date}")]
        public IActionResult Put(int id,string request,DateTime date, [FromBody] DaysEntryRequest value)
        {
            DaysEntry Entry = _Context.DaysEntry.FirstOrDefault(x => x.EmpId==id && x.Status==request && x.CurrDate == date);
            Entry.CurrDate = value.CurrDate;
            Entry.CurrWeek = value.CurrWeek;
            Entry.EmpId = value.EmpId;
            Entry.ProjectId = value.ProjectId;
            Entry.Status = value.Status;
            Entry.IsHoliday = value.IsHoliday;
            Entry.LeaveReason = value.LeaveReason;
            Entry.Duration = value.Duration;
            _Context.DaysEntry.Update(Entry);
            _Context.SaveChanges();
            return Ok(Entry);
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
