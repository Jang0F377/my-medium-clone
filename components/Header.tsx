import Link from "next/link";

function Header() {
  return (
    <header className="flex bg-yellow-500 justify-between p-5 w-full mx-auto">
      <div className="flex items-center space-x-5">
        <Link href="/">
          <img
            className="w-44 object-contain cursor-pointer"
            src="https://links.papareact.com/yvf"
            alt={"Medium"}
          />
        </Link>
        <div className="hidden md:inline-flex items-center space-x-5">
          <h3>About</h3>
          <h3>Contact</h3>
          <h3 className="text-white bg-green-600 rounded-full px-4 py-1">
            Follow
          </h3>
        </div>
      </div>
      <div className="flex text-center items-center space-x-5 text-green-600">
        <button
          onClick={() =>
            alert(
              "Just for looks, no plans for any type of auth for this build atm."
            )
          }
        >
          Sign In
        </button>
        <h3 className="text-green-600 bg-white ring-1 ring-green-600 rounded-full px-4 py-1">
          Get Started
        </h3>
      </div>
    </header>
  );
}

export default Header;
