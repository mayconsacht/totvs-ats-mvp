using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BackTotvsATSMVP.CrossCuting.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace BackTotvsATSMVP.API.Controllers {
    [ApiController]
    [Route ("api/v1/resume")]
    public class ResumeController : ControllerBase {

        private readonly ILogger<ResumeController> _logger;

        public ResumeController (ILogger<ResumeController> logger) {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<ResumeDTO> GetAllResumes () {

        }
    }
}