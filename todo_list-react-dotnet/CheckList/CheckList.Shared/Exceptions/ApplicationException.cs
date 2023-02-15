using System.Globalization;

namespace CheckList.Shared;

public class ApplicationException : Exception
{
    public ApplicationException() : base() { }

    public ApplicationException(string message) : base(message) { }

    public ApplicationException(string message, params object[] args)
        : base(string.Format(CultureInfo.InvariantCulture, message, args)) { }
}
