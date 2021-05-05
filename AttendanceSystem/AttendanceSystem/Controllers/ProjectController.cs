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
    public class ProjectController : ControllerBase
    {
        AttendanceSystemContext _Context;

        public ProjectController(AttendanceSystemContext context)
        {
            _Context = context;
        }


        // GET: api/Project
        [HttpGet]
        public IActionResult Get()
        {
            var Projects = _Context.Project.ToList();
            return Ok(Projects);
        }

        // GET: api/Project/5
        [HttpGet("{value}")]
        public IActionResult GetProject(string value)
        {
            var proj = _Context.Project.FirstOrDefault(x => x.ProjectDes == value);
            return Ok(proj);
        }

        // POST: api/Project
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/Project/5
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
