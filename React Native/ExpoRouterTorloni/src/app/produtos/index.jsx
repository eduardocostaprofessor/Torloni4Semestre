import { Link, useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Produtos() {
const router = useRouter()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Produtos</Text>

      <View>
        <Link href="/produtos/10">Produto 10</Link>
        <Link href="/produtos/25">Produto 25</Link>
      </View>

      <TouchableOpacity style={styles.button} onPress={()=>{
        router.back()
      }}>
        <Text style={styles.buttonText}>Voltar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={()=>{
        router.replace("/perfil")
      }}>
        <Text style={styles.buttonText}>Perfil</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
