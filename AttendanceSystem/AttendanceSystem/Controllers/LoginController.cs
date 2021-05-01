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

        [HttpGet("{id}")]
        public IActionResult GetUserByToken(int id)
        {
            var User = _Context.Employee.FirstOrDefault(x => x.EmpId == id);
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

        private Employee AuthenticateUser(LoginRequest Request)
        {
            var Users = _Context.Employee.ToList();
            var user = Users.FirstOrDefault(x => (x.Email == Request.Email) && (x.PassWord == Request.PassWord));
            return user;
        }

        // PUT: api/Login/2
        /*[HttpPut("{id}")]
        public void Put(int id, [FromBody]PassWordChangeRequest value)
        {
            var Users = _Context.Employee.ToList();
            var user = Users.Where(x => (x.UserName == value.UserName)&&(x.Email == value.Email));
        }*/
    }
}
