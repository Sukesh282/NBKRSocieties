interface MenuProps {
  className?: string;
}

const Menu = ({ className }: MenuProps) => {
  return (
    <ul className={`flex gap-10 p-4 lg:gap-15 ${className || ""}`}>
      <li className="hover:text-primary cursor-pointer text-gray-700">Home</li>
      <li className="hover:text-primary cursor-pointer text-gray-700">
        Events
      </li>
      <li className="hover:text-primary cursor-pointer text-gray-700">
        Societies
      </li>
      <li className="hover:text-primary cursor-pointer text-gray-700">About</li>
    </ul>
  );
};

export default Menu;
