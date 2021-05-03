using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AttendanceSystem.CustomModels
{
    public class RequestButton
    {
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public String previousStatus { get; set; }
        public String newStatus { get; set; }
    }
}
