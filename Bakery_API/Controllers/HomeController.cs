using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Bakery_API.Models;
using System.Security.Cryptography.X509Certificates;

namespace Bakery_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        Bakery_ProjectContext db = new Bakery_ProjectContext();

        [HttpGet("GetStatuses")]
        public List<Status> GetStatuses()
        {
            return db.Statuses.ToList();
        }

        [HttpGet("GetUsers")]
        public List<UserStatus> GetUsers()
        {
            return db.UserStatuses.ToList();
        }

        [HttpGet("GetAdmin/{id}")]
        public ActionResult<User> GetAdmin(int id)
        {
            User Admin = db.Users.SingleOrDefault(x => x.UserId == id);
            return Admin;
        }

        [HttpGet("GetUserData/{id}")]
        public ActionResult<User> GetUserData(int id)
        {
            User selectedUser = db.Users.SingleOrDefault(x => x.UserId == id);
            return selectedUser;
        }

        [HttpPost("AddUser")]
        public bool AddUser(User nUser)
        {
            bool usernameExists = db.Users.Any(u => u.Username == nUser.Username);
            bool emailExists = db.Users.Any(u => u.Email == nUser.Email);
            bool numberExists = db.Users.Any(u => u.PhoneNumber == nUser.PhoneNumber);

            bool complete;

            if (usernameExists || emailExists || numberExists)
            {
                complete = false;
            }
            else
            {
                db.Users.Add(nUser);
                db.SaveChanges();
                complete = true;
            }

            return complete;

        }

        [HttpPost("Checkuser")]
        public IActionResult CheckUser(User insertedUser)
        {
            string message = "";
            User user = db.Users.SingleOrDefault(x => x.Username == insertedUser.Username && x.Password == insertedUser.Password);
            if (string.IsNullOrEmpty(insertedUser.Username) && string.IsNullOrEmpty(insertedUser.Password))
            {
                message = "Insert your username and password";
            }
            else if (string.IsNullOrEmpty(insertedUser.Username))
            {
                message = "Insert your username";
            }
            else if (string.IsNullOrEmpty(insertedUser.Password))
            {
                message = "Insert your password";
            }
            else if (user is null)
            {
                message = "Username or password is false";
            }
            return Ok(new
            {
                user,
                message
            });
        }

        [HttpPut("UpdateUser/{id}")]
        public User UpdateUser(int id, User uUser)
        {
            User slctdUser = db.Users.SingleOrDefault(x => x.UserId == id);
            slctdUser.FirstName = uUser.FirstName;
            slctdUser.SecondName = uUser.SecondName;
            slctdUser.Username = uUser.Username;
            slctdUser.Email = uUser.Email;
            slctdUser.Password = uUser.Password;
            slctdUser.Address = uUser.Address;
            slctdUser.PhoneNumber = uUser.PhoneNumber;

            //if (uUser.UserStatus != null)
            //{
            //    slctdUser.UserStatus = uUser.UserStatus;
            //}

            db.SaveChanges();
            return slctdUser;
        }

        [HttpDelete("DeleteUser/{id}")]
        public void DeleteUser(int id)
        {
            User dUser = db.Users.SingleOrDefault(x => x.UserId == id);
            db.Users.Remove(dUser);
            db.SaveChanges();
        }

        [HttpGet("GetTeam")]
        public List<MembersDesignation> GetTeam()
        {
            return db.MembersDesignations.ToList();
        }

        [HttpGet("GetDesignations")]
        public List<Designation> GetDesignations()
        {
            return db.Designations.ToList();
        }

        [HttpGet("GetEvents")]
        public List<EventTag> GetEvents()
        {
            return db.EventTags.ToList();
        }

        [HttpGet("GetEventDetail/{id}")]
        public ActionResult<EventTag> GetEventDetail(int id)
        {
            EventTag selectedEvent = db.EventTags.SingleOrDefault(x => x.EventId == id);
            return selectedEvent;
        }

        [HttpGet("GetTags")]
        public List<Tag> GetTags()
        {
            return db.Tags.ToList();
        }

        [HttpGet("GetProductsBasic")]
        public List<PrdouctDetail> GetProductsBasic()
        {
            return db.PrdouctDetails.ToList();
        }

        [HttpGet("GetProducts")]
        public ActionResult<IEnumerable<PrdouctDetail>> GetProducts(int page = 1, int pageSize = 12, float? minPrice = null, float? maxPrice = null, int? category = null, int? flavor = null, string keyword = "")
        {
            IQueryable<PrdouctDetail> query = db.PrdouctDetails.AsQueryable();

            // Filter by minimum price
            if (minPrice.HasValue)
            {
                query = query.Where(p => p.Price >= minPrice.Value);
            }

            // Filter by maximum price
            if (maxPrice.HasValue)
            {
                query = query.Where(p => p.Price <= maxPrice.Value);
            }

            // Filter by category
            if (category.HasValue)
            {
                query = query.Where(p => p.CategoryId == category.Value);
            }

            // Filter by flavor
            if (flavor.HasValue)
            {
                query = query.Where(p => p.FlavorId == flavor.Value);
            }

            // Filter by keyword (product name)
            if (!string.IsNullOrEmpty(keyword))
            {
                query = query.Where(p => p.ProductName.Contains(keyword));
            }

            // Calculate total count and total pages
            int totalCount = query.Count();
            int totalPages = (int)Math.Ceiling((double)totalCount / pageSize);

            // Apply pagination
            List<PrdouctDetail> products = query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            return Ok(new
            {
                page,
                pageSize,
                totalPages,
                totalCount,
                products
            });
        }



        [HttpGet("GetProductDetail/{id}")]
        public ActionResult<PrdouctDetail> GetProductDetail(int id)
        {
            PrdouctDetail selectedProduct = db.PrdouctDetails.SingleOrDefault(x => x.ProductId == id);
            return selectedProduct;
        }

        [HttpGet("GetCategories")]
        public List<Category> GetCategories()
        {
            return db.Categories.ToList();
        }

        [HttpGet("GetFlavors")]
        public List<Flavor> GetFlavors()
        {
            return db.Flavors.ToList();
        }

        [HttpGet("GetIngredients")]
        public List<Ingredient> GetIngredients()
        {
            return db.Ingredients.ToList();
        }

        [HttpGet("GetProductIngredients/{id}")]
        public ActionResult<List<ProductIngredient>> GetProductIngredients(int id)
        {
            List<ProductIngredient> ingredients = db.ProductIngredients.Where(x => x.ProductId == id).ToList();
            return ingredients;
        }

        [HttpPost("AddProduct")]
        public Product AddProduct(Product nProduct)
        {
            db.Products.Add(nProduct);
            db.SaveChanges();
            return nProduct;
        }

        [HttpPost("AddProductIngredient/{id}")]
        public void AddProductIngredient(int id, int[] ingredients)
        {
            foreach (int ingredientId in ingredients)
            {
                ProductIngredient nProductIngredient = new ProductIngredient();
                nProductIngredient.ProductId = id;
                nProductIngredient.IngredientId = ingredientId;

                db.ProductIngredients.Add(nProductIngredient);
                db.SaveChanges();
            }
        }

        [HttpPut("UpdateProduct/{id}")]
        public Product UpdateProduct(int id, Product uProduct)
        {
            Product slctdProduct = db.Products.SingleOrDefault(x => x.ProductId == id);
            slctdProduct.ProductName = uProduct.ProductName;
            slctdProduct.MainImg = uProduct.MainImg;
            slctdProduct.SideImg1 = uProduct.SideImg1;
            slctdProduct.SideImg2 = uProduct.SideImg2;
            slctdProduct.SideImg3 = uProduct.SideImg3;
            slctdProduct.Price = uProduct.Price;
            slctdProduct.Weight = uProduct.Weight;
            slctdProduct.Description = uProduct.Description;
            slctdProduct.Count = uProduct.Count;
            slctdProduct.ProductCategory = uProduct.ProductCategory;
            slctdProduct.ProductFlavor = uProduct.ProductFlavor;

            db.SaveChanges();
            return slctdProduct;
        }

        [HttpPost("UpdateProductIngredients/{productId}")]
        public void UpdateProductIngredients(int productId, int[] updatedIngredientIds)
        {
            var existingProductIngredients = db.ProductIngredients.Where(pi => pi.ProductId == productId).ToList();
            db.ProductIngredients.RemoveRange(existingProductIngredients);
            db.SaveChanges();

            foreach (int updatedIngredientId in updatedIngredientIds)
            {
                ProductIngredient newProductIngredient = new ProductIngredient
                {
                    ProductId = productId,
                    IngredientId = updatedIngredientId
                };
                db.ProductIngredients.Add(newProductIngredient);
            }
            db.SaveChanges();
        }

        [HttpDelete("DeleteProduct/{id}")]
        public void DeleteProduct(int id)
        {
            Product dProduct = db.Products.SingleOrDefault(x => x.ProductId == id);
            db.Products.Remove(dProduct);
            db.SaveChanges();
        }

        [HttpGet("GetOrderDetail/{id?}")]
        public IActionResult GetOrderDetail(int? id = null)
        {
            List<OrderDetail> userOrders;

            if (id.HasValue)
            {
                userOrders = db.OrderDetails.Where(o => o.CustomerId == id.Value).ToList();
            }
            else
            {
                userOrders = db.OrderDetails.ToList();
            }

            return Ok(userOrders);
        }

        [HttpGet("GetBasketDetails/{id}")]
        public List<BasketDetail> GetBasketDetails(int id)
        {
            List<BasketDetail> userBaskets = db.BasketDetails.Where(b => b.CustomerId == id).ToList();
            return userBaskets;
        }

        [HttpPost("AddBasket")]
        public void AddBasket(Basket nBasket)
        {
            bool basketExists = db.Baskets.Any(b => b.ProductId == nBasket.ProductId && b.CustomerId == nBasket.CustomerId);
            if (basketExists)
            {
                Basket bas = db.Baskets.FirstOrDefault(b => b.ProductId == nBasket.ProductId);
                bas.Quantity += nBasket.Quantity;

            }
            else
            {
                db.Baskets.Add(nBasket);
            }
            db.SaveChanges();

        }

        [HttpDelete("DeleteBasket/{id}")]
        public void DeleteBasket(int id)
        {
            Basket dBasket = db.Baskets.SingleOrDefault(x => x.BasketId == id);
            db.Baskets.Remove(dBasket);
            db.SaveChanges();
        }

        [HttpPut("UpdateQuantity/{id}")]
        public Basket UpdateQuantity(int id, Basket uBasket)
        {
            Basket slctdBasket = db.Baskets.SingleOrDefault(x => x.BasketId == id);

            slctdBasket.Quantity = uBasket.Quantity;

            db.SaveChanges();
            return slctdBasket;
        }

        [HttpPost("AddOrder")]
        public Order AddOrder(Order nOrder)
        {
            db.Orders.Add(nOrder);
            db.SaveChanges();
            return nOrder;
        }

        [HttpDelete("DeleteOrder/{id}")]
        public void DeleteOrder(int id)
        {
            Order dOrder = db.Orders.SingleOrDefault(x => x.OrderId == id);
            db.Orders.Remove(dOrder);
            db.SaveChanges();
        }

        [HttpGet("GetMessages")]
        public List<Message> GetMessages()
        {
            return db.Messages.ToList();
        }

        [HttpPost("AddMessage")]
        public Message AddMessage(Message nMessage)
        {
            db.Messages.Add(nMessage);
            db.SaveChanges();
            return nMessage;
        }

        [HttpDelete("DeleteMessage/{id}")]
        public void DeleteMessage(int id)
        {
            Message dMessage = db.Messages.SingleOrDefault(x => x.Id == id);
            db.Messages.Remove(dMessage);
            db.SaveChanges();
        }


    }
}
