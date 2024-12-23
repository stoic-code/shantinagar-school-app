const Header = () => {
  return (
    <div className="flex print:hidden items-center px-10 pt-10 pb-14 justify-center relative">
      <img
        height={120}
        width={120}
        className="w-20 sm:w-24 md:w-28 lg:w-32 absolute top-3 left-3"
        src="/logo.svg"
        alt=""
      />
      <div className="text-center">
        <h1 className="text-xl md:text-3xl font-bold uppercase">
          SHANTINAGAR SUNRISE ACADEMY
        </h1>
        <p>Buddhashanti-4, Aitabare, Jhapa</p>
        {/* <p>9851353599</p> */}
      </div>
    </div>
  );
};

export default Header;
