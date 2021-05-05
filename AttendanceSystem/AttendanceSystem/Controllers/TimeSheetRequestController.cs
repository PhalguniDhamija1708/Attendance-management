﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AttendanceSystem.CustomModels;
using AttendanceSystem.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AttendanceSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TimeSheetRequestController : ControllerBase
    {
        AttendanceSystemContext _Context;

        public TimeSheetRequestController(AttendanceSystemContext context)
        {
            _Context = context;
        }

        // GET: api/TimeSheetRequest
        [HttpGet]
       /* public IActionResult Get()
        {
            
        }*/

        // GET: api/TimeSheetRequest/5
        [HttpGet("{id}")]
        public IActionResult changeValues(int id)
        {
            var Response = _Context.Employee.Where(x => x.ApproverId == id).ToList();
            return Ok(Response);
        }
        
        // POST: api/TimeSheetRequest
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/TimeSheetRequest/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody]RequestButton value)
        {
            var Entry = _Context.DaysEntry.Where(x => x.EmpId == id && x.Status == value.previousStatus && x.CurrDate>= value.StartDate && x.CurrDate <= value.EndDate).ToList();
            Entry.ForEach(a => { a.Status = value.newStatus; a.HashId = value.HashId; });
           // Entry.ForEach
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
