import "./App.css";
import Desktop from "./Desktop";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import 'primeicons/primeicons.css';


export default function App() {
  return (
    <main style={styles.main}>
      <Desktop />
    </main>
  );
}

const styles = {
  main: {
    height: "100vh",
    padding: "5px",
  },
};
