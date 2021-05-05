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
    public class EmailController : ControllerBase
    {
        AttendanceSystemContext _Context;

        public EmailController(AttendanceSystemContext context)
        {
            _Context = context;
        }

        // GET: api/Email
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Email/5
        [HttpGet("{id}")]
        //[Authorize]
        public IActionResult GetEmail(string id)
        {
            var Entries = (from days in _Context.DaysEntry
                           join Emp in _Context.Employee on days.EmpId equals Emp.EmpId
                           where days.HashId == id
                           orderby days.CurrDate ascending
                           select new
                           {
                               Emp.Email
                           }).Distinct().ToList();
            return Ok(Entries);

        }

        // POST: api/Email
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/Email/5
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
