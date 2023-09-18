using System;
using System.Collections.Generic;

#nullable disable

namespace Bakery_API.Models
{
    public partial class Member
    {
        public int MemberId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int? MemberDesignation { get; set; }
        public string Image { get; set; }
        public string Facebook { get; set; }
        public string Instagram { get; set; }
        public string Twitter { get; set; }
        public string Pinterest { get; set; }

        public virtual Designation MemberDesignationNavigation { get; set; }
    }
}
