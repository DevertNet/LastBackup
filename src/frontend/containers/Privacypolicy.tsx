import React from "react";

export default function Privacypolicy() {
    return (
        <div className="Privacypolicy">
            <h1>Privacy Policy</h1>

            <p><strong>tl/tr:</strong> We don't know what you store. Everything is AES encrypted or hashed. Zero-Knowledge encryption.</p>

            <h2>Storig a backup</h2>
            <p>We save the following informations. It is not possible for us to decrypt the data without your password.</p>
            <ul>
                <li>Hashed password (PBKDF2)</li>
                <li>AES Encrypted Data of your files and notes</li>
            </ul>

            <h2>Visiting this site</h2>
            <p>When you visitng this site, out hoster can see the following informations from you:</p>
            <ul>
                <li>browser type and version</li>
                <li>Operating system used</li>
                <li>referrer URL</li>
                <li>Host name of the accessing computer</li>
                <li>Time of the server request</li>
                <li>IP address</li>
            </ul>

            <h2>More Privacy Policy</h2>
            More details can be found <a href="https://www.devert.net/datenschutz" target="_blank">here</a>.
        </div>
    );
}