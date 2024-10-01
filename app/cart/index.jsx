import React, { useContext, useState, useEffect } from 'react';
import { AppDataContext } from "../scripts/AppDataContext";
import { View, Text, Pressable, SafeAreaView, FlatList, StyleSheet } from 'react-native';
import PageHeader from "../components/PageHeader";

const CartItem = ({ title, seller, cost }) => {
  return (
    <View style={styles.cartItem}>
      <View>
        <Text style={styles.itemTitle}>{title}</Text>
        <Text style={styles.itemSeller}>{seller}</Text>
      </View>
      <View>
        <Text style={styles.itemPrice}>R$ {cost}</Text>
      </View>
    </View>
  );
};

const CartScreen = () => {
  const { shoppingCart, updateCart } = useContext(AppDataContext);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const total = shoppingCart.reduce((acc, item) => acc + item.cost, 0);
    setTotalAmount(total.toFixed(2));
  }, [shoppingCart]);

  const removeFromCart = (index) => {
    const updatedCart = [...shoppingCart];
    updatedCart.splice(index, 1);
    updateCart(updatedCart);
  };

  return (
    <SafeAreaView style={styles.screen}>
      <PageHeader navigationLink="/" pageTitle="Carrinho de Compras" />
      <FlatList
        data={shoppingCart}
        renderItem={({ item, index }) => (
          <View style={styles.cartItemContainer}>
            <CartItem title={item.title} seller={item.seller} cost={item.cost} />
            <Pressable onPress={() => removeFromCart(index)} style={styles.removeButton}>
              <Text style={styles.removeText}>Excluir</Text>
            </Pressable>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <View style={styles.footer}>
        <Text style={styles.totalText}>Total: R$ {totalAmount}</Text>
        <View style={styles.actionButtons}>
          <Pressable onPress={() => updateCart([])} style={styles.button}>
            <Text style={styles.buttonText}>Esvaziar</Text>
          </Pressable>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Finalizar Compra</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
  },
  cartItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 15,
    borderBottomWidth: 1,
    borderColor: "gray",
    paddingBottom: 10,
  },
  cartItem: {
    flexDirection: "column",
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemSeller: {
    fontSize: 14,
    color: 'gray',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  removeButton: {
    backgroundColor: '#FF6347',
    padding: 8,
    borderRadius: 5,
  },
  removeText: {
    color: 'white',
    textAlign: 'center',
  },
  footer: {
    marginTop: 20,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: '#32CD32',
    padding: 10,
    borderRadius: 5,
    minWidth: 100,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default CartScreen;
