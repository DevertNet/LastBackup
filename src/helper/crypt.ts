import sjcl from 'sjcl';

export function encrypt(password: string, data: string) {
    var salt = sjcl.random.randomWords(8, 0);

    var options = {
        mode: "ccm", //The cipher mode is a standard for how to use AES and other algorithms to encrypt and authenticate your message. OCB2 mode is slightly faster and has more features, but CCM mode has wider support because it is not patented.
        iter: 5000, //Strengthening makes it slower to compute the key corresponding to your password. This makes it take much longer for an attacker to guess it.
        ks: 256, //Key Size 128 bits should be secure enough, but you can generate a longer key if you wish.
        ts: 128, //SJCL adds a an authentication tag to your message to make sure nobody changes it. The longer the authentication tag, the harder it is for somebody to change your encrypted message without you noticing. 64 bits is probably enough.
        v: 1,
        cipher: "aes",
        adata: "",
        salt: salt
    }

    return sjcl.encrypt(password, data, options);
}

export function decrypt(password: string, data: string) {
    return sjcl.decrypt(password, data);
}

export function hash(password: string, salt: string) {
    var salt = sjcl.codec.utf8String.toBits("lastbackup" + salt);
    var hashedPw = sjcl.misc.pbkdf2(password, salt, 5000, 256);
    return sjcl.codec.hex.fromBits(hashedPw);
}