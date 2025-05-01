import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URI;

public class SensorSimulator {
    public static void main(String[] args) {
        try {
            URL url = URI.create("http://localhost:5000/sensores").toURL();
            HttpURLConnection con = (HttpURLConnection) url.openConnection();
            con.setRequestMethod("POST");
            con.setRequestProperty("Content-Type", "application/json; utf-8");
            con.setDoOutput(true);
            String json = String.format(
                "{" +
                " \"sueloHumedad\": %.1f," +
                " \"nitrógeno\": %d," +
                " \"fósforo\": %d," +
                " \"potasio\": %d," +
                " \"vitaminaA\": %d," +
                " \"vitaminaC\": %d," +
                " \"phSuelo\": %.1f" +
                "}",
                40 + Math.random() * 30,     
                20 + (int)(Math.random() * 40),       
                15 + (int)(Math.random() * 25),       
                100 + (int)(Math.random() * 150),     
                30 + (int)(Math.random() * 50),       
                20 + (int)(Math.random() * 50),       
                5.8 + Math.random() * 1.2             
            );
            
            

            System.out.println("JSON to be sent: " + json);
            


            Thread.sleep(1000);
            
            try (OutputStream os = con.getOutputStream()) {
                byte[] input = json.getBytes("utf-8");
                os.write(input, 0, input.length);
            }

            int responseCode = con.getResponseCode();
            System.out.println("Datos enviados: " + json);
            System.out.println("Respuesta del servidor: " + responseCode);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
