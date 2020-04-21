using ContentApp.Core.Logic.Abstracts;
using ContentApp.Core.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ContentApp.Web.Controllers
{
    [ApiController]
    [Route("Api/[controller]")]
    public class ItemsController : ControllerBase
    {
        private readonly IItemLogic _itemLogic;

        public ItemsController(IItemLogic itemLogic)
        {
            _itemLogic = itemLogic;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Item>>> Get()
        {
            return Ok(await _itemLogic.Get());
        }

        [HttpPost]
        public async Task<ActionResult<Item>> Create([FromBody] Item model)
        {
            if (model.Id != 0)
            {
                return BadRequest();
            }
            return Ok(await _itemLogic.Create(model));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (id < 1)
            {
                return BadRequest();
            }
            await _itemLogic.Delete(id);
            return Ok();
        }
    }
}
