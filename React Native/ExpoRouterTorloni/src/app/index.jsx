import { Link, useRouter } from "expo-router";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function Produtos() {
  const router = useRouter();

  const paginaProduto = () => {
    router.push("/produtos");
  };
  
  return (
    <View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          router.push("/perfil");
        }}
      >
        <Text style={styles.buttonText}>Tela de Perfil</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Link href="/produtos" style={styles.buttonText}>
            Tela de Produtos 2
        </Link>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={paginaProduto}>
        <Text style={styles.buttonText}>Produtos</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#222",
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
