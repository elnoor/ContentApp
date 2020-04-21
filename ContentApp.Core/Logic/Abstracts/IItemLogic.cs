using ContentApp.Core.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ContentApp.Core.Logic.Abstracts
{
    public interface IItemLogic
    {
        Task<IEnumerable<Item>> Get();
        Task<Item> Create(Item model);
        Task Delete(int id);
    }
}
