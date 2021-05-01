using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private IConfiguration _config;
        AttendanceSystemDBContext _context;

        public LoginController(IConfiguration config, AttendanceSystemDBContext context)
        {
            _config = config;
            _context = context;
        }

        // POST: api/Login
        [AllowAnonymous]
        [HttpPost]
        public IActionResult LoginUser([FromBody] Employee login)
        {
            IActionResult response = Unauthorized();
            var user = AuthenticateUser(login);

            if (user != null)
            {
                var tokenstring = GenerateJSONWebToken(user);
                response = Ok(new { token = tokenstring });
            }
            return response;
        }

        private string GenerateJSONWebToken(Employee userInfo)
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

        private Employee AuthenticateUser(Employee login)
        {
            Employee user = _context.Employee.FirstOrDefault(x => x.Email == login.Email && x.PassWord == login.PassWord);

            return user;
        }
    }
}
