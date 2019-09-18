using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Angular.Web.Context;
using Angular.Web.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Angular.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AddressesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AddressesController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost("delete/list")]
        public async Task<ActionResult> DeleteList([FromBody] List<int> ids)
        {
            try
            {
                var addresses = ids.Select(x => new Address { Id = x }).ToList();
                _context.RemoveRange(addresses);
                await _context.SaveChangesAsync();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
            return Ok();
        }
    }
}