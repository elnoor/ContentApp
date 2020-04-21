using ContentApp.Core.Data;
using ContentApp.Core.Logic.Abstracts;
using ContentApp.Core.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ContentApp.Core.Logic
{
    public class ItemLogic : IItemLogic
    {
        private readonly ApplicationDbContext _dbContext;

        public ItemLogic(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IEnumerable<Item>> Get()
        {
            return await _dbContext.Items.ToListAsync();
        }

        public async Task<Item> Create(Item model)
        {
            await _dbContext.Items.AddAsync(model);
            await _dbContext.SaveChangesAsync();
            return model;
        }

        public async Task Delete(int id)
        {
            Item item = await _dbContext.Items.FindAsync(id);
            if (item != null)
            {
                _dbContext.Items.Remove(item);
                await _dbContext.SaveChangesAsync();
            }
        }
    }
}
