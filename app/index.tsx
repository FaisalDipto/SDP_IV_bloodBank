import { Redirect } from "expo-router";
import { Text, View } from "react-native"
import { useAuth } from '@clerk/clerk-expo'

const Home = () => {
  const { isSignedIn } = useAuth()

  if (isSignedIn) {
    return <Redirect href={"/(root)/(tabs)/home"} />
  }
  return <Redirect href="/(auth)/welcome" />
}

export default Home;