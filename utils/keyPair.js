import nacl from "tweetnacl";
import { uint8ArrayToBase64 } from "./base64";

export const generateKeyPair = () => {
    let nacl_keyPair = nacl.box.keyPair();
    let keyPair = {
        public_key: uint8ArrayToBase64(nacl_keyPair.publicKey),
        private_key: uint8ArrayToBase64(nacl_keyPair.secretKey)
    }

    return keyPair;
}