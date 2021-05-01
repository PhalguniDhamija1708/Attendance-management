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
        [HttpGet("{id}", Name = "Get")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/UserDetails
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/UserDetails/5
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
