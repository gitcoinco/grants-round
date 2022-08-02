import { Buffer } from 'buffer';
const LitJsSdk = require('lit-js-sdk');


// @ts-ignore
window.Buffer = Buffer;

const client = new LitJsSdk.LitNodeClient();

const ROLE_OPERATOR = '0xec61da14b5abbac5c5fda6f1d57642a264ebd5d0674f35852829746dfb8174a5';

type LitInit = {
  chain: string,
  contract: string,
  wallet: string
}

export class Lit {
  litNodeClient: any
  chain: string
  contract: string
  wallet: string // TODO: REMOVE

  /**
   * constructor
   * @param initConfig {chain, contract, wallet}
   */
  constructor(initConfig: LitInit) {
    this.chain = initConfig.chain;
    this.contract = initConfig.contract;
    this.wallet = initConfig.wallet;
  }

  /**
   * Generates access control conditions for the role operator
   * @returns
   */
  isRoundOperatorAccessControl() {
    return [
      {
        contractAddress: "0x22c0e3edc90f6a890a259130b416cd5f3ee4aca0",
        functionName: "hasRole",
        functionParams: [
          "0xec61da14b5abbac5c5fda6f1d57642a264ebd5d0674f35852829746dfb8174a5",
          "0x5cdb35fADB8262A3f88863254c870c2e6A848CcA"
        ],
        functionAbi: {
          "inputs": [
            { "internalType": "bytes32", "name": "role", "type": "bytes32" },
            { "internalType": "address", "name": "account", "type": "address" }
          ],
          "name": "hasRole",
          "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
          "stateMutability": "view",
          "type": "function"
        },
        chain: "goerli",
        returnValueTest:{
          "key": "",
          "comparator": "=",
          "value": "true"
        },
      }
    ];
  }

  /**
   * Connect to the lit node
   */
  async connect() {
    await client.connect();
    this.litNodeClient = client;
  }

  /**
   * Util function to encrypt a string
   *
   * @param content the string to encrypt
   * @returns {encryptedString, encryptedSymmetricKey}
   */
  async encryptString(content: string) {
    if (!this.litNodeClient) {
      await this.connect();
    }

    console.log("Encrypting Message", content);

    // Obtain Auth Signature to verify signer is wallet owner
    const chain = this.chain;
    const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain });

    // Encrypting Content and generating symmetric key
    const { encryptedString, symmetricKey } = await LitJsSdk.encryptString(content);
    console.log("Encrypted the key pair");
    console.log("Encrypted String", encryptedString);
    console.log("Symmetric Key", symmetricKey);

    // Saving the Encrypted Content to the Lit Nodes
    const encryptedSymmetricKey = await this.litNodeClient.saveEncryptionKey({
      accessControlConditions: this.isRoundOperatorAccessControl(),
      symmetricKey,
      authSig,
      chain,
    });

    console.log("Saved content to the lit node", encryptedSymmetricKey);

    return {
      encryptedString,
      encryptedSymmetricKey: LitJsSdk.uint8arrayToString(encryptedSymmetricKey, "base16")
    };
  }

  /**
   * Util function to decrypt a string
   *
   * @param encryptedStr
   * @param encryptedSymmetricKey
   * @returns decrypted string
   */
  async decryptString(
    encryptedStr: string,
    encryptedSymmetricKey: string
  ) {
    if (!this.litNodeClient) {
      await this.connect();
    }

    const chain = this.chain;

    // Obtain Auth Signature to verify signer is wallet owner
    const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain });

    // Obtaining the Decrypted Symmetric Key
    const symmetricKey = await this.litNodeClient.getEncryptionKey({
      accessControlConditions: this.isRoundOperatorAccessControl(),
      toDecrypt: encryptedSymmetricKey,
      chain,
      authSig,
    });

    // Obtaining the Decrypted Data
    const decryptedString = await LitJsSdk.decryptString(
      encryptedStr,
      symmetricKey
    );

    console.log("Decrypted String", decryptedString);
    return decryptedString;

  }
}