using System;
using System.Collections.Generic;

#nullable disable

namespace Bakery_API.Models
{
    public partial class OrderDetail
    {
        public int OrderId { get; set; }
        public int? CustomerId { get; set; }
        public string Username { get; set; }
        public int? ProductId { get; set; }
        public int Quantity { get; set; }
        public double TotalAmount { get; set; }
        public double TotalWeight { get; set; }
        public DateTime OrderDate { get; set; }
        public string ProductName { get; set; }
        public string MainImg { get; set; }
        public string SideImg1 { get; set; }
        public string SideImg2 { get; set; }
        public string SideImg3 { get; set; }
        public double Price { get; set; }
        public double Weight { get; set; }
        public string Description { get; set; }
        public int Count { get; set; }
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
        public int FlavorId { get; set; }
        public string FlavorName { get; set; }
        public string Ingredients { get; set; }
        public string IngredientIds { get; set; }
    }
}
