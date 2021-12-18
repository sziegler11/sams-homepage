---
draft: true 
date: "2021-01-27"
title: "CoinJoin and Bitcoin Privacy" 
slug: "coin-join"
---

In this post I'll give a brief overview of privacy issues with Bitcoin, and how a transaction style known as CoinJoin can be used to enhance privacy on the blockchain.


# Bitcoin Privacy

A common misconception about Bitcoin is that it is anononymous. In fact, it's more accurate to say that Bitcoin is a *pseudonymous* network; your identity is never on the blockchain directly, but you leave a trail of artifacts in form of addresses or hashes that represent you.

In fact, it is a core feature of Bitcoin that all transactions are encoded in a public blockchain which is stored in thousands of computers around the world. The ability for anyone verify the blockchain is an asset for financial independence, in that you don't need to trust any one insitution to tell you how much money you hold in your account. It's public nature also ensures that no one is surreptitiously modifying past transactions, because any differences from the main chain would be immediately noticeable. But even as the openness of the whole system is desirable, it's probably not desirable that everyone knows *your particular* holdings and transaction history.

An observer could link inputs and outputs of transactions and build a model of which addresses are associated together. By grouping addresses from transaction inputs together, one can discover collections of addresses which are controlled by a particular entity, and thus one could start to track the flow of coins between users. Furthermore, leaked network info like IP addresses can be used to associate groups of addresses with a real identity. 

# CoinJoin

> ... no longer will input co-joining be strong evidence of common control.
> - Greg Maxwell, creator of CoinJoin

A CoinJoin transaction mixes the inputs and outputs of several transactions into a single transaction. This violates the assumption that all inputs to a transaction are under the control of a common owner, thus making it hard to observe who owns what on the blockchain. 

## How does it work in practice?

The owners of the coins will submit their signatures to a transaction which shuffles the coins to various output addresses, making it difficult to trace where each output is going. 

# JoinMarket and CoinJoin in practice

![Example image](/images/coinjoin_img1.png)

(makers and takers)

# Resources