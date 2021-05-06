using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PortalController : ControllerBase
    {
        AttendanceSystemDBContext _context;
        public PortalController( AttendanceSystemDBContext context)
        {
            _context = context;
        }

        // GET: api/Portal
        [HttpGet]
        public IActionResult GetEmployeeDetails()
        {
            var employee = _context.DaysEntry.ToList();
            /*employee.ForEach((emp) =>
            {
                emp.Project = _context.Project.FirstOrDefault(p => p.ProjectId == emp.ProjectId);
            });*/
            return Ok(employee);
        }

        // GET: api/Portal/5
        [HttpGet("{id}")]
        public IActionResult GetEmplyeeById(int id)
        {
            var employee = _context.DaysEntry.FirstOrDefault(x => x.EmpId == id);
            return Ok(employee);
        }

        // POST: api/Portal
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/Portal/5
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
