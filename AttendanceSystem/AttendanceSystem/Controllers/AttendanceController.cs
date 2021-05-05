﻿using System;
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


        // GET: api/Attendance/5
        [HttpGet("{id}")]
        //[Authorize]
        public IActionResult GetByToken(int id)
        {
            var Entries = (from days in _Context.DaysEntry join proj in _Context.Project
                           on days.ProjectId equals proj.ProjectId where days.EmpId == id 
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
            DaysEntry Entry = new DaysEntry();
            Entry.EmpId = value.EmpId;
            Entry.ProjectId = value.ProjectId;
            Entry.Duration = value.Duration;
            Entry.LeaveReason = value.LeaveReason;
            Entry.CurrDate = value.CurrDate;
            Entry.IsHoliday = value.IsHoliday;
            Entry.CurrWeek = value.CurrWeek;
            Entry.Status = value.Status;
            _Context.DaysEntry.Add(Entry);
            _Context.SaveChanges();
            return Ok("Entry added");
        }

        // PUT: api/Attendance/5
        [HttpPut("{id}/{request}/{date}")]
        public IActionResult Put(int id, string request, DateTime date, [FromBody] DaysEntryRequest value)
        {
            DaysEntry Entry = _Context.DaysEntry.FirstOrDefault(x => x.EmpId == id && x.Status == request && x.CurrDate == date);
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