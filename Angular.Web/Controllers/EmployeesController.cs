using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Angular.Web.Context;
using Angular.Web.Models;

namespace Angular.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public EmployeesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Employees
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Employee>>> GetEmployees()
        {
            return await _context.Employees.ToListAsync();
        }

        // GET: api/Employees/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Employee>> GetEmployee(int id, bool withAddresses = false)
        {
            Employee employee;

            if (withAddresses)
            {
                employee = await _context.Employees.Include(x => x.Addresses).SingleOrDefaultAsync(x => x.Id.Equals(id));
            }
            else
            {
                employee = await _context.Employees.FindAsync(id);
            }
            
            if (employee == null)
            {
                return NotFound();
            }

            return employee;
        }

        private async Task CreateOrEditAddresses(List<Address> addresses)
        {
            var addressesToCreate = addresses.Where(x => x.Id.Equals(0));
            var addressesToEdit = addresses.Where(x => !x.Id.Equals(0));

            if (addressesToCreate.Any())
                await _context.AddRangeAsync(addressesToCreate);

            if (addressesToEdit.Any())
                _context.UpdateRange(addressesToEdit);
        }

        // PUT: api/Employees/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEmployee(int id, Employee employee)
        {
            if (id != employee.Id)
            {
                return BadRequest();
            }

            _context.Entry(employee).State = EntityState.Modified;

            try
            {
                await CreateOrEditAddresses(employee.Addresses);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmployeeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Employees
        [HttpPost]
        public async Task<ActionResult<Employee>> PostEmployee(Employee employee)
        {
            _context.Employees.Add(employee);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEmployee", new { id = employee.Id }, employee);
        }

        // DELETE: api/Employees/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Employee>> DeleteEmployee(int id)
        {
            var employee = await _context.Employees.FindAsync(id);
            if (employee == null)
            {
                return NotFound();
            }

            _context.Employees.Remove(employee);
            await _context.SaveChangesAsync();

            return employee;
        }

        private bool EmployeeExists(int id)
        {
            return _context.Employees.Any(e => e.Id == id);
        }
    }
}
