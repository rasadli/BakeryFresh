using System;
using System.Collections.Generic;

#nullable disable

namespace Bakery_API.Models
{
    public partial class Ingredient
    {
        public Ingredient()
        {
            ProductIngredients = new HashSet<ProductIngredient>();
        }

        public int IngredientId { get; set; }
        public string IngredientName { get; set; }

        public virtual ICollection<ProductIngredient> ProductIngredients { get; set; }
    }
}
