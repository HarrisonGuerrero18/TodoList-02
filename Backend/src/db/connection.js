import pkg from "pg";
const { Pool } = pkg;

// Configuración del pool con variables individuales
export const pool = new Pool({
  host: process.env.HOSTDB || "localhost",
  user: process.env.USERDB || "postgres",
  password: process.env.PASSWORDDB || "",
  database: process.env.DB || "railway",
  port: parseInt(process.env.PORTDB || "5432"),
  // Configuración SSL para Railway
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
  // Timeouts y configuración de conexión
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});

// Validar variables de entorno
if (!process.env.HOSTDB || !process.env.USERDB || !process.env.DB) {
  console.warn("⚠️ Advertencia: Faltan variables de entorno para la base de datos");
  console.warn("Asegúrate de configurar: HOSTDB, USERDB, DB, PASSWORDDB, PORTDB");
}

// Manejar errores del pool
pool.on("error", (err) => {
  console.error("❌ Error en el pool de conexión:", err.message);
});

// Prueba de conexión al iniciar
pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("❌ Error conectando a la base de datos:", err.message);
    console.error("   Host:", process.env.HOSTDB);
    console.error("   Puerto:", process.env.PORTDB);
    console.error("   Base de datos:", process.env.DB);
  } else {
    console.log("✅ Conexión exitosa a PostgreSQL en", process.env.HOSTDB);
    console.log("   Base de datos:", process.env.DB);
  }
});
