using System;
using System.Collections.Generic;

namespace AttendanceSystem.DBModels
{
    public partial class Employee
    {
        public Employee()
        {
            DaysEntry = new HashSet<DaysEntry>();
        }

        public int EmpId { get; set; }
        public string UserName { get; set; }
        public string PassWord { get; set; }
        public string Email { get; set; }
        public string EmpName { get; set; }
        public int ApproverId { get; set; }

        public ICollection<DaysEntry> DaysEntry { get; set; }
    }
}
