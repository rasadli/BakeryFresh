using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace Bakery_API.Models
{
    public partial class Bakery_ProjectContext : DbContext
    {
        public Bakery_ProjectContext()
        {
        }

        public Bakery_ProjectContext(DbContextOptions<Bakery_ProjectContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Basket> Baskets { get; set; }
        public virtual DbSet<BasketDetail> BasketDetails { get; set; }
        public virtual DbSet<Category> Categories { get; set; }
        public virtual DbSet<Designation> Designations { get; set; }
        public virtual DbSet<Event> Events { get; set; }
        public virtual DbSet<EventTag> EventTags { get; set; }
        public virtual DbSet<Flavor> Flavors { get; set; }
        public virtual DbSet<Ingredient> Ingredients { get; set; }
        public virtual DbSet<Member> Members { get; set; }
        public virtual DbSet<MembersDesignation> MembersDesignations { get; set; }
        public virtual DbSet<Message> Messages { get; set; }
        public virtual DbSet<Order> Orders { get; set; }
        public virtual DbSet<OrderDetail> OrderDetails { get; set; }
        public virtual DbSet<PrdouctDetail> PrdouctDetails { get; set; }
        public virtual DbSet<Product> Products { get; set; }
        public virtual DbSet<ProductIngredient> ProductIngredients { get; set; }
        public virtual DbSet<Status> Statuses { get; set; }
        public virtual DbSet<Tag> Tags { get; set; }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<UserStatus> UserStatuses { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=RASHAD\\SQLEXPRESS;Database=Bakery_Project;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "Latin1_General_CI_AS");

            modelBuilder.Entity<Basket>(entity =>
            {
                entity.ToTable("Basket");

                entity.HasOne(d => d.Customer)
                    .WithMany(p => p.Baskets)
                    .HasForeignKey(d => d.CustomerId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK__Basket__Customer__59063A47");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.Baskets)
                    .HasForeignKey(d => d.ProductId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK__Basket__ProductI__59FA5E80");
            });

            modelBuilder.Entity<BasketDetail>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("BasketDetail");

                entity.Property(e => e.Description).IsRequired();

                entity.Property(e => e.MainImg).IsRequired();

                entity.Property(e => e.ProductName)
                    .IsRequired()
                    .HasMaxLength(40);

                entity.Property(e => e.SideImg1).IsRequired();

                entity.Property(e => e.SideImg2).IsRequired();

                entity.Property(e => e.SideImg3).IsRequired();
            });

            modelBuilder.Entity<Category>(entity =>
            {
                entity.Property(e => e.CategoryName).HasMaxLength(40);
            });

            modelBuilder.Entity<Designation>(entity =>
            {
                entity.Property(e => e.DesignationName)
                    .IsRequired()
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<Event>(entity =>
            {
                entity.Property(e => e.EventDate).HasColumnType("date");

                entity.Property(e => e.EventHeading).IsRequired();

                entity.Property(e => e.EventImg).IsRequired();

                entity.HasOne(d => d.Tag)
                    .WithMany(p => p.Events)
                    .HasForeignKey(d => d.TagId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK__Events__TagId__5AEE82B9");
            });

            modelBuilder.Entity<EventTag>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("EventTags");

                entity.Property(e => e.EventDate)
                    .HasMaxLength(38)
                    .HasColumnName("event_date");

                entity.Property(e => e.EventHeading).IsRequired();

                entity.Property(e => e.EventImg).IsRequired();

                entity.Property(e => e.TagName)
                    .IsRequired()
                    .HasMaxLength(30);
            });

            modelBuilder.Entity<Flavor>(entity =>
            {
                entity.ToTable("Flavor");

                entity.Property(e => e.FlavorId).ValueGeneratedNever();

                entity.Property(e => e.FlavorName)
                    .IsRequired()
                    .HasMaxLength(40)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Ingredient>(entity =>
            {
                entity.ToTable("Ingredient");

                entity.Property(e => e.IngredientId).ValueGeneratedNever();

                entity.Property(e => e.IngredientName)
                    .IsRequired()
                    .HasMaxLength(40);
            });

            modelBuilder.Entity<Member>(entity =>
            {
                entity.Property(e => e.Facebook).HasMaxLength(50);

                entity.Property(e => e.FirstName)
                    .IsRequired()
                    .HasMaxLength(40);

                entity.Property(e => e.Image).IsRequired();

                entity.Property(e => e.Instagram).HasMaxLength(50);

                entity.Property(e => e.LastName)
                    .IsRequired()
                    .HasMaxLength(40);

                entity.Property(e => e.Pinterest).HasMaxLength(50);

                entity.Property(e => e.Twitter).HasMaxLength(50);

                entity.HasOne(d => d.MemberDesignationNavigation)
                    .WithMany(p => p.Members)
                    .HasForeignKey(d => d.MemberDesignation)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK__Members__MemberD__5BE2A6F2");
            });

            modelBuilder.Entity<MembersDesignation>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("MembersDesignations");

                entity.Property(e => e.DesignationName)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Facebook).HasMaxLength(50);

                entity.Property(e => e.FirstName)
                    .IsRequired()
                    .HasMaxLength(40);

                entity.Property(e => e.Image).IsRequired();

                entity.Property(e => e.Instagram).HasMaxLength(50);

                entity.Property(e => e.LastName)
                    .IsRequired()
                    .HasMaxLength(40);

                entity.Property(e => e.Pinterest).HasMaxLength(50);

                entity.Property(e => e.Twitter).HasMaxLength(50);
            });

            modelBuilder.Entity<Message>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Message1)
                    .IsRequired()
                    .HasColumnName("Message");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(40);

                entity.Property(e => e.Surname)
                    .IsRequired()
                    .HasMaxLength(40);
            });

            modelBuilder.Entity<Order>(entity =>
            {
                entity.Property(e => e.OrderDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.HasOne(d => d.Customer)
                    .WithMany(p => p.Orders)
                    .HasForeignKey(d => d.CustomerId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK__Orders__Customer__5CD6CB2B");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.Orders)
                    .HasForeignKey(d => d.ProductId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK__Orders__ProductI__5DCAEF64");
            });

            modelBuilder.Entity<OrderDetail>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("OrderDetail");

                entity.Property(e => e.CategoryName).HasMaxLength(40);

                entity.Property(e => e.Description).IsRequired();

                entity.Property(e => e.FlavorName)
                    .IsRequired()
                    .HasMaxLength(40)
                    .IsUnicode(false);

                entity.Property(e => e.Ingredients).HasMaxLength(4000);

                entity.Property(e => e.MainImg).IsRequired();

                entity.Property(e => e.OrderDate).HasColumnType("datetime");

                entity.Property(e => e.ProductName)
                    .IsRequired()
                    .HasMaxLength(40);

                entity.Property(e => e.SideImg1).IsRequired();

                entity.Property(e => e.SideImg2).IsRequired();

                entity.Property(e => e.SideImg3).IsRequired();

                entity.Property(e => e.Username)
                    .IsRequired()
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<PrdouctDetail>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("PrdouctDetails");

                entity.Property(e => e.CategoryName).HasMaxLength(40);

                entity.Property(e => e.Description).IsRequired();

                entity.Property(e => e.FlavorName)
                    .IsRequired()
                    .HasMaxLength(40)
                    .IsUnicode(false);

                entity.Property(e => e.Ingredients).HasMaxLength(4000);

                entity.Property(e => e.IngredientsId).HasMaxLength(4000);

                entity.Property(e => e.MainImg).IsRequired();

                entity.Property(e => e.ProductIngredientId).HasMaxLength(4000);

                entity.Property(e => e.ProductName)
                    .IsRequired()
                    .HasMaxLength(40);

                entity.Property(e => e.SideImg1).IsRequired();

                entity.Property(e => e.SideImg2).IsRequired();

                entity.Property(e => e.SideImg3).IsRequired();
            });

            modelBuilder.Entity<Product>(entity =>
            {
                entity.Property(e => e.Description).IsRequired();

                entity.Property(e => e.MainImg).IsRequired();

                entity.Property(e => e.ProductName)
                    .IsRequired()
                    .HasMaxLength(40);

                entity.Property(e => e.SideImg1).IsRequired();

                entity.Property(e => e.SideImg2).IsRequired();

                entity.Property(e => e.SideImg3).IsRequired();

                entity.HasOne(d => d.ProductCategoryNavigation)
                    .WithMany(p => p.Products)
                    .HasForeignKey(d => d.ProductCategory)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK__Products__Produc__60A75C0F");

                entity.HasOne(d => d.ProductFlavorNavigation)
                    .WithMany(p => p.Products)
                    .HasForeignKey(d => d.ProductFlavor)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK__Products__Produc__619B8048");
            });

            modelBuilder.Entity<ProductIngredient>(entity =>
            {
                entity.ToTable("ProductIngredient");

                entity.HasOne(d => d.Ingredient)
                    .WithMany(p => p.ProductIngredients)
                    .HasForeignKey(d => d.IngredientId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK__ProductIn__Ingre__5EBF139D");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.ProductIngredients)
                    .HasForeignKey(d => d.ProductId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK__ProductIn__Produ__5FB337D6");
            });

            modelBuilder.Entity<Status>(entity =>
            {
                entity.Property(e => e.StatusName)
                    .IsRequired()
                    .HasMaxLength(20);
            });

            modelBuilder.Entity<Tag>(entity =>
            {
                entity.Property(e => e.TagName)
                    .IsRequired()
                    .HasMaxLength(30);
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasIndex(e => e.Username, "UQ__Users__536C85E422480F34")
                    .IsUnique();

                entity.HasIndex(e => e.PhoneNumber, "UQ__Users__85FB4E38F7F0ED8D")
                    .IsUnique();

                entity.HasIndex(e => e.Email, "UQ__Users__A9D10534E41869D7")
                    .IsUnique();

                entity.Property(e => e.Address).IsRequired();

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.FirstName)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.PhoneNumber)
                    .IsRequired()
                    .HasMaxLength(20);

                entity.Property(e => e.SecondName)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Username)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.HasOne(d => d.UserStatusNavigation)
                    .WithMany(p => p.Users)
                    .HasForeignKey(d => d.UserStatus)
                    .HasConstraintName("FK__Users__UserStatu__628FA481");
            });

            modelBuilder.Entity<UserStatus>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("UserStatus");

                entity.Property(e => e.Address).IsRequired();

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.FirstName)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.PhoneNumber)
                    .IsRequired()
                    .HasMaxLength(20);

                entity.Property(e => e.SecondName)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.StatusName)
                    .IsRequired()
                    .HasMaxLength(20);

                entity.Property(e => e.UserStatus1).HasColumnName("UserStatus");

                entity.Property(e => e.Username)
                    .IsRequired()
                    .HasMaxLength(50);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
