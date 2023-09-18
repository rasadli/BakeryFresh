using System;
using System.Collections.Generic;

#nullable disable

namespace Bakery_API.Models
{
    public partial class BasketDetail
    {
        public int BasketId { get; set; }
        public int? CustomerId { get; set; }
        public int? ProductId { get; set; }
        public int Quantity { get; set; }
        public double TotalAmount { get; set; }
        public double TotalWeight { get; set; }
        public string ProductName { get; set; }
        public string MainImg { get; set; }
        public string SideImg1 { get; set; }
        public string SideImg2 { get; set; }
        public string SideImg3 { get; set; }
        public double Price { get; set; }
        public double Weight { get; set; }
        public string Description { get; set; }
        public int Count { get; set; }
    }
}
