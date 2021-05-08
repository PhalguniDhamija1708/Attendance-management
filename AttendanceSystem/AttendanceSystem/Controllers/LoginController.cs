using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AttendanceSystem.CustomModels;
using AttendanceSystem.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace AttendanceSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        AttendanceSystemContext _Context;
        private IConfiguration _config;

        public LoginController(AttendanceSystemContext context, IConfiguration config)
        {
            _Context = context;
            _config = config;
        }

        //Api return the Login User Info.
        [HttpGet("{id}")]
        public IActionResult GetUserByToken(int id)
        {
            var User = (from emp in _Context.Employee
                        where emp.EmpId == id
                        select new
                        {
                            emp.EmpName,
                            emp.Email,
                            emp.ApproverId
                        }).FirstOrDefault();
            return Ok(User);
        }


        // POST: api/Login
        [HttpPost]
        public IActionResult Post([FromBody] LoginRequest value)
        {
            IActionResult response = Unauthorized();
            var user = AuthenticateUser(value);

            if (user != null)
            {
                var tokenString = GenerateJSONWebToken(user);
                response = Ok(new { token = tokenString, Id = user.EmpId });
            }

            return response;
        }

        //Jwt Token.
        private object GenerateJSONWebToken(object user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(_config["Jwt:Issuer"],
              _config["Jwt:Issuer"],
              null,
              expires: DateTime.Now.AddMinutes(120),
              signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        //check for the authorize User
        private Employee AuthenticateUser(LoginRequest Request)
        {
            var Users = _Context.Employee.ToList();
            var user = Users.FirstOrDefault(x => (x.Email == Request.Email) && (x.PassWord == Request.PassWord));
            return user;
        }

        //Api for forget password.
        // PUT: api/Login/vikas84uu@gmail.com
        [HttpPut("{Email}")]
        public ActionResult UpdateDetails(string email, [FromBody] PassWordChangeRequest temp)
        {
            Employee employee = _Context.Employee.FirstOrDefault(emp => emp.Email == email);
            if (employee == null)
            {
                return NotFound(new Employee());
            }
            employee.PassWord = temp.PassWord;
            _Context.Employee.Update(employee);
            _Context.SaveChanges();
            return Ok("Successfully updated");
        }
    }
}
