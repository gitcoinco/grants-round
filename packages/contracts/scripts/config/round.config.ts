// Update this file any time a new contract has been deployed
type RoundParams = {
  roundImplementationContract: string;
  roundFactoryContract: string;
  bulkVotingStrategyContract: string;
  roundContract ?: string;
};

type DeployParams = Record<string, RoundParams>;

export const roundParams: DeployParams = {
  "goerli": {
    roundFactoryContract: '0x294e4D13919602f3B857fB2195628Fd5255e298a',
    roundImplementationContract: '0x1BCeaad09525783DEFeD6A827625823F7b8d0485',
    bulkVotingStrategyContract: '0x1a78d5d69fB09255368dE41d3b1f47219A3EC3a4',
    roundContract: '0xB91FeC0b68f39cbfdd75E4f08042c60724e1bd3b'
  },
  "optimism-mainnet": {
    roundFactoryContract: '0x0BFA0AAF5f2D81f859e85C8E82A3fc5b624fc6E8',
    roundImplementationContract: '0x00CD233ae7F31DC3664401cb040f24f6bf615668',
    bulkVotingStrategyContract: '0xaaC049bE4ccaE52D981585371829b5aEc4a13F53',
    roundContract: '0x3383B97ED8eDA76BEf97d8Bf3FbE40b8Ca0cf037'
  },
  "optimism-kovan": {
    roundFactoryContract: '0x0d2d160Eff14f835B30e3f0EA83b50289A7d51aF',
    roundImplementationContract: '0x5C46ae4a950E0e0280006403B9e517462FD16dAc',
    bulkVotingStrategyContract: '0x9d55810da86A9610Ab3223f4CDF0b5d81FfA579c',
    roundContract: '0x3EE29458f2121E2C20421cd188F2CAbd99347d54'
  },
};