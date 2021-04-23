using System;

namespace API.DTOs
{
    public class ProductToReturnDto
    {
        public String Name { get; set; }
        public String Description { get; set; }
        public decimal Price { get; set; }
        public String  PictureUrl { get; set; }
        public String ProductBrand { get; set; }
        public String ProductType { get; set; }

    }
}