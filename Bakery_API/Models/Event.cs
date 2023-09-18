using System;
using System.Collections.Generic;

#nullable disable

namespace Bakery_API.Models
{
    public partial class Event
    {
        public int EventId { get; set; }
        public int? TagId { get; set; }
        public DateTime? EventDate { get; set; }
        public string EventHeading { get; set; }
        public string EventImg { get; set; }
        public string EventDetail { get; set; }

        public virtual Tag Tag { get; set; }
    }
}
