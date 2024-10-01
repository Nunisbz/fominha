import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet, Pressable, SafeAreaView, FlatList } from 'react-native';
import { AppDataContext, AppDataProvider } from "./scripts/AppDataContext";
import PageHeader from "./components/PageHeader";
import { Link } from "expo-router";

const ProductItem = ({ title, seller, cost, imgUrl, id }) => {
  const { shoppingCart, updateCart } = useContext(AppDataContext); // Acessa o contexto do carrinho de compras

  return (
    <View style={styles.itemContainer}>
      <Image source={{ uri: imgUrl }} style={styles.productImage} />
      <View>
        <Text style={styles.productTitle}>{title}</Text>
        <Text style={styles.productSeller}>{seller}</Text>
        <Text style={styles.productPrice}>R$ {cost.toFixed(2)}</Text>
        <Pressable 
          style={styles.addToCartButton} 
          onPress={() => updateCart([...shoppingCart, { id, title, seller, cost }])}
        >
          <Text style={styles.addToCartText}>Adicionar ao Carrinho</Text>
        </Pressable>
      </View>
    </View>
  );
};

const HomeScreen = () => {
  const { menuItems, shoppingCart } = useContext(AppDataContext); // Acessa os itens do menu e o carrinho do contexto

  return (
    <SafeAreaView style={styles.screen}>
      <PageHeader navigationLink=".." pageTitle="Menu de Produtos" />
      <View style={styles.cartSummary}>
        <Text>{shoppingCart.length} itens no carrinho</Text>
        {shoppingCart.length > 0 && (
          <Link href="./cart" style={styles.checkoutLink}>
            <Text>Ir para o Carrinho</Text>
          </Link>
        )}
      </View>
      <FlatList
        data={menuItems}
        renderItem={({ item }) => (
          <ProductItem 
            title={item.title} 
            seller={item.seller} 
            cost={item.cost} 
            imgUrl={item.imgUrl} 
            id={item.id} 
          />
        )}
        keyExtractor={item => item.id.toString()}
      />
    </SafeAreaView>
  );
};

const App = () => {
  return (
    <AppDataProvider>
      <HomeScreen />
    </AppDataProvider>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
  },
  itemContainer: {
    flexDirection: "row",
    marginVertical: 15,
    borderBottomWidth: 1,
    borderColor: "gray",
    paddingBottom: 10,
  },
  productImage: {
    width: 120,
    height: 120,
    marginRight: 20,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productSeller: {
    fontSize: 14,
    color: 'gray',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  addToCartButton: {
    backgroundColor: '#32CD32',
    padding: 8,
    borderRadius: 5,
    marginTop: 10,
  },
  addToCartText: {
    color: 'white',
    textAlign: 'center',
  },
  cartSummary: {
    marginBottom: 20,
    alignItems: 'center',
  },
  checkoutLink: {
    backgroundColor: '#FFD700',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
});

export default App;
