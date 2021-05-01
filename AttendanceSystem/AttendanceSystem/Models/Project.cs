using System;
using System.Collections.Generic;

namespace AttendanceSystem.Models
{
    public partial class Project
    {
        public Project()
        {
            DaysEntry = new HashSet<DaysEntry>();
        }

        public int ProjectId { get; set; }
        public string ProjectDes { get; set; }

        public ICollection<DaysEntry> DaysEntry { get; set; }
    }
}
