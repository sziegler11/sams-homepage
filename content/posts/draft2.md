---
draft: true 
date: "2021-03-16"
title: "draft2" 
slug: ""
---

# What I learned from reading chapters 1-6 (3, really) of Computer Systems: A Programmer's Perspective

- Never assume that arithmetic on a computer is the same as arithmetic in abstract math
	- There is overflow, underflow, finite limits to addition and subtraction.
- The compiler and assembler are just programs like any other.
- Once you understand how the basic ops, like variable assignment or while loops or if statements are implemented 
in assembly, it becomes easy to imagine how entire large programs are translated into assembly and hence
run by the machine
- Local frames of reference are encoded on the stack