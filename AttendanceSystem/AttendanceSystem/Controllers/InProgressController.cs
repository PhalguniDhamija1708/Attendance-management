using System;
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
    public class InProgressController : ControllerBase
    {
        AttendanceSystemContext _Context;

        public InProgressController(AttendanceSystemContext context)
        {
            _Context = context;
        }

        // GET: api/InProgress
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/InProgress/5
        [HttpGet("{id}")]
        public IActionResult GetHashforEmp(int id)
        {
            var Entries = (from days in _Context.DaysEntry
                           join Emp in _Context.Employee on days.EmpId equals Emp.EmpId
                           where Emp.EmpId == id && days.Status == "In Progress"
                           orderby days.CurrDate ascending
                           select new
                           {
                               Emp.EmpName,
                               days.HashId
                           }).Distinct().ToList();
            return Ok(Entries);
        }

        // POST: api/InProgress
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/InProgress/5
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
