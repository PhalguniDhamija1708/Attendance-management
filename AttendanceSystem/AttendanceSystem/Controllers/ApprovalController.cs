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
    public class ApprovalController : ControllerBase
    {
        AttendanceSystemContext _Context;

        public ApprovalController(AttendanceSystemContext context)
        {
            _Context = context;
        }

        // GET: api/Approval

        // GET: api/Approval/5
        [HttpGet("{id}")]
        public IActionResult GetEmployeeEntry(int id)
        {
            var Entries = (from days in _Context.DaysEntry
                           join Emp in _Context.Employee on days.EmpId equals Emp.EmpId
                           where Emp.ApproverId == id && days.Status == "In Progress"
                           orderby days.CurrDate descending
                           select new
                           {
                               Emp.EmpName,
                               days.HashId,
                               Emp.Email
                           }).Distinct().ToList();
            return Ok(Entries);
        }

        
        // POST: api/Approval
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/Approval/5
        [HttpPut("{id}")]
        public IActionResult Put(string id)
        {
            var Entry = _Context.DaysEntry.Where(x => x.HashId == id).ToList();
            Entry.ForEach(a => { a.Status = "Approved"; a.HashId = null; });
            _Context.SaveChanges();
            return Ok(Entry);
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            var Entry = _Context.DaysEntry.Where(x => x.HashId == id).ToList();
            Entry.ForEach(x => _Context.DaysEntry.Remove(x));
            _Context.SaveChanges();
            return Ok();
        }
    }
}
