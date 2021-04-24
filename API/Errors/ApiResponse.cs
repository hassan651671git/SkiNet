using System;

namespace API.Errors
{
    public class ApiResponse
    {
        
        public int StatusCode { get; set; }
        public String Message { get; set; }
        public ApiResponse(int statusCode, string message=null)
        {
            StatusCode = statusCode;
            Message = message??GetMessageFromCode(statusCode);
        }

        private string GetMessageFromCode(int statusCode)
        {
            return statusCode switch
            {
                400=>"Bad Request You have Made",
                401=>"Authorized, You are Not",
                404=>"Resource Found, it was not",
                500=>"an error occur on the server !!!",
                _ =>null

            };
        }
    }
}