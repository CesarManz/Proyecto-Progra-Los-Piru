
const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

// Configura tu transporter con tus credenciales reales
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "ecosmartoficial@gmail.com",
      pass: "mvut dcar rdpe zbnd"
    }
  });


router.post("/enviar-correo", async (req, res) => {
  const { correo, asunto, mensaje } = req.body;

  if (!correo || !asunto || !mensaje) {
    return res.status(400).json({ error: "Faltan campos obligatorios." });
  }

  try {
    await transporter.sendMail({
      from: '"EcoSmart" <TU_CORREO@gmail.com>',
      to: correo,
      subject: asunto,
      text: mensaje
    });

    res.status(200).json({ mensaje: "Correo enviado correctamente" });
  } catch (error) {
    console.error("❌ Error al enviar correo:", error);
    res.status(500).json({ error: "Error al enviar el correo." });
  }
});

module.exports = router;
