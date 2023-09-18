using System;
using System.Collections.Generic;

#nullable disable

namespace Bakery_API.Models
{
    public partial class PrdouctDetail
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public double Price { get; set; }
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
        public int FlavorId { get; set; }
        public string FlavorName { get; set; }
        public double Weight { get; set; }
        public int Count { get; set; }
        public string Description { get; set; }
        public string MainImg { get; set; }
        public string SideImg1 { get; set; }
        public string SideImg2 { get; set; }
        public string SideImg3 { get; set; }
        public string ProductIngredientId { get; set; }
        public string IngredientsId { get; set; }
        public string Ingredients { get; set; }
    }
}
