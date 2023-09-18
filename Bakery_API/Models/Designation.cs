using System;
using System.Collections.Generic;

#nullable disable

namespace Bakery_API.Models
{
    public partial class Designation
    {
        public Designation()
        {
            Members = new HashSet<Member>();
        }

        public int DesignationId { get; set; }
        public string DesignationName { get; set; }

        public virtual ICollection<Member> Members { get; set; }
    }
}
