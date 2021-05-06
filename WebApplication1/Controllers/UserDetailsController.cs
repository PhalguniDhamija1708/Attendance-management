using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserDetailsController : ControllerBase
    {
        AttendanceSystemDBContext _context;
        public UserDetailsController(AttendanceSystemDBContext context)
        {
            _context = context;
        }
       
        // GET: api/UserDetails
        [HttpGet]
        public IActionResult GetDetails()
        {
            var details = _context.Employee.ToList();
            return Ok(details);
        }

        // GET: api/UserDetails/5
        [HttpGet]
        [Route("{email}")]
        public IActionResult GetUser(string email)
        {
            var student = _context.Employee.FirstOrDefault(stud => stud.Email == email);
            return Ok(student);
        }

        // POST: api/UserDetails
        [HttpPost]
        public IActionResult AddDetails([FromBody] Employee temp)
        {
            Employee employee = new Employee();
            employee.UserName = temp.UserName;
            employee.PassWord = temp.PassWord;
            employee.Email = temp.Email;
            employee.EmpName = temp.EmpName;
            employee.ApproverId = temp.ApproverId;
            _context.Employee.Add(employee);
            _context.SaveChanges();
            return Ok("Successfully Added");
        }

        // PUT: api/UserDetails/5
        [HttpPut("{email}")]
        public ActionResult UpdateDetails(string email, [FromBody] EmployeeRequest temp)
        {
            Employee employee = _context.Employee.FirstOrDefault(emp => emp.Email == email);
            if(employee == null)
            {
                return NotFound(new Employee());
            }
            employee.PassWord = temp.PassWord;
            _context.Employee.Update(employee);
            _context.SaveChanges();
            return Ok("Successfully updated");
        }
       
        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
