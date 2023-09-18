using System;
using System.Collections.Generic;

#nullable disable

namespace Bakery_API.Models
{
    public partial class Flavor
    {
        public Flavor()
        {
            Products = new HashSet<Product>();
        }

        public int FlavorId { get; set; }
        public string FlavorName { get; set; }

        public virtual ICollection<Product> Products { get; set; }
    }
}
