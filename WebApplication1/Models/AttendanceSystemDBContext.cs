using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace WebApplication1.Models
{
    public partial class AttendanceSystemDBContext : DbContext
    {
        public AttendanceSystemDBContext()
        {
        }

        public AttendanceSystemDBContext(DbContextOptions<AttendanceSystemDBContext> options)
            : base(options)
        {
        }

        public virtual DbSet<DaysEntry> DaysEntry { get; set; }
        public virtual DbSet<Employee> Employee { get; set; }
        public virtual DbSet<Project> Project { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=DESKTOP-CSMD8BJ\\SQLEXPRESS;Database=AttendanceSystemDB;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<DaysEntry>(entity =>
            {
                entity.Property(e => e.CurrDate).HasColumnType("date");

                entity.Property(e => e.IsHoliday).HasColumnName("isHoliday");

                entity.Property(e => e.LeaveReason)
                    .HasColumnName("Leave_reason")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Status)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Task)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.HasOne(d => d.Emp)
                    .WithMany(p => p.DaysEntry)
                    .HasForeignKey(d => d.EmpId)
                    .HasConstraintName("FK__DaysEntry__EmpId__4D94879B");

                entity.HasOne(d => d.Project)
                    .WithMany(p => p.DaysEntry)
                    .HasForeignKey(d => d.ProjectId)
                    .HasConstraintName("FK__DaysEntry__Proje__4E88ABD4");
            });

            modelBuilder.Entity<Employee>(entity =>
            {
                entity.HasKey(e => e.EmpId);

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.EmpName)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.PassWord)
                    .IsRequired()
                    .HasColumnName("Pass_Word")
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.UserName)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Project>(entity =>
            {
                entity.Property(e => e.ProjectDes)
                    .IsRequired()
                    .HasMaxLength(400)
                    .IsUnicode(false);
            });
        }
    }
}
