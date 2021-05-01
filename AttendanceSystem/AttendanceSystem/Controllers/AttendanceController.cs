using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
        public void Post([FromBody] string value)
        {
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
