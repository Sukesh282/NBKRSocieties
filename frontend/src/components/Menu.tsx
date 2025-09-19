import {
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";

interface MenuProps {
  className?: string;
}

const Menu = ({ className }: MenuProps) => {
  return (
    <NavigationMenuList className={className}>
      <NavigationMenuItem>
        <NavigationMenuLink>
          <Link to={{ pathname: "/dashboard" }}>Dashboard</Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink>
          <Link to={{ pathname: "/about" }}>About</Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink>
          <Link to={{ pathname: "/dashboard" }}>Societies</Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
    </NavigationMenuList>
  );
};

export default Menu;
