---
draft: false
math: true
date: "2021-12-18"
title: "Taproot: what is it and what does it mean for Bitcoin?" 
slug: "taproot"
---

In November 2021, at block height 709,632, the Taproot upgrade became active on the Bitcoin network, meaning this block was the first for which Bitcoin nodes started enforcing the updated consensus rules. But what is Taproot, and how did it come to be adopted on the network?

There are really several innovations bundled under the umbrella of “Taproot.” These include:

* Schnorr signatures ([BIP-340](https://github.com/bitcoin/bips/blob/master/bip-0340.mediawiki))
* Taproot outputs ([BIP-341](https://github.com/bitcoin/bips/blob/master/bip-0341.mediawiki))
* Tapscript ([BIP-342](https://github.com/bitcoin/bips/blob/master/bip-0342.mediawiki))

I won't attempt to describe all of these in one post, so for now we will focus on the first of these: a new cryptographic signature scheme for Bitcoin.

# Schnorr signatures

Prior to the Taproot soft fork, the signature scheme used in all Bitcoin transactions was [ECDSA](https://en.bitcoin.it/wiki/Elliptic_Curve_Digital_Signature_Algorithm). Taproot introduces a new scheme known as *Schnorr signatures*, and while both Schnorr and ECDSA are based on elliptic curve math, Schnorr has some nice properties which ECDSA lacks.

Given the following:
* private key $d$ 
* $m$ is the message to be signed (e.g. bitcoin transaction)
* generator point on the elliptic curve $G$
* $P = dG$ 
* random nonce $k$
* $R = kG$
* hash function $H$

then the formula for computing a signature for message $m$ using private key $d$ looks like this:

ECDSA:

$$ s(k, d, m) = k^{-1}(H(m) + R_x\*d) $$ 

Schnorr:

$$ s(k, d, m) = k + H(R_x || P_x || m)\*d $$

where $R_x, P_x$ are the x-coordinates of those points on the elliptic curve. The handy thing about the Schnorr calculation is that it's *linear* in the pair $(k,d)$; that is

$$ s(k_1 + k_2, d_1 + d_2, m) = s(k_1, d_1, m) + s(k_2, d_2, m). $$

This turns out to be very handy property for *multisig* transactions.

## Multisig

One of the beautiful things about Bitcoin is that ownership is tied to private keys, not to any other outside proof of identity. Moreover, arbitrarily complex conditions of ownership can be expressed using Bitcoin Script. One particularly convenient arrangement is an m-of-n multisig, wherein bitcoin can be spent by any subset size m of n private keys. To keep it simple, lets consider a situation where we have two parties who want mutual shared control over some bitcoin, such that both parties need to sign off in order to spend (a 2-of-2 multisig). Let's say the signing keys of the two parties are $d_1, P_1$ and $d_2, P_2$. We make a shared key just by taking the sum of the individual keys: 

$$d_{new} = d_1 + d_2$$ 
$$P_{new} = P_1 + P_2$$

Now suppose we have some bitcoin stored in an address generated from the combined key, and let $m$ be a transaction spending from this address. Each party could randomly generate their respective nonces $k_1, k_2$ with corresponding nonce points $R_i = k_iG$, and then share them with each other to compute the sum $R_{new} = R_1 + R_2$. Finally, each party computes their Schnorr signature using the shared public key and shared nonce in the hash:

$$ s_1 = k_1 + H(R_{new}||P_{new}||m)\*d_1 $$
$$ s_2 = k_2 + H(R_{new}||P_{new}||m)\*d_2 $$

The linearity of the Schnorr signature algorithm tells us that we can simply sum these individual signatures to get one that works for the combined key. That is, 

$$ s_1 + s_2 = k_1 + k_2 + H(R_{new}||P_{new}||m)\*(d_1 + d_2) $$

is a valid signature for the shared public key $P_{new}$.

Thus it's very simple to generate the combined key from the individuals, and the final signature **looks indistinguishable from a single key signature!** This is a big improvement over the implementation of multisig signatures under ECDSA, where signatures for each signing key need to explicitly included in the transaction, requiring much more space, and thus more fees, storage on nodes, etc.

Unfortunately, this first pass at group signing with Schnorr leaves one vulnerable to [attack](https://tlu.tarilabs.com/cryptography/introduction-schnorr-signatures#key-cancellation-attack). By beefing up the protocol a little bit, we can keep the relative simplicity and conciseness of the approach while maintaining security.

# MuSig

The "secret sauce" which keeps linear aggregation with Schnorr signatures secure is the [MuSig signature scheme](https://eprint.iacr.org/2018/068.pdf). Given n parties who want to collaborate on an n-of-n  signature, each party starts with their private/public key pairs $(d_i, P_i): 1\leq i\leq n$ and a message $m$ to sign. Before creating a public key, first all parties compute a special factor:

$$ L = H(P_1 || P_2 || \ldots || P_n) $$
$$ a_i = H(L, P_i) $$

The original individual public keys $P_i$'s are then perturbed by these factors and aggregated into a public key:

$$P_{agg} = \sum_{i\leq n} a_iP_i$$

This is crucial, since it requires all parties to submit their public keys *before* they are perturbed and combined. This prevents the sort of key-cancellation attacked described in the above link.

Next, the parties generate randomness on their own and commit to their random nonces. Each party generates nonce, point pairs $(k_i, R_i)$. Then everyone exchanges hashes of their nonce points:

$$ t_i = H(R_i) $$

Once the commitment $t_i's$ have been received by all parties, everyone will then send out the points $R_i$, and everyone will now be able to compute the aggregate nonce, hash, and finally their own partial signatures:

$$ R_{agg} = \sum_i R_i $$
$$ c = H(P_{agg}, R_{agg}, m) $$
$$ s_i = r_i + ca_id_i $$

The final signature for the multi-party transaction is just $s = \sum_i s_i$.

# Conclusion

Schnorr signatures are simpler than ECDSA, and the MuSig protocol using Schnorr allows for smaller, cheaper, and more private signatures for multisig Bitcoin transactions. In posts to come, I will expand on some other aspects of Taproot.  
