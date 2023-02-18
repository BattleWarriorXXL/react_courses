using System.Globalization;

namespace CheckList.Shared;

public class WrongCredentialsException : Exception
{
	public WrongCredentialsException() : base() { }

	public WrongCredentialsException(string message) : base(message) { }

	public WrongCredentialsException(string message, params object[] args)
		: base(string.Format(CultureInfo.InvariantCulture, message, args)) { }
}
