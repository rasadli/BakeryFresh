using System;
using System.Collections.Generic;

#nullable disable

namespace Bakery_API.Models
{
    public partial class UserStatus
    {
        public int UserId { get; set; }
        public string FirstName { get; set; }
        public string SecondName { get; set; }
        public string Email { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }
        public int UserStatus1 { get; set; }
        public int StatusId { get; set; }
        public string StatusName { get; set; }
    }
}
