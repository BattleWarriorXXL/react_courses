using System.Globalization;

namespace CheckList.Shared;

public class NotFoundException : Exception
{
    public NotFoundException() : base() { }

    public NotFoundException(string message) : base(message) { }

    public NotFoundException(string message, params object[] args)
        : base(string.Format(CultureInfo.InvariantCulture, message, args)) { }
}
