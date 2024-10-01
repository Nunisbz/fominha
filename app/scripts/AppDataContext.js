import { createContext, useState } from "react";

// Criação do contexto para os dados do app
export const AppDataContext = createContext();

export const AppDataProvider = ({ children }) => {
  const [shoppingCart, updateCart] = useState([]); // Estado para o carrinho de compras
  const [menuItems, setMenuItems] = useState([
    {
      id: 1,
      title: "Burguer do Gaúcho",
      seller: "Grêmio vai cair pra série B",
      cost: 27.50,
      imgUrl: "https://www.tupi.fm/wp-content/uploads/WhatsApp-Image-2021-05-25-at-14.35.50.jpeg"
    },
    {
      id: 2,
      title: "Hotdog Antigremista",
      seller: "Gremista curte uma salsicha",
      cost: 12.90,
      imgUrl: "https://static.itdg.com.br/images/640-440/535cc599b45272dd1f4f02f339711e37/cachorro-quente-aprovadissimo.jpg"
    },
    {
      id: 3,
      title: "Pizza do Inter",
      seller: "Vai se fude Grêmio",
      cost: 30.00,
      imgUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Escudo_do_Sport_Club_Internacional.svg/1024px-Escudo_do_Sport_Club_Internacional.svg.png"
    }
  ]);

  // O provedor expõe o estado do carrinho e os itens do menu para outros componentes
  return (
    <AppDataContext.Provider value={{ shoppingCart, updateCart, menuItems, setMenuItems }}>
      {children}
    </AppDataContext.Provider>
  );
};
