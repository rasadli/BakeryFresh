using System;
using System.Collections.Generic;

#nullable disable

namespace Bakery_API.Models
{
    public partial class Product
    {
        public Product()
        {
            Baskets = new HashSet<Basket>();
            Orders = new HashSet<Order>();
            ProductIngredients = new HashSet<ProductIngredient>();
        }

        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public string MainImg { get; set; }
        public string SideImg1 { get; set; }
        public string SideImg2 { get; set; }
        public string SideImg3 { get; set; }
        public double Price { get; set; }
        public double Weight { get; set; }
        public string Description { get; set; }
        public int Count { get; set; }
        public int? ProductCategory { get; set; }
        public int? ProductFlavor { get; set; }

        public virtual Category ProductCategoryNavigation { get; set; }
        public virtual Flavor ProductFlavorNavigation { get; set; }
        public virtual ICollection<Basket> Baskets { get; set; }
        public virtual ICollection<Order> Orders { get; set; }
        public virtual ICollection<ProductIngredient> ProductIngredients { get; set; }
    }
}
