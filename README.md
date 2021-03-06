# Godwoken

> Godwoken is still under active development and considered to be a work in progress.

Godwoken is a generic framework to build rollup solutions upon Nervos CKB. It is designed to be configurable in many regards:

* Optimistic rollup is leveraged today, however Godwoken could also be extended for zk rollup in the future.
* Depending on different scenarios, one can either use always success script so anyone shall be able to issue new blocks, or [Proof of Authority](https://github.com/xxuejie/clerkb) solution so limited `block_producers` can issue new layer 2 blocks. In the future we also plan for a Proof of Stake solution, where we can relax the limitations of PoA.
* Right now [polyjuice](https://github.com/TheWaWaR/godwoken-polyjuice) is integrated to godwoken for an Ethereum compatible solution. However, godwoken at its core only provides a flexible [programming interface](https://github.com/nervosnetwork/godwoken/blob/9ac51b4266330e1974ffe5ad418229a8ddbac12f/c/gw_def.h). A result of this, is that any account model based blockchain model can be integrated with godwoken this way. Similar to polyjuice on godwoken, we could also have EOS on godwoken, Libra on godwoken, etc.

# How To Run

We provide 2 ways to trying out godwoken here:

* [Build your own godwoken on dev chain](docs/dev_chain.md)
* [Connect to running godwoken instance on testnet](docs/testnet.md)
