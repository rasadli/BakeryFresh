using System;
using System.Collections.Generic;

#nullable disable

namespace Bakery_API.Models
{
    public partial class EventTag
    {
        public int EventId { get; set; }
        public int? TagId { get; set; }
        public string TagName { get; set; }
        public string EventDate { get; set; }
        public string EventHeading { get; set; }
        public string EventImg { get; set; }
        public string EventDetail { get; set; }
    }
}
