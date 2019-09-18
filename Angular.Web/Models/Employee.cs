using System;
using System.Collections.Generic;

namespace Angular.Web.Models
{
    public class Employee
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public DateTime Birthdate { get; set; }

        public List<Address> Addresses { get; set; }
    }
}