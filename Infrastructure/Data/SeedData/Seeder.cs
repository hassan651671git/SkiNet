using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Core.Entities;
using Microsoft.Extensions.Logging;

namespace Infrastructure.Data.SeedData
{
    public class Seeder
    {
        

        public static async Task  SeedAsync(DataContext dataContext,ILoggerFactory loggerFactory)
        {
            try{
  

                if(!dataContext.ProductBrands.Any())
                {
                 var productBrands=File.ReadAllText("../Infrastructure/data/SeedData/brands.json");
                var productBrandsData=JsonSerializer.Deserialize<List<ProductBrand>>(productBrands);
                foreach(var productBrand in productBrandsData)
                {
                    dataContext.ProductBrands.Add(productBrand);
                }
                await dataContext.SaveChangesAsync();
                }


                if(!dataContext.ProductTypes.Any())
                {
                 var productTypes=File.ReadAllText("../Infrastructure/data/SeedData/types.json");
                var productTypesData=JsonSerializer.Deserialize<List<ProductType>>(productTypes);
                foreach(var productType in productTypesData)
                {
                    dataContext.ProductTypes.Add(productType);
                }
                await dataContext.SaveChangesAsync();
                }


                if(!dataContext.Products.Any())
                {
                 var products=File.ReadAllText("../Infrastructure/data/SeedData/products.json");
                var productsData=JsonSerializer.Deserialize<List<Product>>(products);
                foreach(var product in productsData)
                {
                    dataContext.Products.Add(product);
                }
                await dataContext.SaveChangesAsync();
                }
                   

            }catch(Exception ex){
                var logger=loggerFactory.CreateLogger<DataContext>();
                logger.LogError(ex.Message);
            }

        }
    }
}