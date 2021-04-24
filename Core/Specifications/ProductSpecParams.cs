using System;

namespace Core.Specifications
{
    public class ProductSpecParams
    {
        private const int maxPageSize=50;
        public int PageIndex { get; set; }=1;
        private int _pageSize=6;
        public int PageSize 
        { 
            get
            {
                return _pageSize;
            } 
            set
            {
             _pageSize=value>maxPageSize?maxPageSize:value;
            }
         }

        public int ToltalCount { get; set; }
        
         public int? BrandId { get; set; }
         public int? TypeId { get; set; }

         public String Sort { get; set; }
         private String _search;
         public String Search { 
             get 
             {
                return _search; 
             }
            set{
                _search=value.ToLower();
            } 
            }
    }
}