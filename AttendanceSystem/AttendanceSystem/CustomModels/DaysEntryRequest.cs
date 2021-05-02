using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AttendanceSystem.CustomModels
{
    public class DaysEntryRequest
    {
        public int? EmpId { get; set; }
        public int? ProjectId { get; set; }
        public int? Duration { get; set; }
        public string LeaveReason { get; set; }
        public DateTime CurrDate { get; set; }
        public bool IsHoliday { get; set; }
        public int? CurrWeek { get; set; }
        public string Status { get; set; }
    }
}
