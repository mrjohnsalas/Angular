using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Angular.Web.Models
{
    public class Address
    {
        public int Id { get; set; }

        public string Street { get; set; }

        public string City { get; set; }

        public int EmployeeId { get; set; }
    }
}
