using System;
using System.Collections.Generic;

#nullable disable

namespace Bakery_API.Models
{
    public partial class Order
    {
        public int OrderId { get; set; }
        public int? CustomerId { get; set; }
        public int? ProductId { get; set; }
        public int Quantity { get; set; }
        public double TotalAmount { get; set; }
        public double TotalWeight { get; set; }
        public DateTime OrderDate { get; set; }

        public virtual User Customer { get; set; }
        public virtual Product Product { get; set; }
    }
}
