using System.Globalization;

namespace CheckList.Shared;

public class AppException : Exception
{
    public AppException() : base() { }

    public AppException(string message) : base(message) { }

    public AppException(string message, params object[] args)
        : base(string.Format(CultureInfo.InvariantCulture, message, args)) { }
}
