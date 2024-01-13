import axios from "axios";

export const getActiveUri = async (portList) => {
  for (const port of portList) {
    try {
      const uri = `http://localhost:${port}`;
      const res = await axios.get(uri);
      if (res.status === 200) {
        return uri;
      }
    } catch (err) {}
  }
  throw new Error("Aucune URI disponible.");
}