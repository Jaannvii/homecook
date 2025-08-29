import MenuCard from "../components/MenuCard";

const Menu = () => {
  const menuItems = [
    { id: 1, name: "Rajma Chawal", price: 120, chef: "Anjali Verma", img: "/images/rajma.jpg" },
    { id: 2, name: "Fish Curry", price: 350, chef: "Ravi Kumar", img: "/images/fish.jpg" },
    { id: 3, name: "Gulab Jamun", price: 90, chef: "Neha Sharma", img: "/images/gulab.jpg" },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-green-600 mb-6">Our Menu</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {menuItems.map((menu) => (
          <MenuCard key={menu.id} {...menu} />
        ))}
      </div>
    </div>
  );
};

export default Menu;
