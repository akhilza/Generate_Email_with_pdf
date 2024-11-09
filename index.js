const express = require('express');
const path = require('path');
const app = express();
const ejs = require("ejs");
const pdf = require("html-pdf");
const nodemailer = require("nodemailer");
const port = 3000;

let users = [
    {
        name: "Aarya",
        email: "aarya@gmial.com",
        city: "New York",
        country: "USA"
    },
    {
        name: "Akhil",
        email: "akhil@gmial.com",
        city: "New York",
        country: "USA"
    },
    {
        name: "Madhuri",
        email: "madhuri@gmial.com",
        city: "New York",
        country: "USA"
    },
    {
        name: "Aarya",
        email: "aarya@gmial.com",
        city: "New York",
        country: "USA"
    }
];

app.get("/generate", (req, res) => {
    ejs.renderFile(
        path.join(__dirname, "./views/", "report-templete.ejs"),
        { users: users },
        (err, data) => {
            if (err) {
                res.send(err);
            } else {
                let options = {
                    height: "11.25in",
                    width: "8.5in",
                    header: { height: "20mm" },
                    footer: { height: "20mm" }
                };

                pdf.create(data, options).toFile("akhil.pdf", function (err, data) {
                    if (err) {
                        res.send(err);
                    } else {
                        res.send("File created successfully");

                        // Define mail transporter and assign it to mailTransporter
                        const mailTransporter = nodemailer.createTransport({
                            service: "gmail",
                            auth: {
                                user: "send@gmail.com",
                                pass: "tvxv jijc qdwl uagy"
                            }
                        });

                        let mailDetails = {
                            from: "send@gmail.com",
                            to: "xyz@gmail.com",
                            subject: "Hello First Email",
                            text: "Node JS",
                            attachments: [{ path: data.filename }]
                        };

                        // Send the email
                        mailTransporter.sendMail(mailDetails, function (err, info) {
                            if (err) {
                                console.log("Error Occurs:", err);
                            } else {
                                console.log("Email sent successfully:", info.response);
                            }
                        });
                    }
                });
            }
        }
    );
});

app.get('/', (req, res) => res.send('Hello World!'));
app.listen(port, () => console.log(`Example app listening on port http://localhost:${port}`));
