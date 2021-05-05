﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AttendanceSystem.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AttendanceSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DisplayController : ControllerBase
    {

        AttendanceSystemContext _Context;

        public DisplayController(AttendanceSystemContext context)
        {
            _Context = context;
        }

        // GET: api/Display
       /* [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }*/

        // GET: api/Display/5
        [HttpGet]
        [Route("{value}")]
        public IActionResult GetHash(string value)
        {
            var Entries = (from days in _Context.DaysEntry
                           join Emp in _Context.Employee on days.EmpId equals Emp.EmpId
                           where days.HashId == value
                           orderby days.CurrDate ascending
                           select new
                           {
                               Emp.EmpName,
                               days.CurrDate,
                               days.Project,
                               days.Duration,
                               days.LeaveReason,
                               days.Status,
                               days.IsHoliday,
                               days.HashId
                           }).ToList();
            return Ok(Entries);

        }

        // POST: api/Display
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/Display/5
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