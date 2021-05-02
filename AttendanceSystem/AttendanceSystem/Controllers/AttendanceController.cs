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
            var Entries = (from days in _Context.DaysEntry join proj in _Context.Project
                           on days.ProjectId equals proj.ProjectId where days.EmpId == id && days.Status == value
                           select new {
                               days.CurrDate,
                               proj.ProjectDes,
                               days.Duration,
                               days.LeaveReason,
                               days.Status
                           }).ToList();
            return Ok(Entries);
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

        // PUT: api/Attendance/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
