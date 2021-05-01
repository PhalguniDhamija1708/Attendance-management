using System;
using System.Collections.Generic;

namespace WebApplication1.Models
{
    public partial class DaysEntry
    {
        public int Id { get; set; }
        public int? EmpId { get; set; }
        public int? ProjectId { get; set; }
        public int? Duration { get; set; }
        public string Task { get; set; }
        public string LeaveReason { get; set; }
        public DateTime CurrDate { get; set; }
        public bool IsHoliday { get; set; }
        public int? CurrWeek { get; set; }
        public string Status { get; set; }
        public Employee Emp { get; set; }
        public Project Project { get; set; }
    }
}
