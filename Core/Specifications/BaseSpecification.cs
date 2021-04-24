using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace Core.Specifications
{
    public class BaseSpecification<T> : ISpecification<T>
    {
        public Expression<Func<T, bool>> Criteria {get;}

        public BaseSpecification(Expression<Func<T, bool>> criteria)
        {
            Criteria = criteria;
        }

        public BaseSpecification()
        {
        }

        public List<Expression<Func<T, object>>> Includes {get;}=
        new List<Expression<Func<T, object>>>();

        public  Expression<Func<T, object>> OrderBy  {get;private set;}

        public Expression<Func<T, object>> OrderByDescending {get;private set;}

        public int Take{get;private set;}

        public int Skip {get;private set;}

        public bool IsPaggingEnabled {get;private set;}

        protected void AddInclude(Expression<Func<T, object>>  expression)
        {
            Includes.Add(expression);
        }

        protected void AddOrderBy(Expression<Func<T, object>>  orderBy)
        {
           OrderBy=orderBy;
        }
          protected void AddOrderByDescending(Expression<Func<T, object>>  orderByDescending)
        {
           OrderByDescending=orderByDescending;
        }

        protected void ApplyPaginig(int skip,int take)
        {
            this.Take=take;
            this.Skip=skip;
            this.IsPaggingEnabled=true;

        }


    }
}